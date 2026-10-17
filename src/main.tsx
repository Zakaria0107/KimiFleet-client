import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProviders, AppRoutes } from "./App.tsx";
import "./index.css";
import { createI18n } from "./i18n.ts";
import { langFromPath } from "./seo/routes.ts";

const app = (
  <AppProviders i18n={createI18n(langFromPath(window.location.pathname))}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

const container = document.getElementById("root")!;

// Production pages are prerendered, so React hydrates the existing HTML.
// The Vite dev server serves an empty shell, so render from scratch there.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
