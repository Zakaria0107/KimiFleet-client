// Writes static HTML for every route in src/seo/routes.ts, plus 404.html and sitemap.xml.
// Runs after `vite build` (client, dist/) and `vite build --ssr` (server bundle, dist-ssr/).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const manifestPath = path.join(distDir, ".vite", "manifest.json");

const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const {
  render,
  ROUTES,
  NOT_FOUND_PATH,
  PAGE_MODULES,
  DEFAULT_LANG,
  buildHead,
  buildNotFoundHead,
  buildSitemap,
} = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

/**
 * JS and CSS files a lazily loaded page needs, from the Vite manifest. Without the CSS links
 * the prerendered page would be unstyled until its chunk loads (or forever, without JavaScript).
 */
const pageAssets = (moduleId) => {
  const js = new Set();
  const css = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || js.has(chunk.file)) return;
    js.add(chunk.file);
    chunk.css?.forEach((file) => css.add(file));
    chunk.imports?.forEach(visit);
  };
  if (!manifest[moduleId]) throw new Error(`${moduleId} not found in the Vite manifest`);
  visit(moduleId);
  // The entry chunk and its static imports are already linked by the template.
  const notInTemplate = (file) => !template.includes(`/${file}"`);
  return { js: [...js].filter(notInTemplate), css: [...css].filter(notInTemplate) };
};

const fillTemplate = ({ lang, head, html, moduleId }) => {
  const { js, css } = pageAssets(moduleId);
  const assetTags = [
    ...css.map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`),
    ...js.map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`),
  ].join("\n  ");

  if (!/<h1[\s>]/.test(html)) throw new Error(`Prerendered HTML for ${lang} has no <h1>`);

  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace("<!--app-head-->", head)
    .replace("</head>", `  ${assetTags}\n</head>`)
    .replace("<!--app-html-->", html);
};

const writePage = async (relativeFile, contents) => {
  const file = path.join(distDir, relativeFile);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, contents);
  console.log(`  ${path.relative(root, file)}  (${(contents.length / 1024).toFixed(1)} kB)`);
};

console.log("Prerendering:");

for (const route of ROUTES) {
  const html = await render(route.path, route.lang);
  await writePage(
    path.join(route.path, "index.html"),
    fillTemplate({ lang: route.lang, head: buildHead(route), html, moduleId: PAGE_MODULES[route.page] }),
  );
}

const notFoundHtml = await render(NOT_FOUND_PATH, DEFAULT_LANG);
await writePage(
  "404.html",
  fillTemplate({ lang: DEFAULT_LANG, head: buildNotFoundHead(), html: notFoundHtml, moduleId: PAGE_MODULES.notFound }),
);

await writePage("sitemap.xml", buildSitemap());

// The SPA shell is no longer served (nginx redirects "/" to "/fr/"), and the manifest and
// server bundle are build-time only.
await fs.rm(path.join(distDir, "index.html"));
await fs.rm(path.join(distDir, ".vite"), { recursive: true, force: true });
await fs.rm(ssrDir, { recursive: true, force: true });
