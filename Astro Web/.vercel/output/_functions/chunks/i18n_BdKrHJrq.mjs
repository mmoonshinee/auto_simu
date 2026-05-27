import { w as getLocaleRelativeUrl } from './entrypoint_DrcobDen.mjs';
import 'piccolore';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

function toRoutingStrategy(routing, domains) {
  let strategy;
  const hasDomains = domains ? Object.keys(domains).length > 0 : false;
  if (routing === "manual") {
    strategy = "manual";
  } else {
    if (!hasDomains) {
      if (routing?.prefixDefaultLocale === true) {
        if (routing.redirectToDefaultLocale) {
          strategy = "pathname-prefix-always";
        } else {
          strategy = "pathname-prefix-always-no-redirect";
        }
      } else {
        strategy = "pathname-prefix-other-locales";
      }
    } else {
      if (routing?.prefixDefaultLocale === true) {
        if (routing.redirectToDefaultLocale) {
          strategy = "domains-prefix-always";
        } else {
          strategy = "domains-prefix-always-no-redirect";
        }
      } else {
        strategy = "domains-prefix-other-locales";
      }
    }
  }
  return strategy;
}

const i18n$1 = {
  defaultLocale: "en",
  locales: ["en"],
  routing: {"prefixDefaultLocale":false,"redirectToDefaultLocale":true},
  domains: undefined
};
const trailingSlash$1 = "ignore";
const build$1 = {
  format: "directory",
};

const config = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  build: build$1,
  i18n: i18n$1,
  trailingSlash: trailingSlash$1
}, Symbol.toStringTag, { value: 'Module' }));

const { trailingSlash, i18n, build } = config;
const { format } = build;
const { defaultLocale, locales, domains, routing } = i18n;
const base = "/";
let strategy = toRoutingStrategy(routing, domains);
const getRelativeLocaleUrl = (locale, path, options) => getLocaleRelativeUrl({
  locale,
  path,
  base,
  trailingSlash,
  format,
  defaultLocale,
  locales,
  strategy,
  ...options
});

export { getRelativeLocaleUrl as g };
