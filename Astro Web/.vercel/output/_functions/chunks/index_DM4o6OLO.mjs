import { c as createComponent } from './astro-component_CxWynuvT.mjs';
import 'piccolore';
import { H as renderComponent, P as renderTemplate, f as Fragment, X as unescapeHTML, p as addAttribute, O as renderSlot, B as maybeRenderHead } from './entrypoint_DrcobDen.mjs';
import { g as getCollection, r as renderEntry } from './_astro_content_DHf_0YVy.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_CpAOXY_u.mjs';
import { c as config } from './config_Bf99gZGu.mjs';
import { u as useTranslations, b as $$LinkButton, a as $$Header, $ as $$Footer } from './Footer_x-Ca5K3v.mjs';
import { $ as $$Datetime } from './Datetime_BG2TqxfE.mjs';
import { $ as $$Tag } from './Tag_DnIQV-MV.mjs';
import { a as getPostUrl, g as getPostSlug } from './getPostPaths_BE0xluTS.mjs';
import { g as getSortedPosts } from './getSortedPosts_DXEbXnHZ.mjs';
import { a as slugifyStr } from './slugify_DE7qmG4w.mjs';
import { c as createSvgComponent } from './runtime_PKp2n2vC.mjs';
import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { I as IconArrowLeft } from './IconArrowLeft_B6NIojpd.mjs';
import { I as IconArrowRight } from './IconArrowRight_CudhOhdq.mjs';

function tplStr(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = vars[key];
    return value !== void 0 && value !== null ? String(value) : "";
  });
}

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$PostLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PostLayout;
  const { site } = config;
  const { title, description, ogImage, canonicalURL, pubDatetime, modDatetime } = Astro2.props;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title ?? site.title,
    image: ogImage,
    ...pubDatetime && { datePublished: pubDatetime.toISOString() },
    ...modDatetime && { dateModified: modDatetime.toISOString() },
    author: [
      {
        "@type": "Person",
        name: site.author,
        ...site.profile && { url: site.profile }
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "ogImage": ogImage, "canonicalURL": canonicalURL }, { "default": ($$result2) => renderTemplate`  ${renderSlot($$result2, $$slots["default"])} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a$2 || (_a$2 = __template$2(['  <meta property="og:type" content="article"> ', "", '<script type="application/ld+json">', "<\/script> "])), pubDatetime && renderTemplate`<meta property="article:published_time"${addAttribute(pubDatetime.toISOString(), "content")}>`, modDatetime && renderTemplate`<meta property="article:modified_time"${addAttribute(modDatetime.toISOString(), "content")}>`, unescapeHTML(JSON.stringify(structuredData))) })}` })}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/layouts/PostLayout.astro", void 0);

const IconEdit = createSvgComponent({"meta":{"src":"/_astro/IconEdit.BuUItOMC.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","class":"icon icon-tabler icons-tabler-outline icon-tabler-edit","viewBox":"0 0 24 24"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1\" /><path d=\"M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3\" />","styles":[]});

const $$EditPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EditPost;
  const { hideEditPost, post, class: className = "" } = Astro2.props;
  const editPost = config.features.editPost;
  const href = editPost.enabled ? `${editPost.url}${post.filePath}` : "";
  const showEditPost = editPost.enabled && !hideEditPost && href.trim() !== "";
  const t = useTranslations(Astro2.currentLocale);
  return renderTemplate`${showEditPost && renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} target="_blank" rel="noopener noreferrer"${addAttribute([
    "hover:text-accent text-muted-foreground flex justify-baseline gap-1.5",
    className
  ], "class:list")}>${renderComponent($$result, "IconEdit", IconEdit, { "class": "inline-block" })}<span>${t.post.editPage}</span></a>`}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...slug]/_components/EditPost.astro", void 0);

