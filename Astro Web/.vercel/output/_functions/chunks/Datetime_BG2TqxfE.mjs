import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { B as maybeRenderHead, p as addAttribute, H as renderComponent, P as renderTemplate } from './entrypoint_DrcobDen.mjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import { c as createSvgComponent } from './runtime_PKp2n2vC.mjs';
import { c as config } from './config_Bf99gZGu.mjs';
import { u as useTranslations } from './Footer_x-Ca5K3v.mjs';

const IconCalendar = createSvgComponent({"meta":{"src":"/_astro/IconCalendar.C0xY3fv4.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","class":"icon icon-tabler icons-tabler-outline icon-tabler-calendar-week","viewBox":"0 0 24 24"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM16 3v4M8 3v4M4 11h16M7 14h.013M10.01 14h.005M13.01 14h.005M16.015 14h.005M13.015 17h.005M7.01 17h.005M10.01 17h.005\" />","styles":[]});

const $$Datetime = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Datetime;
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const {
    pubDatetime,
    modDatetime,
    size = "sm",
    class: className = "",
    timezone: postTimezone
  } = Astro2.props;
  const t = useTranslations(Astro2.currentLocale);
  const isModified = modDatetime && modDatetime > pubDatetime;
  const datetime = dayjs(isModified ? modDatetime : pubDatetime).tz(
    postTimezone ?? config.site.timezone
  );
  const date = datetime.format("D MMM, YYYY");
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["text-muted-foreground flex items-center gap-x-2", className], "class:list")}> ${renderComponent($$result, "IconCalendar", IconCalendar, { "class:list": [
    "inline-block size-6 min-w-5.5",
    { "scale-90": size === "sm" }
  ] })} ${isModified && renderTemplate`<span${addAttribute(["text-sm", { "sm:text-base": size === "lg" }], "class:list")}> ${t.post.updatedAt}:
</span>`} <time${addAttribute(["text-sm", { "sm:text-base": size === "lg" }], "class:list")}${addAttribute(datetime.toISOString(), "datetime")}> ${date} </time> </div>`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/components/Datetime.astro", void 0);

export { $$Datetime as $ };
