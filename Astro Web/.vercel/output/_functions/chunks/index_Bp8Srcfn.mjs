import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate, B as maybeRenderHead, p as addAttribute } from './entrypoint_DrcobDen.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_CpAOXY_u.mjs';
import { g as getCollection } from './_astro_content_DHf_0YVy.mjs';
import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { c as createSvgComponent } from './runtime_PKp2n2vC.mjs';
import { I as IconArrowRight } from './IconArrowRight_CudhOhdq.mjs';
import { a as $$Header, b as $$LinkButton, c as $$Socials, $ as $$Footer, u as useTranslations } from './Footer_x-Ca5K3v.mjs';
import { $ as $$Card } from './Card_HFoPMuz6.mjs';
import { g as getSortedPosts } from './getSortedPosts_DXEbXnHZ.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

const IconRss = createSvgComponent({"meta":{"src":"/_astro/IconRss.BYWRoVjV.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","class":"icon icon-tabler icons-tabler-outline icon-tabler-rss","viewBox":"0 0 24 24"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"M4 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0M4 4a16 16 0 0 1 16 16M4 11a9 9 0 0 1 9 9\" />","styles":[]});

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { socials, posts: postsConfig } = config;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const t = useTranslations(locale);
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);
  const featuredPosts = sortedPosts.filter(({ data }) => data.featured);
  const recentPosts = sortedPosts.filter(({ data }) => !data.featured);
  const homePath = getRelativeLocaleUrl(locale, "");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main id="main-content" data-layout="index"${addAttribute(homePath, "data-home-path")} class="app-layout"> <section id="hero" class="border-border border-b pt-8 pb-6"> <h1 class="my-4 inline-block text-4xl font-bold sm:my-8 sm:text-5xl">
Mingalaba
</h1> <a target="_blank"${addAttribute(getRelativeLocaleUrl(locale, "rss.xml"), "href")} class="inline-block" aria-label="RSS Feed" title="RSS Feed"> ${renderComponent($$result2, "IconRss", IconRss, { "width": 20, "height": 20, "class": "stroke-accent scale-125 stroke-3 rtl:-rotate-90" })} <span class="sr-only">RSS Feed</span> </a> <p>
AstroPaper is a minimal, responsive, accessible and SEO-friendly Astro
        blog theme. This theme follows best practices and provides accessibility
        out of the box. Light and dark mode are supported by default. Moreover,
        additional color schemes can also be configured.
</p> <p class="mt-2">
Read the blog posts or check
${renderComponent($$result2, "LinkButton", $$LinkButton, { "class": "hover:text-accent underline decoration-dashed underline-offset-4", "href": "https://github.com/satnaing/astro-paper#readme" }, { "default": async ($$result3) => renderTemplate`
README
` })} for more info.
</p> ${socials.length > 0 && renderTemplate`<div class="mt-4 flex max-sm:flex-col sm:items-center"> <div class="me-2 mb-1 whitespace-nowrap sm:mb-0"> ${t.home.socialLinks}:
</div> ${renderComponent($$result2, "Socials", $$Socials, {})} </div>`} </section> ${featuredPosts.length > 0 && renderTemplate`<section id="featured"${addAttribute([
    "pt-12 pb-6",
    { "border-border border-b": recentPosts.length > 0 }
  ], "class:list")}> <h2 class="text-2xl font-semibold tracking-wide"> ${t.home.featured} </h2> <ul> ${featuredPosts.map((data) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "variant": "h3", ...data })}`)} </ul> </section>`} ${recentPosts.length > 0 && renderTemplate`<section id="recent-posts" class="pt-12 pb-6"> <h2 class="text-2xl font-semibold tracking-wide"> ${t.home.recentPosts} </h2> <ul> ${recentPosts.slice(0, postsConfig.perIndex).map((data) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "variant": "h3", ...data })}`)} </ul> </section>`} <div class="my-8 text-center"> ${renderComponent($$result2, "LinkButton", $$LinkButton, { "href": getRelativeLocaleUrl(locale, "posts") }, { "default": async ($$result3) => renderTemplate`${t.home.allPosts}${renderComponent($$result3, "IconArrowRight", IconArrowRight, { "class": "inline-block rtl:-rotate-180" })} ` })} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} ${renderScript($$result, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/index.astro", void 0);

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
