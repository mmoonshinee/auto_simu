import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate, B as maybeRenderHead } from './entrypoint_DrcobDen.mjs';
import { g as getCollection } from './_astro_content_DHf_0YVy.mjs';
import { $ as $$Layout } from './Layout_CpAOXY_u.mjs';
import { u as useTranslations, a as $$Header, $ as $$Footer } from './Footer_x-Ca5K3v.mjs';
import { $ as $$Breadcrumb, a as $$Main } from './Main_DK8_E5Px.mjs';
import { $ as $$Tag } from './Tag_DnIQV-MV.mjs';
import { g as getUniqueTags } from './getUniqueTags_UZA--fbB.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const tags = getUniqueTags(posts);
  const locale = Astro2.currentLocale ?? config.site.lang;
  const t = useTranslations(locale);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.pages.tagsTitle} | ${config.site.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, {})} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": t.pages.tagsTitle, "pageDesc": t.pages.tagsDesc }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<ul class="flex flex-wrap gap-6"> ${tags.map(({ tag, tagName }) => renderTemplate`${renderComponent($$result3, "Tag", $$Tag, { "tag": tag, "tagName": tagName })}`)} </ul> ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/tags/index.astro", void 0);

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/tags/index.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
