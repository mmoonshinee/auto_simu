import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { B as maybeRenderHead, p as addAttribute, O as renderSlot, P as renderTemplate } from './entrypoint_DrcobDen.mjs';
import 'clsx';

const $$ResponsiveTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ResponsiveTable;
  const { class: className, variant } = Astro2.props;
  const variantClasses = {
    minimal: "[&_td]:border-0 [&_th]:border-0",
    striped: "[&_tbody_tr]:odd:bg-muted/25"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(variant, "data-table-variant")}${addAttribute([
    "overflow-hidden [&_table]:my-0 [&_table]:min-w-xl",
    variant === "minimal" && variantClasses.minimal,
    variant === "striped" && variantClasses.striped,
    variant === "striped-minimal" && `${variantClasses.minimal} ${variantClasses.striped}`,
    className
  ], "class:list")}> <div class="relative w-full overflow-x-auto"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/components/ResponsiveTable.astro", void 0);

export { $$ResponsiveTable as $ };