const $$ShareLinks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ShareLinks;
  const { shareLinks } = config;
  const t = useTranslations(Astro2.currentLocale);
  const icons = /* #__PURE__ */ Object.assign({"/src/assets/icons/socials/facebook.svg": () => import('./facebook_C-DH1vQP.mjs'),"/src/assets/icons/socials/github.svg": () => import('./github_y3TvJWzX.mjs'),"/src/assets/icons/socials/linkedin.svg": () => import('./linkedin_BP_kmDdr.mjs'),"/src/assets/icons/socials/mail.svg": () => import('./mail_BR2HGwbI.mjs'),"/src/assets/icons/socials/pinterest.svg": () => import('./pinterest_BZjekCDq.mjs'),"/src/assets/icons/socials/telegram.svg": () => import('./telegram_BT05odO2.mjs'),"/src/assets/icons/socials/whatsapp.svg": () => import('./whatsapp_BxpljfeE.mjs'),"/src/assets/icons/socials/x.svg": () => import('./x_Cu9P3E78.mjs')});
  const pageUrl = Astro2.url;
  const platformLabel = (name) => name.charAt(0).toUpperCase() + name.slice(1);
  const items = await Promise.all(
    shareLinks.map(async ({ name, url, linkTitle }) => {
      const mod = await icons[`/src/assets/icons/socials/${name}.svg`]?.();
      const Icon = mod?.default;
      const title = linkTitle ?? (name === "mail" ? t.post.sharePostViaEmail : tplStr(t.post.sharePostOn, { platform: platformLabel(name) }));
      return { url, title, Icon };
    })
  );
  return renderTemplate`${items.some(({ Icon }) => Icon) && renderTemplate`${maybeRenderHead()}<div class="flex flex-none flex-col items-center justify-center gap-1 md:items-start"><span class="italic">${t.post.sharePostIntro}</span><div class="text-center">${items.map(
    ({ url, title, Icon }) => Icon ? renderTemplate`${renderComponent($$result, "LinkButton", $$LinkButton, { "href": `${url}${pageUrl}`, "class": "scale-90 p-2 hover:rotate-6 sm:p-1", "title": title, "target": "_blank", "rel": "noopener noreferrer" }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", Icon, { "class": "inline-block size-6 scale-125 fill-transparent stroke-current stroke-2 opacity-90 group-hover:fill-transparent sm:scale-110" })}<span class="sr-only">${title}</span>` })}` : null
  )}</div></div>`}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...slug]/_components/ShareLinks.astro", void 0);

