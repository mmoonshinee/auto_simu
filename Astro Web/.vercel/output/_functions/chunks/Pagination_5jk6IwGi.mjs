import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { B as maybeRenderHead, H as renderComponent, P as renderTemplate } from './entrypoint_DrcobDen.mjs';
import { I as IconArrowLeft } from './IconArrowLeft_B6NIojpd.mjs';
import { I as IconArrowRight } from './IconArrowRight_CudhOhdq.mjs';
import { u as useTranslations, b as $$LinkButton } from './Footer_x-Ca5K3v.mjs';

const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Pagination;
  const { page } = Astro2.props;
  const t = useTranslations(Astro2.currentLocale);
  return renderTemplate`${page.lastPage > 1 && renderTemplate`${maybeRenderHead()}<nav class="mt-auto mb-8 flex justify-center gap-4" role="navigation" aria-label="Pagination Navigation">${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": !page.url.prev, "href": page.url.prev, "class:list": ["select-none", { "opacity-50": !page.url.prev }], "aria-label": t.a11y.goToPreviousPage }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "IconArrowLeft", IconArrowLeft, { "class": "inline-block rtl:rotate-180" })}${t.pagination.prev}` })}${page.currentPage} / ${page.lastPage}${renderComponent($$result, "LinkButton", $$LinkButton, { "disabled": !page.url.next, "href": page.url.next, "class:list": ["select-none", { "opacity-50": !page.url.next }], "aria-label": t.a11y.goToNextPage }, { "default": ($$result2) => renderTemplate`${t.pagination.next}${renderComponent($$result2, "IconArrowRight", IconArrowRight, { "class": "inline-block rtl:rotate-180" })}` })}</nav>`}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/components/Pagination.astro", void 0);

export { $$Pagination as $ };
