import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { r as createRenderInstruction, p as addAttribute, P as renderTemplate, O as renderSlot, K as renderHead, H as renderComponent } from './entrypoint_DrcobDen.mjs';
import 'clsx';
import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/node_modules/astro/components/ClientRouter.astro", void 0);

const base = "/".replace(/\/+$/, "");
const baseRoot = base === "" ? "/" : `${base}/`;
function stripLocale(pathname, locale) {
  const prefix = `/${locale}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}
function stripBase(pathname) {
  if (base === "") {
    return pathname;
  }
  if (pathname === base) {
    return "/";
  }
  if (pathname.startsWith(baseRoot)) {
    const stripped = pathname.slice(base.length);
    return stripped === "" ? "/" : stripped;
  }
  return pathname;
}
function getAssetPath(path) {
  const normalizedPath = path.replace(/^\/+/, "");
  if (!normalizedPath) {
    return base === "" ? "/" : base;
  }
  return baseRoot + normalizedPath;
}

const publicFiles = /* #__PURE__ */ Object.assign({"/public/default-og.jpg": () => import('./default-og_oObrULj3.mjs'),"/public/favicon.svg": () => import('./favicon_BM1_qR26.mjs')});
function existsInPublic(filename) {
  return `/public/${filename}` in publicFiles;
}
function resolveDefaultOgImagePath(config) {
  const filename = config.site.ogImage;
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    throw new Error(
      `site.ogImage must be a single filename in public/ (e.g. "default-og.jpg"), got "${filename}"`
    );
  }
  if (config.features.dynamicOgImage) {
    return existsInPublic(filename) ? getAssetPath(filename) : getAssetPath("og.png");
  }
  if (!existsInPublic(filename)) {
    throw new Error(
      `AstroPaper: missing public/${filename}. Add that file, or set site.ogImage to an existing file under public/, or enable features.dynamicOgImage to fall back to /og.png.`
    );
  }
  return getAssetPath(filename);
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { site } = config;
  const {
    title = site.title,
    description = site.description,
    ogImage = resolveDefaultOgImagePath(config),
    canonicalURL = new URL(Astro2.url.pathname, Astro2.site).href
  } = Astro2.props;
  const socialImageURL = new URL(ogImage, Astro2.site ?? Astro2.url);
  const rssHref = getRelativeLocaleUrl(
    Astro2.currentLocale ?? config.site.lang,
    "rss.xml"
  );
  return renderTemplate(_a || (_a = __template(["<html", "", ' class="overflow-y-scroll scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml"', '><link rel="icon"', '><link rel="canonical"', '><meta name="generator"', "><!-- Primary meta --><title>", '</title><meta name="title"', '><meta name="description"', '><meta name="author"', '><link rel="sitemap"', '><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:site_name"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><!-- Twitter / X --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- RSS autodiscovery --><link rel="alternate" type="application/rss+xml"', "", '><!-- Filled at runtime by theme.ts to match the current background colour --><meta name="theme-color" content=""><!-- Extra head content injected by child layouts (e.g. JSON-LD, article meta) -->', "", '<!--\n      Inline FOUC-prevention script: sets data-theme on <html> before\n      the browser paints. Runs synchronously, no defer/async.\n    --><script>\n      (function () {\n        const stored = localStorage.getItem("theme");\n        const prefersDark = window.matchMedia(\n          "(prefers-color-scheme: dark)"\n        ).matches;\n        const theme = stored ?? (prefersDark ? "dark" : "light");\n        document.firstElementChild?.setAttribute("data-theme", theme);\n        // Expose value so theme.ts can skip re-detection.\n        window.__theme = { value: theme };\n      })();\n    <\/script>', "", '</head> <body class="bg-background font-app text-foreground selection:bg-accent/75 selection:text-accent-foreground flex min-h-svh flex-col"> ', " ", " </body> </html>"])), addAttribute(site.dir ?? "ltr", "dir"), addAttribute(Astro2.currentLocale ?? site.lang, "lang"), addAttribute(getAssetPath("favicon.svg"), "href"), addAttribute(getAssetPath("favicon.ico"), "href"), addAttribute(canonicalURL, "href"), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(site.author, "content"), addAttribute(getAssetPath("sitemap-index.xml"), "href"), addAttribute(site.title, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonicalURL, "content"), addAttribute(socialImageURL, "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), addAttribute(site.title, "title"), addAttribute(new URL(rssHref, Astro2.site), "href"), renderSlot($$result, $$slots["head"]), site.googleVerification && renderTemplate`<meta name="google-site-verification"${addAttribute(site.googleVerification, "content")}>`, renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderHead(), renderSlot($$result, $$slots["default"]), renderScript($$result, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/layouts/Layout.astro", void 0);

export { $$Layout as $, stripLocale as a, getAssetPath as g, renderScript as r, stripBase as s };