const IconChevronLeft = createSvgComponent({"meta":{"src":"/_astro/IconChevronLeft.DBA9GJaK.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","class":"icon icon-tabler icons-tabler-outline icon-tabler-chevron-left","viewBox":"0 0 24 24"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"m15 6-6 6 6 6\" />","styles":[]});

const $$BackButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BackButton;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const t = useTranslations(locale);
  return renderTemplate`${config.features.showBackButton && renderTemplate`${maybeRenderHead()}<div class="app-layout flex items-center justify-start">${renderComponent($$result, "LinkButton", $$LinkButton, { "id": "back-button", "href": getRelativeLocaleUrl(locale, ""), "class": "focus-outline hover:text-foreground/75 -ms-2 mt-8 mb-2" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "IconChevronLeft", IconChevronLeft, { "class": "inline-block size-6 rtl:rotate-180" })}<span>${t.post.goBack}</span>` })}</div>`}${renderScript($$result, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...slug]/_components/BackButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...slug]/_components/BackButton.astro", void 0);

const IconArrowNarrowUp = createSvgComponent({"meta":{"src":"/_astro/IconArrowNarrowUp.u0CdFf4k.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","class":"icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-up","viewBox":"0 0 24 24"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" /><path d=\"M12 5v14M16 9l-4-4M8 9l4-4\" />","styles":[]});

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$BackToTopButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BackToTopButton;
  const t = useTranslations(Astro2.currentLocale);
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div id="btt-btn-container"', '> <button data-button="back-to-top"', '> <span id="progress-indicator" class="absolute inset-0 -z-10 block size-14 scale-110 rounded-full bg-transparent md:hidden md:h-8 md:rounded-md"></span> ', ' <span class="group-hover:text-accent sr-only text-sm md:not-sr-only"> ', " ", ' </span> </button> </div> <script data-astro-rerun>\n  function backToTop() {\n    const rootElement = document.documentElement;\n    const btnContainer = document.querySelector("#btt-btn-container");\n    const backToTopBtn = document.querySelector("[data-button=\'back-to-top\']");\n    const progressIndicator = document.querySelector("#progress-indicator");\n\n    if (!rootElement || !btnContainer || !backToTopBtn || !progressIndicator)\n      return;\n\n    backToTopBtn.addEventListener("click", () => {\n      document.body.scrollTop = 0;\n      document.documentElement.scrollTop = 0;\n    });\n\n    let lastVisible = null;\n    function handleScroll() {\n      const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;\n      const scrollTop = rootElement.scrollTop;\n      const scrollPercent = Math.floor((scrollTop / scrollTotal) * 100);\n\n      progressIndicator.style.setProperty(\n        "background-image",\n        `conic-gradient(var(--accent), var(--accent) ${scrollPercent}%, transparent ${scrollPercent}%)`\n      );\n\n      const isVisible = scrollTop / scrollTotal > 0.3;\n\n      if (isVisible !== lastVisible) {\n        btnContainer.classList.toggle("opacity-100", isVisible);\n        btnContainer.classList.toggle("translate-y-0", isVisible);\n        btnContainer.classList.toggle("opacity-0", !isVisible);\n        btnContainer.classList.toggle("translate-y-14", !isVisible);\n        lastVisible = isVisible;\n      }\n    }\n\n    let ticking = false;\n    document.addEventListener("scroll", () => {\n      if (!ticking) {\n        window.requestAnimationFrame(() => {\n          handleScroll();\n          ticking = false;\n        });\n        ticking = true;\n      }\n    });\n  }\n  backToTop();\n<\/script>'], ["", '<div id="btt-btn-container"', '> <button data-button="back-to-top"', '> <span id="progress-indicator" class="absolute inset-0 -z-10 block size-14 scale-110 rounded-full bg-transparent md:hidden md:h-8 md:rounded-md"></span> ', ' <span class="group-hover:text-accent sr-only text-sm md:not-sr-only"> ', " ", ' </span> </button> </div> <script data-astro-rerun>\n  function backToTop() {\n    const rootElement = document.documentElement;\n    const btnContainer = document.querySelector("#btt-btn-container");\n    const backToTopBtn = document.querySelector("[data-button=\'back-to-top\']");\n    const progressIndicator = document.querySelector("#progress-indicator");\n\n    if (!rootElement || !btnContainer || !backToTopBtn || !progressIndicator)\n      return;\n\n    backToTopBtn.addEventListener("click", () => {\n      document.body.scrollTop = 0;\n      document.documentElement.scrollTop = 0;\n    });\n\n    let lastVisible = null;\n    function handleScroll() {\n      const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;\n      const scrollTop = rootElement.scrollTop;\n      const scrollPercent = Math.floor((scrollTop / scrollTotal) * 100);\n\n      progressIndicator.style.setProperty(\n        "background-image",\n        \\`conic-gradient(var(--accent), var(--accent) \\${scrollPercent}%, transparent \\${scrollPercent}%)\\`\n      );\n\n      const isVisible = scrollTop / scrollTotal > 0.3;\n\n      if (isVisible !== lastVisible) {\n        btnContainer.classList.toggle("opacity-100", isVisible);\n        btnContainer.classList.toggle("translate-y-0", isVisible);\n        btnContainer.classList.toggle("opacity-0", !isVisible);\n        btnContainer.classList.toggle("translate-y-14", !isVisible);\n        lastVisible = isVisible;\n      }\n    }\n\n    let ticking = false;\n    document.addEventListener("scroll", () => {\n      if (!ticking) {\n        window.requestAnimationFrame(() => {\n          handleScroll();\n          ticking = false;\n        });\n        ticking = true;\n      }\n    });\n  }\n  backToTop();\n<\/script>'])), maybeRenderHead(), addAttribute([
    "fixed inset-e-4 bottom-8 z-50",
    "md:sticky md:inset-e-auto md:float-end md:me-1",
    "translate-y-14 opacity-0 transition duration-500"
  ], "class:list"), addAttribute([
    "group bg-background relative px-2 py-1",
    "size-14 rounded-full shadow-xl",
    "md:h-8 md:w-fit md:rounded-md md:shadow-none md:focus-visible:rounded-none",
    "md:bg-background/35 md:bg-clip-padding md:backdrop-blur-lg"
  ], "class:list"), renderComponent($$result, "IconArrowLeft", IconArrowLeft, { "class": "inline-block rotate-90 md:hidden" }), renderComponent($$result, "IconArrowNarrowUp", IconArrowNarrowUp, { "class": "inline-block size-4" }), t.post.backToTop);
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...slug]/_components/BackToTopButton.astro", void 0);

