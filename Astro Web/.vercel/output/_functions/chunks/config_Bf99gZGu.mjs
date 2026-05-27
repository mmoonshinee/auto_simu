function defineAstroPaperConfig(config) {
  return config;
}

const userConfig = defineAstroPaperConfig({
  site: {
    url: "https://auto-simu.vercel.app/",
    title: "FEA Auto Analysis",
    description: "Automated structural FEA analysis — upload CAD, get results powered by ANSYS + Claude AI.",
    author: "mmoonshinee",
    profile: "https://github.com/mmoonshinee",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Shanghai",
    dir: "ltr"
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1e3
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/satnaing/astro-paper/edit/main/"
    },
    search: "pagefind"
  },
  socials: [
    { name: "github", url: "https://github.com/satnaing/astro-paper" },
    { name: "x", url: "https://x.com/username" },
    { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    { name: "mail", url: "mailto:yourmail@gmail.com" }
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" }
  ]
});

const PUBLIC_GOOGLE_SITE_VERIFICATION = undefined;

const DEFAULT_OG_IMAGE = "default-og.jpg";
const config = {
  site: {
    ...userConfig.site,
    ogImage: userConfig.site.ogImage ?? DEFAULT_OG_IMAGE,
    lang: userConfig.site.lang ?? "en",
    timezone: userConfig.site.timezone ?? "UTC",
    dir: userConfig.site.dir ?? "ltr",
    googleVerification: userConfig.site.googleVerification || PUBLIC_GOOGLE_SITE_VERIFICATION
  },
  posts: {
    perPage: userConfig.posts?.perPage ?? 4,
    perIndex: userConfig.posts?.perIndex ?? 4,
    scheduledPostMargin: userConfig.posts?.scheduledPostMargin ?? 15 * 60 * 1e3
  },
  features: {
    lightAndDarkMode: userConfig.features?.lightAndDarkMode ?? true,
    dynamicOgImage: userConfig.features?.dynamicOgImage ?? true,
    showArchives: userConfig.features?.showArchives ?? true,
    showBackButton: userConfig.features?.showBackButton ?? true,
    editPost: userConfig.features?.editPost ?? { enabled: false },
    search: userConfig.features?.search ?? "pagefind"
  },
  socials: userConfig.socials ?? [],
  shareLinks: userConfig.shareLinks ?? []
};

export { config as c };
