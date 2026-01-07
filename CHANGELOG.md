# Changelog

## [1.0.2](https://github.com/PinheiroCosta/pc-frontend/compare/v1.0.1...v1.0.2) (2026-01-07)


### Bug Fixes

* **ci:** correct deploy-prod condition on release event ([d05d766](https://github.com/PinheiroCosta/pc-frontend/commit/d05d766f9edfc913747fefa86411438f20dff240))
* **ci:** correct deploy-prod condition on release event ([f388fc6](https://github.com/PinheiroCosta/pc-frontend/commit/f388fc6f1d0eaa407130a90a4fe0651cd0675eca))

## [1.0.1](https://github.com/PinheiroCosta/pc-frontend/compare/v1.0.0...v1.0.1) (2026-01-07)


### Bug Fixes

* **build:** ensure cloudflare production builds exclude __tests__ directories and prepare build on cloudflare pages ([6ae8e04](https://github.com/PinheiroCosta/pc-frontend/commit/6ae8e04a137e10bd2fd5f5154ef695c1ed64582f))
* **build:** ensure correct dependencies for build on cloudflare pages ([ae08e0a](https://github.com/PinheiroCosta/pc-frontend/commit/ae08e0a17e713c3a1ad456e44a5bd56687f8836e))
* **build:** move dotenv-webpack to production dependencies ([ad7a30e](https://github.com/PinheiroCosta/pc-frontend/commit/ad7a30e45e47ad58329208c0bc309f3daf24c292))
* **build:** move webpack-cli to production dependencies for CI compatibility ([772c98f](https://github.com/PinheiroCosta/pc-frontend/commit/772c98fbbbeed4cfa4c5ae37356cab00f38e3c0a))
* **ci:** ensure GH_TOKEN in cleanup workflow ([bc82484](https://github.com/PinheiroCosta/pc-frontend/commit/bc82484cfff3e10bc04df5d542a18fd119f43f34))
* **dep:** avoid react-refresh-webpack-plugin to run in production environment ([a35f5c3](https://github.com/PinheiroCosta/pc-frontend/commit/a35f5c37f59df3c270013a81507f0c338588c1c5))
* **dev:** switch Node image to slim and stabilize webpack/sass dependencies ([e927fcc](https://github.com/PinheiroCosta/pc-frontend/commit/e927fcc0e497d3a35e008cd394069a1b972a1384))
* **types:** add local type declarations for prismjs and react-dom client ([46c151b](https://github.com/PinheiroCosta/pc-frontend/commit/46c151b695bbc4f0be91fbc6d683546ce6640351))
* **types:** align @types/react-dom version ([dc06aa6](https://github.com/PinheiroCosta/pc-frontend/commit/dc06aa6bca999c4433a0595b22f98c5485a7200e))
* **types:** ensure custom declaration files are picked up by TypeScript ([bc92b3f](https://github.com/PinheiroCosta/pc-frontend/commit/bc92b3f1d48a0e2294b739ca69624fdafd98b55c))

## 1.0.0 (2026-01-03)


### Features

* add initial frontend structure and source files ([1382c58](https://github.com/PinheiroCosta/pc-frontend/commit/1382c58755e7ad6168a62b54b69dfe6d25057eb4))
* **ci,openapi:** add versionaed OpenAPI download workflow and release pipeline ([25d4df7](https://github.com/PinheiroCosta/pc-frontend/commit/25d4df74ef2bbf0846613634ede84c24abb12f0d))
* **frontend:** bootstrap standalone React app with static HTML and SWC ([3920305](https://github.com/PinheiroCosta/pc-frontend/commit/39203055bc6ce49fb43940a3ed329af8affb6601))


### Bug Fixes

* **home:** align Home component with React 18 JSX runtime ([2660d5a](https://github.com/PinheiroCosta/pc-frontend/commit/2660d5ae079e6fbdeed2678f8339873fa00e31c0))
* **home:** removes useState from API's health check ([1f42279](https://github.com/PinheiroCosta/pc-frontend/commit/1f42279edf0037cb298f135ec3ee9cbcb9dc0bba))
* **lint:** avoid 404 on github API by referencing correct secret ([8d64a7b](https://github.com/PinheiroCosta/pc-frontend/commit/8d64a7bbc5867aed9c185df440872151da4118e7))
* **pages:** prevent runtime crashes when API is unavailable ([46552df](https://github.com/PinheiroCosta/pc-frontend/commit/46552df77e0bc36355fb03c548e3ead0b15f1a7b))
* **release:** fix syntax error on release workflow ([46ad515](https://github.com/PinheiroCosta/pc-frontend/commit/46ad515fe7ec9c224fc21666686c0f988f7a80d4))
