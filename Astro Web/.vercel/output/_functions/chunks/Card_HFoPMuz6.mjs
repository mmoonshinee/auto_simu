import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { B as maybeRenderHead, p as addAttribute, H as renderComponent, Q as renderTransition, P as renderTemplate } from './entrypoint_DrcobDen.mjs';
import { a as getPostUrl } from './getPostPaths_BE0xluTS.mjs';
import { a as slugifyStr } from './slugify_DE7qmG4w.mjs';
import { $ as $$Datetime } from './Datetime_BG2TqxfE.mjs';
/* empty css                          */

const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Card;
  const { variant: Heading = "h2", id, data, filePath } = Astro2.props;
  const { title, description, ...props } = data;
  return renderTemplate`${maybeRenderHead()}<li class="my-6"> <a${addAttribute(getPostUrl(id, filePath, Astro2.currentLocale), "href")}${addAttribute([
    "text-accent inline-block text-lg font-medium",
    "decoration-dashed underline-offset-4 hover:underline",
    "focus-visible:no-underline focus-visible:underline-offset-0"
  ], "class:list")}> ${renderComponent($$result, "Heading", Heading, { "data-astro-transition-scope": renderTransition($$result, "2jhrfvd3", "", slugifyStr(title.replaceAll(".", "-"))) }, { "default": ($$result2) => renderTemplate`${title}` })} </a> ${renderComponent($$result, "Datetime", $$Datetime, { ...props })} <p>${description}</p> </li>`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/components/Card.astro", "self");

export { $$Card as $ };