const $$AdjacentPostNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdjacentPostNav;
  const { prevPost, nextPost } = Astro2.props;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const t = useTranslations(locale);
  return renderTemplate`${maybeRenderHead()}<div data-pagefind-ignore class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2"> ${prevPost && renderTemplate`<a${addAttribute(getPostUrl(prevPost.id, prevPost.filePath, locale), "href")} class="flex w-full gap-1 hover:opacity-75"> ${renderComponent($$result, "IconArrowLeft", IconArrowLeft, { "class": "inline-block flex-none rtl:rotate-180" })} <div> <span>${t.post.previousPost}</span> <div class="text-accent/85 text-sm">${prevPost.title}</div> </div> </a>`} ${nextPost && renderTemplate`<a${addAttribute(getPostUrl(nextPost.id, nextPost.filePath, locale), "href")} class="flex w-full justify-end gap-1 text-end hover:opacity-75 sm:col-start-2"> <div> <span>${t.post.nextPost}</span> <div class="text-accent/85 text-sm">${nextPost.title}</div> </div> ${renderComponent($$result, "IconArrowRight", IconArrowRight, { "class": "inline-block flex-none rtl:rotate-180" })} </a>`} </div>`;
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...slug]/_components/AdjacentPostNav.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
async function getStaticPaths() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);
  return sortedPosts.map((post, index) => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: {
      post,
      prevPost: index > 0 ? {
        id: sortedPosts[index - 1].id,
        title: sortedPosts[index - 1].data.title,
        filePath: sortedPosts[index - 1].filePath
      } : null,
      nextPost: index < sortedPosts.length - 1 ? {
        id: sortedPosts[index + 1].id,
        title: sortedPosts[index + 1].data.title,
        filePath: sortedPosts[index + 1].filePath
      } : null
    }
  }));
}
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { post, prevPost, nextPost } = Astro2.props;
  const locale = Astro2.currentLocale ?? config.site.lang;
  const {
    title,
    description,
    ogImage: initOgImage,
    canonicalURL,
    pubDatetime,
    modDatetime,
    timezone,
    tags,
    hideEditPost
  } = post.data;
  const { Content } = await renderEntry(post);
  let ogImageUrl;
  if (typeof initOgImage === "string") {
    ogImageUrl = initOgImage;
  } else if (initOgImage?.src) {
    ogImageUrl = initOgImage.src;
  }
  if (!ogImageUrl && config.features.dynamicOgImage) {
    const postUrl = getPostUrl(post.id, post.filePath, locale).replace(
      /\/+$/,
      ""
    );
    ogImageUrl = `${postUrl}/index.png`;
  }
  const ogImage = ogImageUrl ? new URL(ogImageUrl, Astro2.url.origin).href : void 0;
  return renderTemplate(_a || (_a = __template(["", ' <script data-astro-rerun>\n  function createProgressBar() {\n    const progressContainer = document.createElement("div");\n    progressContainer.className =\n      "progress-container fixed top-0 z-10 h-1 w-full bg-background";\n\n    const progressBar = document.createElement("div");\n    progressBar.className = "progress-bar h-1 w-0 bg-accent";\n    progressBar.id = "myBar";\n\n    progressContainer.appendChild(progressBar);\n    document.body.appendChild(progressContainer);\n  }\n  createProgressBar();\n\n  function updateScrollProgress() {\n    document.addEventListener("scroll", () => {\n      const winScroll =\n        document.body.scrollTop || document.documentElement.scrollTop;\n      const height =\n        document.documentElement.scrollHeight -\n        document.documentElement.clientHeight;\n      const scrolled = (winScroll / height) * 100;\n      if (document) {\n        const myBar = document.getElementById("myBar");\n        if (myBar) {\n          myBar.style.width = scrolled + "%";\n        }\n      }\n    });\n  }\n  updateScrollProgress();\n\n  function addHeadingLinks() {\n    const headings = Array.from(\n      document.querySelectorAll("h2, h3, h4, h5, h6")\n    );\n    for (const heading of headings) {\n      heading.classList.add("group");\n      const link = document.createElement("a");\n      link.className =\n        "heading-link ms-2 no-underline opacity-75 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100";\n      link.href = "#" + heading.id;\n\n      const span = document.createElement("span");\n      span.ariaHidden = "true";\n      span.innerText = "#";\n      link.appendChild(span);\n      heading.appendChild(link);\n    }\n  }\n  addHeadingLinks();\n\n  function attachCopyButtons() {\n    const copyButtonLabel = "Copy";\n    const codeBlocks = Array.from(document.querySelectorAll("pre"));\n\n    for (const codeBlock of codeBlocks) {\n      const wrapper = document.createElement("div");\n      wrapper.style.position = "relative";\n\n      const computedStyle = getComputedStyle(codeBlock);\n      const hasFileNameOffset =\n        computedStyle.getPropertyValue("--file-name-offset").trim() !== "";\n\n      const topClass = hasFileNameOffset\n        ? "top-(--file-name-offset)"\n        : "-top-3";\n\n      const copyButton = document.createElement("button");\n      copyButton.className = `copy-code absolute end-3 ${topClass} rounded bg-muted border border-muted px-2 py-1 text-xs leading-4 text-foreground font-medium`;\n      copyButton.innerHTML = copyButtonLabel;\n      codeBlock.setAttribute("tabindex", "0");\n      codeBlock.appendChild(copyButton);\n\n      codeBlock?.parentNode?.insertBefore(wrapper, codeBlock);\n      wrapper.appendChild(codeBlock);\n\n      copyButton.addEventListener("click", async () => {\n        await copyCode(codeBlock, copyButton);\n      });\n    }\n\n    async function copyCode(block, button) {\n      const code = block.querySelector("code");\n      const text = code?.innerText;\n\n      await navigator.clipboard.writeText(text ?? "");\n\n      button.innerText = "Copied";\n\n      setTimeout(() => {\n        button.innerText = copyButtonLabel;\n      }, 700);\n    }\n  }\n  attachCopyButtons();\n\n  document.addEventListener("astro:after-swap", () =>\n    window.scrollTo({ left: 0, top: 0, behavior: "instant" })\n  );\n<\/script>'], ["", ' <script data-astro-rerun>\n  function createProgressBar() {\n    const progressContainer = document.createElement("div");\n    progressContainer.className =\n      "progress-container fixed top-0 z-10 h-1 w-full bg-background";\n\n    const progressBar = document.createElement("div");\n    progressBar.className = "progress-bar h-1 w-0 bg-accent";\n    progressBar.id = "myBar";\n\n    progressContainer.appendChild(progressBar);\n    document.body.appendChild(progressContainer);\n  }\n  createProgressBar();\n\n  function updateScrollProgress() {\n    document.addEventListener("scroll", () => {\n      const winScroll =\n        document.body.scrollTop || document.documentElement.scrollTop;\n      const height =\n        document.documentElement.scrollHeight -\n        document.documentElement.clientHeight;\n      const scrolled = (winScroll / height) * 100;\n      if (document) {\n        const myBar = document.getElementById("myBar");\n        if (myBar) {\n          myBar.style.width = scrolled + "%";\n        }\n      }\n    });\n  }\n  updateScrollProgress();\n\n  function addHeadingLinks() {\n    const headings = Array.from(\n      document.querySelectorAll("h2, h3, h4, h5, h6")\n    );\n    for (const heading of headings) {\n      heading.classList.add("group");\n      const link = document.createElement("a");\n      link.className =\n        "heading-link ms-2 no-underline opacity-75 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100";\n      link.href = "#" + heading.id;\n\n      const span = document.createElement("span");\n      span.ariaHidden = "true";\n      span.innerText = "#";\n      link.appendChild(span);\n      heading.appendChild(link);\n    }\n  }\n  addHeadingLinks();\n\n  function attachCopyButtons() {\n    const copyButtonLabel = "Copy";\n    const codeBlocks = Array.from(document.querySelectorAll("pre"));\n\n    for (const codeBlock of codeBlocks) {\n      const wrapper = document.createElement("div");\n      wrapper.style.position = "relative";\n\n      const computedStyle = getComputedStyle(codeBlock);\n      const hasFileNameOffset =\n        computedStyle.getPropertyValue("--file-name-offset").trim() !== "";\n\n      const topClass = hasFileNameOffset\n        ? "top-(--file-name-offset)"\n        : "-top-3";\n\n      const copyButton = document.createElement("button");\n      copyButton.className = \\`copy-code absolute end-3 \\${topClass} rounded bg-muted border border-muted px-2 py-1 text-xs leading-4 text-foreground font-medium\\`;\n      copyButton.innerHTML = copyButtonLabel;\n      codeBlock.setAttribute("tabindex", "0");\n      codeBlock.appendChild(copyButton);\n\n      codeBlock?.parentNode?.insertBefore(wrapper, codeBlock);\n      wrapper.appendChild(codeBlock);\n\n      copyButton.addEventListener("click", async () => {\n        await copyCode(codeBlock, copyButton);\n      });\n    }\n\n    async function copyCode(block, button) {\n      const code = block.querySelector("code");\n      const text = code?.innerText;\n\n      await navigator.clipboard.writeText(text ?? "");\n\n      button.innerText = "Copied";\n\n      setTimeout(() => {\n        button.innerText = copyButtonLabel;\n      }, 700);\n    }\n  }\n  attachCopyButtons();\n\n  document.addEventListener("astro:after-swap", () =>\n    window.scrollTo({ left: 0, top: 0, behavior: "instant" })\n  );\n<\/script>'])), renderComponent($$result, "PostLayout", $$PostLayout, { "title": `${title} | ${config.site.title}`, "description": description, "ogImage": ogImage, "canonicalURL": canonicalURL, "pubDatetime": pubDatetime, "modDatetime": modDatetime }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "BackButton", $$BackButton, {})} ${maybeRenderHead()}<main id="main-content"${addAttribute(["app-layout", { "mt-8": !config.features.showBackButton }], "class:list")} data-pagefind-body> <h1${addAttribute({ viewTransitionName: slugifyStr(title.replaceAll(".", "-")) }, "style")} class="text-accent inline-block text-2xl font-bold sm:text-3xl"> ${title} </h1> <div class="my-2 flex items-center gap-2"> ${renderComponent($$result2, "Datetime", $$Datetime, { "pubDatetime": pubDatetime, "modDatetime": modDatetime, "timezone": timezone, "size": "lg" })} <span aria-hidden="true"${addAttribute([
    "text-muted-foreground max-sm:hidden",
    { hidden: !config.features.editPost?.enabled || hideEditPost }
  ], "class:list")}>
