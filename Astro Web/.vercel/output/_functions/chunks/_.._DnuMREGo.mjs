import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate, B as maybeRenderHead } from './entrypoint_DrcobDen.mjs';
import { g as getCollection } from './_astro_content_DHf_0YVy.mjs';
import { $ as $$Layout } from './Layout_CpAOXY_u.mjs';
import { u as useTranslations, a as $$Header, $ as $$Footer } from './Footer_x-Ca5K3v.mjs';
import { $ as $$Breadcrumb, a as $$Main } from './Main_DK8_E5Px.mjs';
import { $ as $$Card } from './Card_HFoPMuz6.mjs';
import { $ as $$Pagination } from './Pagination_5jk6IwGi.mjs';
import { g as getSortedPosts } from './getSortedPosts_DXEbXnHZ.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

const getStaticPaths = (async ({ paginate }) => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return paginate(getSortedPosts(posts), { pageSize: config.posts.perPage });
});
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const t = useTranslations(locale);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t.pages.postsTitle} | ${config.site.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, {})} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": t.pages.postsTitle, "pageDesc": t.pages.postsDesc }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<ul> ${page.data.map((data) => renderTemplate`${renderComponent($$result3, "Card", $$Card, { ...data })}`)} </ul> ` })} ${renderComponent($$result2, "Pagination", $$Pagination, { "page": page })} ${renderComponent($$result2, "Footer", $$Footer, { "noMarginTop": page.lastPage > 1 })} ` })}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...page].astro", void 0);

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...page].astro";
const $$url = "/posts/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
