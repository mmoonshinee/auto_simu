import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { B as maybeRenderHead, p as addAttribute, P as renderTemplate, O as renderSlot } from './entrypoint_DrcobDen.mjs';
import 'clsx';
import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { s as stripBase, a as stripLocale, r as renderScript } from './Layout_CpAOXY_u.mjs';
import { u as useTranslations } from './Footer_x-Ca5K3v.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

const $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const t = useTranslations(locale);
  const pathWithoutBase = stripBase(Astro2.url.pathname).replace(/\/+$/, "");
  const currentUrlPath = stripLocale(pathWithoutBase, locale);
  const breadcrumbList = currentUrlPath.split("/").slice(1).filter(Boolean);
  const decodeSegment = (value) => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  };
  const navLabels = {
    posts: t.nav.posts,
    tags: t.nav.tags,
    about: t.nav.about,
    archives: t.nav.archives,
    search: t.nav.search
  };
  if (breadcrumbList[0] === "posts") {
    breadcrumbList.splice(
      0,
      2,
      `${t.nav.posts} (${t.pagination.page.toLowerCase()} ${breadcrumbList[1] || 1})`
    );
  }
  if (breadcrumbList[0] === "tags" && !isNaN(Number(breadcrumbList[2]))) {
    breadcrumbList.splice(
      1,
      3,
      `${decodeSegment(breadcrumbList[1])} ${Number(breadcrumbList[2]) === 1 ? "" : `(${t.pagination.page.toLowerCase()} ${breadcrumbList[2]})`}`
    );
  }
  return renderTemplate`${maybeRenderHead()}<nav class="app-layout mt-8 mb-1" aria-label="breadcrumb"> <ul class="font-light [&>li]:inline [&>li:not(:last-child)>a]:hover:opacity-100"> <li> <a${addAttribute(getRelativeLocaleUrl(locale, ""), "href")} class="opacity-80"> ${t.nav.home} </a> <span aria-hidden="true" class="opacity-80">&raquo;</span> </li> ${breadcrumbList.map(
    (breadcrumb, index) => index + 1 === breadcrumbList.length ? renderTemplate`<li> <span${addAttribute(["capitalize opacity-75", { lowercase: index > 0 }], "class:list")} aria-current="page">  ${navLabels[breadcrumb] ?? decodeSegment(breadcrumb)} </span> </li>` : renderTemplate`<li> <a${addAttribute(getRelativeLocaleUrl(locale, breadcrumb), "href")} class="capitalize opacity-70"> ${navLabels[breadcrumb] ?? decodeSegment(breadcrumb)} </a> <span aria-hidden="true" class="opacity-70">
&raquo;
</span> </li>`
  )} </ul> </nav>`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/components/Breadcrumb.astro", void 0);

const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Main;
  const { pageTitle, pageDesc, class: className } = Astro2.props;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const backUrl = config.features.showBackButton ? Astro2.url.pathname : getRelativeLocaleUrl(locale, "");
  return renderTemplate`${maybeRenderHead()}<main${addAttribute(backUrl, "data-backUrl")} id="main-content"${addAttribute(["app-layout pb-4", className], "class:list")}> <h1 class="text-2xl font-semibold sm:text-3xl">${pageTitle}</h1> <p class="mt-2 mb-6 italic">${pageDesc}</p> ${renderSlot($$result, $$slots["default"])} </main> ${renderScript($$result, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/components/Main.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/components/Main.astro", void 0);

export { $$Breadcrumb as $, $$Main as a };
