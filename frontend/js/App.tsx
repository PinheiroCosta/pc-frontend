import * as Sentry from "@sentry/react";
import cookie from "cookie";

import { OpenAPI } from "./api/core/OpenAPI";
import AppRoutes from "./routes";

const baseUrl = process.env.API_BASE_URL;

if (!baseUrl) {
  throw new Error("API_BASE_URL não definida");
}

OpenAPI.BASE = baseUrl;

OpenAPI.interceptors.request.use((request) => {
  const { csrftoken } = cookie.parse(document.cookie);
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
  }
  return request;
});

const App = () => (
  <Sentry.ErrorBoundary>
    <AppRoutes />
  </Sentry.ErrorBoundary>
);

export default App;
