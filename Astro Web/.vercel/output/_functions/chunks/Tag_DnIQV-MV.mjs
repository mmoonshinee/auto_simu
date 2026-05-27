import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { B as maybeRenderHead, p as addAttribute, Q as renderTransition, H as renderComponent, P as renderTemplate } from './entrypoint_DrcobDen.mjs';
import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { c as createSvgComponent } from './runtime_PKp2n2vC.mjs';
import { c as config } from './config_Bf99gZGu.mjs';
/* empty css                          */

const IconHash = createSvgComponent({"meta":{"src":"/_astro/IconHash.CPmqEwD_.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","class":"icon icon-tabler icons-tabler-outline icon-tabler-hash","viewBox":"0 0 24 24"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"M5 9h14M5 15h14M11 4 7 20M17 4l-4 16\" />","styles":[]});

const $$Tag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Tag;
  const { tag, tagName, size = "lg" } = Astro2.props;
  const locale = Astro2.currentLocale ?? config.site.lang;
  return renderTemplate`${maybeRenderHead()}<li> <a${addAttribute(getRelativeLocaleUrl(locale, `tags/${tag}/`), "href")}${addAttribute([
    "flex items-center gap-0.5",
    "border-foreground border-b-2 border-dashed",
    "hover:border-accent hover:text-accent hover:-mt-0.5",
    "focus-visible:text-accent focus-visible:border-none",
    { "text-sm": size === "sm" },
    { "text-lg": size === "lg" }
  ], "class:list")}${addAttribute(renderTransition($$result, "36ssibgs", "", tag), "data-astro-transition-scope")}> ${renderComponent($$result, "IconHash", IconHash, { "class:list": [
    "opacity-80",
    { "size-5": size === "lg" },
    { "size-4": size === "sm" }
  ] })} ${tagName} </a> </li>`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/components/Tag.astro", "self");

export { $$Tag as $ };
