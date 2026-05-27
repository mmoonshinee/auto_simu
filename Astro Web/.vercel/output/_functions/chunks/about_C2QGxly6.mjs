import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate } from './entrypoint_DrcobDen.mjs';
import { a as getEntry, r as renderEntry } from './_astro_content_DHf_0YVy.mjs';
import { $ as $$Layout } from './Layout_CpAOXY_u.mjs';
import { a as $$Header, $ as $$Footer } from './Footer_x-Ca5K3v.mjs';
import { $ as $$Breadcrumb, a as $$Main } from './Main_DK8_E5Px.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const about = await getEntry("pages", "about");
  if (!about) {
    throw new Error(
      "Missing content entry: `about.md` or `about.mdx` in `src/content/pages/`"
    );
  }
  const { Content } = await renderEntry(about);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${about.data.title} | ${config.site.title}`, "description": about.data.description, "ogImage": about.data.ogImage, "canonicalURL": about.data.canonicalURL }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, {})} ${renderComponent($$result2, "Main", $$Main, { "pageTitle": about.data.title, "class": "app-prose" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, {})} ` })} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/about.astro", void 0);

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
