#!/usr/bin/env node

import { mkdir, writeFile, copyFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import dotenv from "dotenv";

dotenv.config();
const BACKEND_REPO = "PinheiroCosta/pc-backend";
const ASSET_PREFIX = "openapi-";
const ASSET_SUFFIX = ".yml";

const OPENAPI_DIR = path.resolve(process.cwd(), "openapi");
const SCHEMAS_DIR = path.join(OPENAPI_DIR, "schemas");
const ACTIVE_SCHEMA_PATH = path.join(OPENAPI_DIR, "schema.yml");
const CONTRACT_VERSION_PATH = path.join(OPENAPI_DIR, "CONTRACT_VERSION");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN não definido");
}

const argVersion = process.argv[2]; // opcional: vX.Y.Z ou latest

function isValidSemver(version) {
    return /^v\d+\.\d+\.\d+$/.test(version);
}

async function githubRequest(url) {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
        },
    });

    if (!res.ok) {
        throw new Error(`GitHub API error ${res.status} (${url})`);
    }

    return res.json();
}

async function resolveVersion() {
    if (!argVersion || argVersion === "latest") {
        const release = await githubRequest(
            `https://api.github.com/repos/${BACKEND_REPO}/releases/latest`,
        );
        return release.tag_name;
    }

    if (!isValidSemver(argVersion)) {
        throw new Error(
            `Versão inválida: ${argVersion}. Use vX.Y.Z ou latest`,
        );
    }

    return argVersion;
}

async function ensureDirs() {
    await mkdir(SCHEMAS_DIR, { recursive: true });
}

async function fileExists(filePath) {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function downloadSchema(version) {
    const release = await githubRequest(
        `https://api.github.com/repos/${BACKEND_REPO}/releases/tags/${version}`,
    );

    const assetName = `${ASSET_PREFIX}${version}${ASSET_SUFFIX}`;
    const asset = release.assets.find((a) => a.name === assetName);

    if (!asset) {
        throw new Error(`Asset ${assetName} não encontrado na release ${version}`);
    }

    const res = await fetch(asset.url, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/octet-stream",
        },
    });

    if (!res.ok) {
        throw new Error(`Falha ao baixar asset (${res.status})`);
    }

    return res.text();
}

async function main() {
    const version = await resolveVersion();
    await ensureDirs();

    const versionedPath = path.join(
        SCHEMAS_DIR,
        `openapi-${version}.yml`,
    );

    if (await fileExists(versionedPath)) {
        throw new Error(
            `Schema ${version} já existe. Não sobrescrevendo.`,
        );
    }

    const schemaContent = await downloadSchema(version);

    await writeFile(versionedPath, schemaContent, "utf-8");
    await copyFile(versionedPath, ACTIVE_SCHEMA_PATH);
    await writeFile(CONTRACT_VERSION_PATH, `${version}\n`, "utf-8");

    console.log(`✔ OpenAPI ${version} atualizado com sucesso`);
}

main().catch((err) => {
    console.error(`✖ ${err.message}`);
    process.exit(1);
});

