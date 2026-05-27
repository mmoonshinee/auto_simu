import rss from '@astrojs/rss';
import { g as getCollection } from './_astro_content_DHf_0YVy.mjs';
import { g as getSortedPosts } from './getSortedPosts_DXEbXnHZ.mjs';
import { a as getPostUrl } from './getPostPaths_BE0xluTS.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

async function GET() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPostUrl(id, filePath, config.site.lang),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime)
    }))
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
