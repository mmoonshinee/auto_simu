import { g as getCollection } from './_astro_content_DHf_0YVy.mjs';
import './_astro_assets_BsN4-1ez.mjs';
import satori from 'satori';
import sharp from 'sharp';
import { g as getFontPathByWeight, e as experimental_getFontFileURL, f as fontData } from './getFontPathByWeight_B4EGonNO.mjs';
import { g as getPostSlug } from './getPostPaths_BE0xluTS.mjs';
import { c as config } from './config_Bf99gZGu.mjs';

async function getStaticPaths() {
  if (!config.features.dynamicOgImage) {
    return [];
  }
  const posts = await getCollection("posts").then(
    (p) => p.filter(({ data }) => !data.draft && !data.ogImage)
  );
  return posts.map((post) => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: post
  }));
}
const GET = async ({ props, url }) => {
  if (!config.features.dynamicOgImage) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }
  const fonts = fontData["--font-google-sans-code"];
  const regularFontPath = getFontPathByWeight(fonts, 400);
  const boldFontPath = getFontPathByWeight(fonts, 700);
  if (regularFontPath === void 0 || boldFontPath === void 0) {
    throw new Error("Cannot find the font path.");
  }
  const [regularData, boldData] = await Promise.all([
    fetch(experimental_getFontFileURL(regularFontPath, url)).then(
      (res) => res.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(boldFontPath, url)).then(
      (res) => res.arrayBuffer()
    )
  ]);
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          background: "#fefbfb",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-1px",
                right: "-1px",
                border: "4px solid #000",
                background: "#ecebeb",
                opacity: "0.9",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
                width: "88%",
                height: "80%"
              }
            }
          },
          {
            type: "div",
            props: {
              style: {
                border: "4px solid #000",
                background: "#fefbfb",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%"
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "20px",
                    width: "90%",
                    height: "90%"
                  },
                  children: [
                    {
                      type: "p",
                      props: {
                        style: {
                          fontSize: 72,
                          fontWeight: "bold",
                          maxHeight: "84%",
                          overflow: "hidden"
                        },
                        children: props.data.title
                      }
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginBottom: "8px",
                          fontSize: 28
                        },
                        children: [
                          {
                            type: "span",
                            props: {
                              children: [
                                "by ",
                                {
                                  type: "span",
                                  props: {
                                    style: { color: "transparent" },
                                    children: '"'
                                  }
                                },
                                {
                                  type: "span",
                                  props: {
                                    style: {
                                      overflow: "hidden",
                                      fontWeight: "bold"
                                    },
                                    children: props.data.author
                                  }
                                }
                              ]
                            }
                          },
                          {
                            type: "span",
                            props: {
                              style: { overflow: "hidden", fontWeight: "bold" },
                              children: config.site.title
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [
        {
          name: "Google Sans Code",
          data: regularData,
          weight: 400,
          style: "normal"
        },
        {
          name: "Google Sans Code",
          data: boldData,
          weight: 700,
          style: "normal"
        }
      ]
    }
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
