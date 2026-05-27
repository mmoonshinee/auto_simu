import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate, B as maybeRenderHead } from './entrypoint_DrcobDen.mjs';
import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { g as getCollection } from './_astro_content_DHf_0YVy.mjs';
import { $ as $$Layout } from './Layout_CpAOXY_u.mjs';
import { u as useTranslations, a as $$Header, $ as $$Footer } from './Footer_x-Ca5K3v.mjs';
import { $ as $$Breadcrumb, a as $$Main } from './Main_DK8_E5Px.mjs';
import { $ as $$Card } from './Card_HFoPMuz6.mjs';
import { p as postFilter } from './postFilter_BjTpXD-h.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

function getPostsByGroupCondition(posts, groupFunction) {
  const result = {};
  for (let i = 0; i < posts.length; i++) {
    const item = posts[i];
    const groupKey = groupFunction(item, i);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  }
  return result;
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const notFoundUrl = getRelativeLocaleUrl(locale, "404");
  if (!config.features.showArchives && notFoundUrl) {
    return Astro2.rewrite(notFoundUrl);
  }
  const t = useTranslations(locale);
  const posts = await getCollection("posts");
  const filteredPosts = posts.filter(postFilter);
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.pages.archivesTitle} | ${config.site.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, {})} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": t.pages.archivesTitle, "pageDesc": t.pages.archivesDesc }, { "default": async ($$result3) => renderTemplate`${Object.entries(
    getPostsByGroupCondition(
      filteredPosts,
      (post) => post.data.pubDatetime.getFullYear()
    )
  ).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)).map(([year, yearGroup]) => renderTemplate`${maybeRenderHead()}<div> <span class="text-2xl font-bold">${year}</span> <sup class="text-muted-foreground text-sm">${yearGroup.length}</sup> ${Object.entries(
    getPostsByGroupCondition(
      yearGroup,
      (post) => post.data.pubDatetime.getMonth() + 1
    )
  ).sort(([monthA], [monthB]) => Number(monthB) - Number(monthA)).map(([month, monthGroup]) => renderTemplate`<div class="flex flex-col sm:flex-row"> <div class="mt-6 min-w-36 text-lg sm:my-6"> <span class="font-bold"> ${monthFormatter.format(
    new Date(2e3, Number(month) - 1, 1)
  )} </span> <sup class="text-muted-foreground text-xs"> ${monthGroup.length} </sup> </div> <ul> ${monthGroup.sort(
    (a, b) => Math.floor(
      new Date(b.data.pubDatetime).getTime() / 1e3
    ) - Math.floor(
      new Date(a.data.pubDatetime).getTime() / 1e3
    )
  ).map((data) => renderTemplate`${renderComponent($$result3, "Card", $$Card, { ...data })}`)} </ul> </div>`)} </div>`)}` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/archives/index.astro", void 0);

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/archives/index.astro";
const $$url = "/archives";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
