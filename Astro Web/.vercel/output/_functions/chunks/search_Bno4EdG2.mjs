import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate, B as maybeRenderHead, p as addAttribute, s as createTransitionScope } from './entrypoint_DrcobDen.mjs';
import { g as getAssetPath, $ as $$Layout, r as renderScript } from './Layout_CpAOXY_u.mjs';
import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { u as useTranslations, a as $$Header, $ as $$Footer } from './Footer_x-Ca5K3v.mjs';
import { $ as $$Breadcrumb, a as $$Main } from './Main_DK8_E5Px.mjs';
import { c as config } from './config_Bf99gZGu.mjs';
/* empty css                          */

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Search;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const notFoundUrl = getRelativeLocaleUrl(locale, "404");
  if (config.features.search !== "pagefind" && notFoundUrl) {
    return Astro2.rewrite(notFoundUrl);
  }
  const backUrl = config.features.showBackButton ? `${Astro2.url.pathname}` : getRelativeLocaleUrl(locale, "");
  const pagefindBundlePath = getAssetPath("pagefind/");
  const t = useTranslations(locale);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.pages.searchTitle} | ${config.site.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, {})} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": t.pages.searchTitle, "pageDesc": t.pages.searchDesc }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<div id="pagefind-search"${addAttribute(backUrl, "data-backurl")}${addAttribute(pagefindBundlePath, "data-bundle-path")}${addAttribute(createTransitionScope($$result3, "x3tswf4y"), "data-astro-transition-persist")}></div> ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} ${renderScript($$result, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/search.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/search.astro", "self");

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
