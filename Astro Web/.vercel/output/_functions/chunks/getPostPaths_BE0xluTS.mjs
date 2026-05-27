import { g as getRelativeLocaleUrl } from './i18n_BdKrHJrq.mjs';
import { C as CONTENT_LAYER_TYPE, L as LIVE_CONTENT_TYPE, d as defineCollection } from './_astro_content_DHf_0YVy.mjs';
import * as z from 'zod/v4';
import 'js-yaml';
import 'smol-toml';
import path, { relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import '@astrojs/markdown-remark';
import { slug } from 'github-slugger';
import colors from 'piccolore';
import 'xxhash-wasm';
import { S as slash } from './entrypoint_DrcobDen.mjs';
import 'common-ancestor-path';
import './deterministic-string_dIHzor22.mjs';
import { existsSync, promises } from 'node:fs';
import pLimit from 'p-limit';
import picomatch from 'picomatch';
import { glob as glob$1 } from 'tinyglobby';
import { c as config } from './config_Bf99gZGu.mjs';
import { a as slugifyStr } from './slugify_DE7qmG4w.mjs';

const isWindows = typeof process !== "undefined" && process.platform === "win32";
function normalizePath(id) {
  return path.posix.normalize(isWindows ? slash(id) : id);
}

function generateIdDefault({ entry, base, data }, isLegacy) {
  if (data.slug) {
    return data.slug;
  }
  const entryURL = new URL(encodeURI(entry), base);
  if (isLegacy) {
    const { id } = getContentEntryIdAndSlug({
      entry: entryURL,
      contentDir: base,
      collection: ""
    });
    return id;
  }
  const { slug } = getContentEntryIdAndSlug({
    entry: entryURL,
    contentDir: base,
    collection: ""
  });
  return slug;
}
function checkPrefix(pattern, prefix) {
  if (Array.isArray(pattern)) {
    return pattern.some((p) => p.startsWith(prefix));
  }
  return pattern.startsWith(prefix);
}
const secretLegacyFlag = /* @__PURE__ */ Symbol("astro.legacy-glob");
function glob(globOptions) {
  if (checkPrefix(globOptions.pattern, "../")) {
    throw new Error(
      "Glob patterns cannot start with `../`. Set the `base` option to a parent directory instead."
    );
  }
  if (checkPrefix(globOptions.pattern, "/")) {
    throw new Error(
      "Glob patterns cannot start with `/`. Set the `base` option to a parent directory or use a relative path instead."
    );
  }
  const isLegacy = !!globOptions[secretLegacyFlag];
  const generateId = globOptions?.generateId ?? ((opts) => generateIdDefault(opts, isLegacy));
  const fileToIdMap = /* @__PURE__ */ new Map();
  return {
    name: "glob-loader",
    load: async ({
      config,
      collection,
      logger,
      watcher,
      parseData,
      store,
      generateDigest,
      entryTypes
    }) => {
      const renderFunctionByContentType = /* @__PURE__ */ new WeakMap();
      const untouchedEntries = new Set(store.keys());
      async function syncData(entry, base, entryType, oldId) {
        if (!entryType) {
          logger.warn(`No entry type found for ${entry}`);
          return;
        }
        const fileUrl = new URL(encodeURI(entry), base);
        const contents = await promises.readFile(fileUrl, "utf-8").catch((err) => {
          logger.error(`Error reading ${entry}: ${err.message}`);
          return;
        });
        if (!contents && contents !== "") {
          logger.warn(`No contents found for ${entry}`);
          return;
        }
        const { body, data } = await entryType.getEntryInfo({
          contents,
          fileUrl
        });
        const id = generateId({ entry, base, data });
        if (oldId && oldId !== id) {
          store.delete(oldId);
        }
        untouchedEntries.delete(id);
        const existingEntry = store.get(id);
        const digest = generateDigest(contents);
        const filePath2 = fileURLToPath(fileUrl);
        if (existingEntry && existingEntry.digest === digest && existingEntry.filePath) {
          if (existingEntry.deferredRender) {
            store.addModuleImport(existingEntry.filePath);
          }
          if (existingEntry.assetImports?.length) {
            store.addAssetImports(existingEntry.assetImports, existingEntry.filePath);
          }
          fileToIdMap.set(filePath2, id);
          return;
        }
        const relativePath2 = posixRelative(fileURLToPath(config.root), filePath2);
        const parsedData = await parseData({
          id,
          data,
          filePath: filePath2
        });
        if (existingEntry && existingEntry.filePath && existingEntry.filePath !== relativePath2) {
          const oldFilePath = new URL(existingEntry.filePath, config.root);
          if (existsSync(oldFilePath)) {
            logger.warn(
              `Duplicate id "${id}" found in ${filePath2}. Later items with the same id will overwrite earlier ones.`
            );
          }
        }
        if (entryType.getRenderFunction) {
          let render = renderFunctionByContentType.get(entryType);
          if (!render) {
            render = await entryType.getRenderFunction(config);
            renderFunctionByContentType.set(entryType, render);
          }
          let rendered = void 0;
          try {
            rendered = await render?.({
              id,
              data,
              body,
              filePath: filePath2,
              digest
            });
          } catch (error) {
            logger.error(`Error rendering ${entry}: ${error.message}`);
          }
          store.set({
            id,
            data: parsedData,
            body: globOptions.retainBody === false ? void 0 : body,
            filePath: relativePath2,
            digest,
            rendered,
            assetImports: rendered?.metadata?.imagePaths
          });
        } else if ("contentModuleTypes" in entryType) {
          store.set({
            id,
            data: parsedData,
            body: globOptions.retainBody === false ? void 0 : body,
            filePath: relativePath2,
            digest,
            deferredRender: true
          });
        } else {
          store.set({
            id,
            data: parsedData,
            body: globOptions.retainBody === false ? void 0 : body,
            filePath: relativePath2,
            digest
          });
        }
        fileToIdMap.set(filePath2, id);
      }
      let baseDir;
      if (isLegacy && !globOptions.base) {
        baseDir = new URL(`./src/content/${collection}`, config.root);
      } else {
        baseDir = globOptions.base ? new URL(globOptions.base, config.root) : config.root;
      }
      if (!baseDir.pathname.endsWith("/")) {
        baseDir.pathname = `${baseDir.pathname}/`;
      }
      const filePath = fileURLToPath(baseDir);
      const relativePath = relative(fileURLToPath(config.root), filePath);
      const exists = existsSync(baseDir);
      if (!exists) {
        logger.warn(`The base directory "${fileURLToPath(baseDir)}" does not exist.`);
      }
      const files = await glob$1(globOptions.pattern, {
        cwd: fileURLToPath(baseDir),
        expandDirectories: false
      });
      if (exists && files.length === 0) {
        logger.warn(
          `No files found matching "${globOptions.pattern}" in directory "${relativePath}"`
        );
        return;
      }
      function configForFile(file) {
        const ext = file.split(".").at(-1);
        if (!ext) {
          logger.warn(`No extension found for ${file}`);
          return;
        }
        return entryTypes.get(`.${ext}`);
      }
      const limit = pLimit(10);
      const skippedFiles = [];
      const contentDir = new URL("content/", config.srcDir);
      const configFiles = new Set(
        ["config.js", "config.ts", "config.mjs"].map((file) => new URL(file, contentDir).href)
      );
      function isConfigFile(file) {
        const fileUrl = new URL(file, baseDir);
        return configFiles.has(fileUrl.href);
      }
      await Promise.all(
        files.map((entry) => {
          if (isConfigFile(entry)) {
            return;
          }
          return limit(async () => {
            const entryType = configForFile(entry);
            await syncData(entry, baseDir, entryType);
          });
        })
      );
      const skipCount = skippedFiles.length;
      if (skipCount > 0) {
        const patternList = Array.isArray(globOptions.pattern) ? globOptions.pattern.join(", ") : globOptions.pattern;
        logger.warn(
          `The glob() loader cannot be used for files in ${colors.bold("src/content")} when legacy mode is enabled.`
        );
        if (skipCount > 10) {
          logger.warn(
            `Skipped ${colors.green(skippedFiles.length)} files that matched ${colors.green(patternList)}.`
          );
        } else {
          logger.warn(`Skipped the following files that matched ${colors.green(patternList)}:`);
          skippedFiles.forEach((file) => logger.warn(`\u2022 ${colors.green(file)}`));
        }
      }
      untouchedEntries.forEach((id) => store.delete(id));
      if (!watcher) {
        return;
      }
      watcher.add(filePath);
      const matchesGlob = (entry) => !entry.startsWith("../") && picomatch.isMatch(entry, globOptions.pattern);
      const basePath = fileURLToPath(baseDir);
      async function onChange(changedPath) {
        const entry = posixRelative(basePath, changedPath);
        if (!matchesGlob(entry)) {
          return;
        }
        const entryType = configForFile(changedPath);
        const baseUrl = pathToFileURL(basePath);
        const oldId = fileToIdMap.get(changedPath);
        try {
          await syncData(entry, baseUrl, entryType, oldId);
          logger.info(`Reloaded data from ${colors.green(entry)}`);
        } catch (e) {
          logger.error(`Failed to reload ${entry}: ${e.message}`);
        }
      }
      watcher.on("change", onChange);
      watcher.on("add", onChange);
      watcher.on("unlink", async (deletedPath) => {
        const entry = posixRelative(basePath, deletedPath);
        if (!matchesGlob(entry)) {
          return;
        }
        const id = fileToIdMap.get(deletedPath);
        if (id) {
          store.delete(id);
          fileToIdMap.delete(deletedPath);
        }
      });
    }
  };
}

const entryTypeSchema = z.object({
  id: z.string({
    error: "Content entry `id` must be a string"
    // Default to empty string so we can validate properly in the loader
  })
}).passthrough();
z.union([
  z.array(entryTypeSchema),
  z.record(
    z.string(),
    z.object({
      id: z.string({
        error: "Content entry `id` must be a string"
      }).optional()
    }).passthrough()
  )
]);
const collectionConfigParser = z.union([
  z.object({
    type: z.literal("content").optional(),
    schema: z.any().optional(),
    loader: z.never().optional()
  }),
  z.object({
    type: z.literal("data").optional(),
    schema: z.any().optional(),
    loader: z.never().optional()
  }),
  z.object({
    type: z.literal(CONTENT_LAYER_TYPE),
    schema: z.any().optional(),
    loader: z.union([
      z.function(),
      z.object({
        name: z.string(),
        load: z.function({
          input: [z.custom()],
          output: z.custom()
        }),
        schema: z.any().transform((v) => {
          if (typeof v === "function") {
            console.warn(
              `Your loader's schema is defined using a function. This is no longer supported and the schema will be ignored. Please update your loader to use the \`createSchema()\` utility instead, or report this to the loader author. In a future major version, this will cause the loader to break entirely.`
            );
            return void 0;
          }
          return v;
        }).superRefine((v, ctx) => {
          if (v !== void 0 && !("_zod" in v)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid Zod schema"
            });
            return z.NEVER;
          }
        }).optional(),
        createSchema: z.function({
          input: [],
          output: z.promise(
            z.object({
              schema: z.custom((v) => "_zod" in v),
              types: z.string()
            })
          )
        }).optional()
      })
    ])
  }),
  z.object({
    type: z.literal(LIVE_CONTENT_TYPE).optional().default(LIVE_CONTENT_TYPE),
    schema: z.any().optional(),
    loader: z.function()
  })
]);
z.object({
  collections: z.record(z.string(), collectionConfigParser)
});
function getContentEntryIdAndSlug({
  entry,
  contentDir,
  collection
}) {
  const relativePath = getRelativeEntryPath(entry, collection, contentDir);
  const withoutFileExt = relativePath.replace(new RegExp(path.extname(relativePath) + "$"), "");
  const rawSlugSegments = withoutFileExt.split(path.sep);
  const slug$1 = rawSlugSegments.map((segment) => slug(segment)).join("/").replace(/\/index$/, "");
  const res = {
    id: normalizePath(relativePath),
    slug: slug$1
  };
  return res;
}
function getRelativeEntryPath(entry, collection, contentDir) {
  const relativeToContent = path.relative(fileURLToPath(contentDir), fileURLToPath(entry));
  const relativeToCollection = path.relative(collection, relativeToContent);
  return relativeToCollection;
}
function posixifyPath(filePath) {
  return filePath.split(path.sep).join("/");
}
function posixRelative(from, to) {
  return posixifyPath(path.relative(from, to));
}

const BLOG_PATH = "src/content/posts";
defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) => z.object({
    author: z.string().default(config.site.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image().or(z.string()).optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
    hideEditPost: z.boolean().optional(),
    timezone: z.string().optional()
  })
});
defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional()
  })
});

function getPostPathSegments(filePath) {
  return filePath?.replace(BLOG_PATH, "").split("/").filter((path) => path !== "").filter((path) => !path.startsWith("_")).slice(0, -1).map((segment) => slugifyStr(segment)) ?? [];
}
function getIdSlug(id) {
  const postId = id.split("/");
  return postId.length > 0 ? String(postId[postId.length - 1]) : id;
}
function getPostSlugPath(id, filePath) {
  const pathSegments = getPostPathSegments(filePath);
  const slug = getIdSlug(id);
  return pathSegments.length > 0 ? [...pathSegments, slug].join("/") : String(slug);
}
function getPostSlug(id, filePath) {
  return `/${getPostSlugPath(id, filePath)}`;
}
function getPostUrl(id, filePath, locale = config.site.lang) {
  return getRelativeLocaleUrl(locale, `posts/${getPostSlugPath(id, filePath)}`);
}

export { getPostUrl as a, getPostSlug as g };
