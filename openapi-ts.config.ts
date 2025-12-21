import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "openapi/schema.yml",
  output: {
    path: "frontend/js/api",
    format: "prettier",
  },
  client: "axios",
  useOptions: true,
});