|
</span> ${renderComponent($$result2, "EditPost", $$EditPost, { "hideEditPost": hideEditPost, "post": post, "class": "max-sm:hidden" })} </div> <article id="article"${addAttribute([
    "mt-8 w-full",
    "app-prose max-w-app",
    "prose-pre:bg-(--shiki-light-bg) dark:prose-pre:bg-(--shiki-dark-bg)"
  ], "class:list")}> ${renderComponent($$result2, "Content", Content, {})} </article> <hr class="my-8 border-dashed"> ${renderComponent($$result2, "EditPost", $$EditPost, { "class": "sm:hidden", "hideEditPost": hideEditPost, "post": post })} ${renderComponent($$result2, "BackToTopButton", $$BackToTopButton, {})} <ul class="mt-4 mb-8 flex flex-wrap gap-4 sm:my-8"> ${tags.map((tag) => renderTemplate`${renderComponent($$result2, "Tag", $$Tag, { "tag": slugifyStr(tag), "tagName": tag, "size": "sm" })}`)} </ul> ${renderComponent($$result2, "ShareLinks", $$ShareLinks, {})} <hr class="my-8 border-dashed"> ${renderComponent($$result2, "AdjacentPostNav", $$AdjacentPostNav, { "prevPost": prevPost, "nextPost": nextPost })} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` }));
}, "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...slug]/index.astro", void 0);

const $$file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/pages/posts/[...slug]/index.astro";
const $$url = "/posts/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
