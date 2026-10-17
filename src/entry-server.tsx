/// <reference types="node" />
// Prerender entry: built with `vite build --ssr` and called by scripts/prerender.mjs.
// Never hot-reloaded, so the fast-refresh export rule does not apply.
/* eslint-disable react-refresh/only-export-components */
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";
import { createI18n } from "./i18n";
import type { Lang } from "./seo/routes";

export { ROUTES, NOT_FOUND_PATH, PAGE_MODULES, DEFAULT_LANG } from "./seo/routes";
export { buildHead, buildNotFoundHead, buildSitemap } from "./seo/head";

/** Renders one URL to HTML, waiting for every lazy page and Suspense boundary to resolve. */
export const render = (url: string, lang: Lang): Promise<string> =>
  new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
      final(callback) {
        resolve(html);
        callback();
      },
    });

    const { pipe } = renderToPipeableStream(
      <AppProviders i18n={createI18n(lang)}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppProviders>,
      {
        onAllReady: () => pipe(sink),
        onShellError: reject,
        // Fail the build instead of shipping a page with a missing section.
        onError: (error) => reject(error),
      },
    );
  });
