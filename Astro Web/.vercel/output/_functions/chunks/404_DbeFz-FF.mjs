import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate, B as maybeRenderHead } from './entrypoint_DrcobDen.mjs';
import { $ as $$Layout } from './Layout_CpAOXY_u.mjs';
import { u as useTranslations, a as $$Header, b as $$LinkButton, $ as $$Footer } from './Footer_x-Ca5K3v.mjs';
import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$404;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const t = useTranslations(locale);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.notFound.title} | ${config.site.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main id="main-content" class="app-layout flex flex-1 items-center justify-center"> <div class="mb-14 flex flex-col items-center justify-center"> <h1 class="text-accent text-9xl font-bold">404</h1> <span aria-hidden="true"> ¯\\_(ツ)_/¯ </span> <p class="mt-4 text-2xl sm:text-3xl">${t.notFound.message}</p> ${renderComponent($$result2, "LinkButton", $$LinkButton, { "href": getRelativeLocaleUrl(locale, ""), "class": "my-6 text-lg underline decoration-dashed underline-offset-8" }, { "default": ($$result3) => renderTemplate`${t.notFound.goHome}` })} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/404.astro", void 0);

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
