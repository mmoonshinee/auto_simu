import { t as createVNode, f as Fragment, _ as __astro_tag_component__ } from './entrypoint_DrcobDen.mjs';
import { $ as $$ResponsiveTable } from './ResponsiveTable_Cak2_-az.mjs';
import 'clsx';

const frontmatter = {
  "author": "Sat Naing",
  "pubDatetime": "2022-09-23T15:22:00.000Z",
  "modDatetime": "2026-05-17T04:47:08.212Z",
  "title": "Adding new posts in AstroPaper theme",
  "slug": "adding-new-posts-in-astropaper-theme",
  "featured": true,
  "draft": false,
  "tags": ["docs"],
  "description": "Some rules & recommendations for creating or adding new posts using AstroPaper theme."
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "table-of-contents",
    "text": "Table of contents"
  }, {
    "depth": 2,
    "slug": "creating-a-blog-post",
    "text": "Creating a Blog Post"
  }, {
    "depth": 2,
    "slug": "frontmatter",
    "text": "Frontmatter"
  }, {
    "depth": 3,
    "slug": "sample-frontmatter",
    "text": "Sample Frontmatter"
  }, {
    "depth": 3,
    "slug": "vs-code-snippets-optional",
    "text": "VS Code snippets (optional)"
  }, {
    "depth": 2,
    "slug": "adding-table-of-contents",
    "text": "Adding table of contents"
  }, {
    "depth": 2,
    "slug": "headings",
    "text": "Headings"
  }, {
    "depth": 2,
    "slug": "syntax-highlighting",
    "text": "Syntax Highlighting"
  }, {
    "depth": 2,
    "slug": "storing-images-for-blog-content",
    "text": "Storing Images for Blog Content"
  }, {
    "depth": 3,
    "slug": "inside-srcassets-directory-recommended",
    "text": "Inside src/assets/ directory (recommended)"
  }, {
    "depth": 3,
    "slug": "inside-public-directory",
    "text": "Inside public/ directory"
  }, {
    "depth": 2,
    "slug": "bonus",
    "text": "Bonus"
  }, {
    "depth": 3,
    "slug": "image-compression",
    "text": "Image compression"
  }, {
    "depth": 3,
    "slug": "og-image",
    "text": "OG Image"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    blockquote: "blockquote",
    code: "code",
    details: "details",
    em: "em",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    pre: "pre",
    span: "span",
    strong: "strong",
    summary: "summary",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "This guide covers the rules and conventions for creating new posts in AstroPaper — file placement, frontmatter fields, images, and syntax highlighting."
    }), "\n", createVNode("figure", {
      children: [createVNode("img", {
        src: "https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "Free Classic wooden desk with writing materials, vintage clock, and a leather bag. Stock Photo"
      }), createVNode("figcaption", {
        class: "text-center",
        children: createVNode(_components.p, {
          children: ["Photo by", " ", "\n", createVNode("a", {
            href: "https://www.pexels.com/photo/brown-wooden-desk-159618/",
            children: "Pixabay"
          })]
        })
      })]
    }), "\n", createVNode(_components.h2, {
      id: "table-of-contents",
      children: "Table of contents"
    }), "\n", createVNode(_components.p, {}), createVNode(_components.details, {
      children: [createVNode(_components.summary, {
        children: "Open Table of contents"
      }), createVNode(_components.p, {}), "\n", createVNode(_components.ul, {
        children: ["\n", createVNode(_components.li, {
          children: createVNode(_components.a, {
            href: "#creating-a-blog-post",
            children: "Creating a Blog Post"
          })
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.a, {
            href: "#frontmatter",
            children: "Frontmatter"
          }), "\n", createVNode(_components.ul, {
            children: ["\n", createVNode(_components.li, {
              children: createVNode(_components.a, {
                href: "#sample-frontmatter",
                children: "Sample Frontmatter"
              })
            }), "\n", createVNode(_components.li, {
              children: createVNode(_components.a, {
                href: "#vs-code-snippets-optional",
                children: "VS Code snippets (optional)"
              })
            }), "\n"]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          children: createVNode(_components.a, {
            href: "#adding-table-of-contents",
            children: "Adding table of contents"
          })
        }), "\n", createVNode(_components.li, {
          children: createVNode(_components.a, {
            href: "#headings",
            children: "Headings"
          })
        }), "\n", createVNode(_components.li, {
          children: createVNode(_components.a, {
            href: "#syntax-highlighting",
            children: "Syntax Highlighting"
          })
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.a, {
            href: "#storing-images-for-blog-content",
            children: "Storing Images for Blog Content"
          }), "\n", createVNode(_components.ul, {
            children: ["\n", createVNode(_components.li, {
              children: createVNode(_components.a, {
                href: "#inside-srcassets-directory-recommended",
                children: ["Inside ", createVNode(_components.code, {
                  children: "src/assets/"
                }), " directory (recommended)"]
              })
            }), "\n", createVNode(_components.li, {
              children: createVNode(_components.a, {
                href: "#inside-public-directory",
                children: ["Inside ", createVNode(_components.code, {
                  children: "public/"
                }), " directory"]
              })
            }), "\n"]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          children: [createVNode(_components.a, {
            href: "#bonus",
            children: "Bonus"
          }), "\n", createVNode(_components.ul, {
            children: ["\n", createVNode(_components.li, {
              children: createVNode(_components.a, {
                href: "#image-compression",
                children: "Image compression"
              })
            }), "\n", createVNode(_components.li, {
              children: createVNode(_components.a, {
                href: "#og-image",
                children: "OG Image"
              })
            }), "\n"]
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.p, {})]
    }), createVNode(_components.p, {}), "\n", createVNode(_components.h2, {
      id: "creating-a-blog-post",
      children: "Creating a Blog Post"
    }), "\n", createVNode(_components.p, {
      children: ["To write a new blog post, create a markdown (or MDX) file inside the ", createVNode(_components.code, {
        children: "src/content/posts/"
      }), " directory."]
    }), "\n", createVNode(_components.p, {
      children: ["You can organize posts into subdirectories to make content easier to manage. The subdirectory name becomes part of the post URL. For example, ", createVNode(_components.code, {
        children: "src/content/posts/2025/example-post.md"
      }), " will be available at ", createVNode(_components.code, {
        children: "/posts/2025/example-post"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["If you want a subdirectory for organization only, without it affecting the URL, prefix the folder name with an underscore (", createVNode(_components.code, {
        children: "_"
      }), ")."]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code astro-code-themes min-light night-owl",
      style: {
        "--shiki-light": "#24292eff",
        "--shiki-dark": "#d6deeb",
        "--shiki-light-bg": "#ffffff",
        "--shiki-dark-bg": "#011627",
        overflowX: "auto",
        "--file-name-offset": "-0.75rem"
      },
      tabindex: "0",
      "data-language": "bash",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "# Example: post file paths and their URLs"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "src/content/posts/very-first-post.md"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "          -"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: ">"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " mysite.com/posts/very-first-post"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "src/content/posts/2025/example-post.md"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "        -"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: ">"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " mysite.com/posts/2025/example-post"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "src/content/posts/_2026/another-post.md"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "       -"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: ">"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " mysite.com/posts/another-post"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "src/content/posts/docs/_legacy/how-to.md"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "      -"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: ">"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " mysite.com/posts/docs/how-to"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "src/content/posts/Example"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " Dir/Dummy"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " Post.md"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "   -"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: ">"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " mysite.com/posts/example-dir/dummy-post"
          })]
        })]
      })
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: ["Files and directories prefixed with ", createVNode(_components.code, {
          children: "_"
        }), " are excluded from routing. Use them for drafts, shared assets, or internal-only content."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "frontmatter",
      children: "Frontmatter"
    }), "\n", createVNode(_components.p, {
      children: ["Frontmatter is the main place to store metadata about a blog post. It lives at the top of the file in YAML format. Read more about frontmatter and its usage in ", createVNode(_components.a, {
        href: "https://docs.astro.build/en/guides/markdown-content/",
        children: "Astro documentation"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Here is the list of frontmatter properties for each post:"
    }), "\n", createVNode($$ResponsiveTable, {
      variant: "striped-minimal",
      children: ["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
        children: [createVNode(_components.thead, {
          children: createVNode(_components.tr, {
            children: [createVNode(_components.th, {
              children: "Property"
            }), createVNode(_components.th, {
              children: "Description"
            }), createVNode(_components.th, {
              children: "Remark"
            })]
          })
        }), createVNode(_components.tbody, {
          children: [createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "title"
                })
              })
            }), createVNode(_components.td, {
              children: "Title of the post. (h1)"
            }), createVNode(_components.td, {
              children: ["required", createVNode("sup", {
                children: "*"
              })]
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "description"
                })
              })
            }), createVNode(_components.td, {
              children: "Description of the post. Used in post excerpt and site description of the post."
            }), createVNode(_components.td, {
              children: ["required", createVNode("sup", {
                children: "*"
              })]
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "pubDatetime"
                })
              })
            }), createVNode(_components.td, {
              children: "Published datetime in ISO 8601 format."
            }), createVNode(_components.td, {
              children: ["required", createVNode("sup", {
                children: "*"
              })]
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "modDatetime"
                })
              })
            }), createVNode(_components.td, {
              children: "Modified datetime in ISO 8601 format. (only add this property when a blog post is modified)"
            }), createVNode(_components.td, {
              children: "optional"
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "author"
                })
              })
            }), createVNode(_components.td, {
              children: "Author of the post."
            }), createVNode(_components.td, {
              children: ["default = ", createVNode(_components.code, {
                children: "site.author"
              })]
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "featured"
                })
              })
            }), createVNode(_components.td, {
              children: "Whether or not to display this post in the featured section of the home page."
            }), createVNode(_components.td, {
              children: "default = false"
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "draft"
                })
              })
            }), createVNode(_components.td, {
              children: "Mark this post as ‘unpublished’."
            }), createVNode(_components.td, {
              children: "default = false"
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "tags"
                })
              })
            }), createVNode(_components.td, {
              children: "Related keywords for this post. Written in array YAML format."
            }), createVNode(_components.td, {
              children: "default = others"
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "ogImage"
                })
              })
            }), createVNode(_components.td, {
              children: "OG image of the post. Useful for social media sharing and SEO. Can be a remote URL or an image path relative to the current folder."
            }), createVNode(_components.td, {
              children: ["default = ", createVNode(_components.code, {
                children: "site.ogImage"
              }), " or generated OG image"]
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "canonicalURL"
                })
              })
            }), createVNode(_components.td, {
              children: "Canonical URL (absolute), in case the article already exists on another source."
            }), createVNode(_components.td, {
              children: ["default = ", createVNode(_components.code, {
                children: "Astro.site"
              }), " + ", createVNode(_components.code, {
                children: "Astro.url.pathname"
              })]
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "hideEditPost"
                })
              })
            }), createVNode(_components.td, {
              children: "Hide the edit-post button under the post title. Applies only to the current post."
            }), createVNode(_components.td, {
              children: "default = false"
            })]
          }), createVNode(_components.tr, {
            children: [createVNode(_components.td, {
              children: createVNode(_components.strong, {
                children: createVNode(_components.em, {
                  children: "timezone"
                })
              })
            }), createVNode(_components.td, {
              children: ["Specify a timezone in IANA format for the current post. Overrides the global ", createVNode(_components.code, {
                children: "site.timezone"
              }), " config for this post only."]
            }), createVNode(_components.td, {
              children: ["default = ", createVNode(_components.code, {
                children: "site.timezone"
              })]
            })]
          })]
        })]
      })]
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: ["Tip! You can get an ISO 8601 datetime by running ", createVNode(_components.code, {
          children: "new Date().toISOString()"
        }), " in the console."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Only ", createVNode(_components.code, {
        children: "title"
      }), ", ", createVNode(_components.code, {
        children: "description"
      }), ", and ", createVNode(_components.code, {
        children: "pubDatetime"
      }), " fields in frontmatter must be specified."]
    }), "\n", createVNode(_components.p, {
      children: "Title and description (excerpt) are important for search engine optimization (SEO) and thus AstroPaper encourages you to include these in all blog posts."
    }), "\n", createVNode(_components.p, {
      children: ["If you omit ", createVNode(_components.code, {
        children: "tags"
      }), " in a blog post (in other words, if no tag is specified), the default tag ", createVNode(_components.code, {
        children: "others"
      }), " will be used as a tag for that post. You can set the default tag in ", createVNode(_components.code, {
        children: "src/content.config.ts"
      }), ":"]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code astro-code-themes min-light night-owl mt-8",
      style: {
        "--shiki-light": "#24292eff",
        "--shiki-dark": "#d6deeb",
        "--shiki-light-bg": "#ffffff",
        "--shiki-dark-bg": "#011627",
        overflowX: "auto",
        "--file-name-offset": "-0.75rem"
      },
      tabindex: "0",
      "data-language": "ts",
      children: [createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "// ..."
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "tags"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#1976D2",
              "--shiki-dark": "#D6DEEB"
            },
            children: " z"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#C792EA",
              "--shiki-dark-font-style": "italic"
            },
            children: "."
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "array"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#1976D2",
              "--shiki-dark": "#D6DEEB"
            },
            children: "z"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#C792EA",
              "--shiki-dark-font-style": "italic"
            },
            children: "."
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "string"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "())"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#C792EA",
              "--shiki-dark-font-style": "italic"
            },
            children: "."
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "default"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "(["
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "others"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "])"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: " // replace \"others\" with whatever you want"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "// ..."
          })
        })]
      }), createVNode(_components.span, {
        class: "absolute py-1 text-foreground text-xs font-medium leading-4 pl-4 pr-2 before:inline-block before:size-1 before:bg-green-500 before:rounded-full before:absolute before:top-[45%] before:left-2 left-2 top-(--file-name-offset) border rounded-md bg-background",
        children: "src/content.config.ts"
      })]
    }), "\n", createVNode(_components.h3, {
      id: "sample-frontmatter",
      children: "Sample Frontmatter"
    }), "\n", createVNode(_components.p, {
      children: "Here is sample frontmatter for a post."
    }), "\n", createVNode(_components.pre, {
      class: "astro-code astro-code-themes min-light night-owl mt-8",
      style: {
        "--shiki-light": "#24292eff",
        "--shiki-dark": "#d6deeb",
        "--shiki-light-bg": "#ffffff",
        "--shiki-dark-bg": "#011627",
        overflowX: "auto",
        "--file-name-offset": "-0.75rem"
      },
      tabindex: "0",
      "data-language": "yaml",
      children: [createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "---"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "title"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: " The title of the post"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "author"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: " your name"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "pubDatetime"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#82AAFF"
            },
            children: " 2022-09-21T05:17:19Z"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "featured"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#1976D2",
              "--shiki-dark": "#FF5874"
            },
            children: " true"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "draft"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#1976D2",
              "--shiki-dark": "#FF5874"
            },
            children: " false"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "tags"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "  - "
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "some"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "  - "
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "example"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "  - "
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "tags"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "ogImage"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: " ../../assets/images/example.png"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: " # src/assets/images/example.png"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "# ogImage: \"https://example.org/remote-image.png\" # remote URL"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "description"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: " This is the example description of the example post."
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#7FDBCA"
            },
            children: "canonicalURL"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: " https://example.org/my-article-was-already-posted-here"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "---"
          })
        })]
      }), createVNode(_components.span, {
        class: "absolute py-1 text-foreground text-xs font-medium leading-4 pl-4 pr-2 before:inline-block before:size-1 before:bg-green-500 before:rounded-full before:absolute before:top-[45%] before:left-2 left-2 top-(--file-name-offset) border rounded-md bg-background",
        children: "src/content/posts/sample-post.md"
      })]
    }), "\n", createVNode(_components.h3, {
      id: "vs-code-snippets-optional",
      children: "VS Code snippets (optional)"
    }), "\n", createVNode(_components.p, {
      children: "AstroPaper includes workspace snippets to speed up creating new posts:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "frontmatter"
        }), ": inserts the recommended frontmatter block"]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "template"
        }), ": inserts a basic post template (including ", createVNode(_components.code, {
          children: "## Table of contents"
        }), ")"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["These snippets live in ", createVNode(_components.code, {
        children: ".vscode/astro-paper.code-snippets"
      }), ". If you use VS Code (or Cursor), they should be available automatically when you open the workspace."]
    }), "\n", createVNode(_components.h2, {
      id: "adding-table-of-contents",
      children: "Adding table of contents"
    }), "\n", createVNode(_components.p, {
      children: ["By default, a post does not include any table of contents (TOC). To include one, write ", createVNode(_components.code, {
        children: "Table of contents"
      }), " as an h2 heading (", createVNode(_components.code, {
        children: "##"
      }), " in Markdown) and place it where you want it to appear:"]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code astro-code-themes min-light night-owl has-diff",
      style: {
        "--shiki-light": "#24292eff",
        "--shiki-dark": "#d6deeb",
        "--shiki-light-bg": "#ffffff",
        "--shiki-dark-bg": "#011627",
        overflowX: "auto",
        "--file-name-offset": "-0.75rem"
      },
      tabindex: "0",
      "data-language": "md",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "---"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "# frontmatter"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "---"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "Here are some recommendations, tips & tricks for creating new posts in AstroPaper blog theme."
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line diff add",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-weight": "bold",
              "--shiki-dark": "#82B1FF",
              "--shiki-dark-font-weight": "inherit"
            },
            children: "## Table of contents"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "<!-- the rest of the post -->"
          })
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "headings",
      children: "Headings"
    }), "\n", createVNode(_components.p, {
      children: ["There’s one thing to note about headings. AstroPaper blog posts use ", createVNode(_components.code, {
        children: "title"
      }), " (from frontmatter) as the main heading of the post. Therefore, the rest of the headings in the post should use ", createVNode(_components.code, {
        children: "h2"
      }), " ~ ", createVNode(_components.code, {
        children: "h6"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "This rule is not mandatory, but highly recommended for visual, accessibility, and SEO purposes."
    }), "\n", createVNode(_components.h2, {
      id: "syntax-highlighting",
      children: "Syntax Highlighting"
    }), "\n", createVNode(_components.p, {
      children: ["AstroPaper uses ", createVNode(_components.a, {
        href: "https://shiki.style/",
        children: "Shiki"
      }), " as the default syntax highlighter, with ", createVNode(_components.a, {
        href: "https://shiki.style/packages/transformers",
        children: "@shikijs/transformers"
      }), " for enhanced fenced code blocks. If you don’t want to use the transformers, you can remove them:"]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code astro-code-themes min-light night-owl",
      style: {
        "--shiki-light": "#24292eff",
        "--shiki-dark": "#d6deeb",
        "--shiki-light-bg": "#ffffff",
        "--shiki-dark-bg": "#011627",
        overflowX: "auto",
        "--file-name-offset": "-0.75rem"
      },
      tabindex: "0",
      "data-language": "bash",
      children: createVNode(_components.code, {
        children: createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "pnpm"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " remove"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#2B5581",
              "--shiki-dark": "#ECC48D"
            },
            children: " @shikijs/transformers"
          })]
        })
      })
    }), "\n", createVNode(_components.pre, {
      class: "astro-code astro-code-themes min-light night-owl has-diff mt-8",
      style: {
        "--shiki-light": "#24292eff",
        "--shiki-dark": "#d6deeb",
        "--shiki-light-bg": "#ffffff",
        "--shiki-dark-bg": "#011627",
        overflowX: "auto",
        "--file-name-offset": "-0.75rem"
      },
      tabindex: "0",
      "data-language": "ts",
      children: [createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "// ..."
          })
        }), "\n", createVNode(_components.span, {
          class: "line diff remove",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#C792EA",
              "--shiki-dark-font-style": "italic"
            },
            children: "import"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line diff remove",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "  transformerNotationDiff"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line diff remove",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "  transformerNotationHighlight"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line diff remove",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "  transformerNotationWordHighlight"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line diff remove",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "} "
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#C792EA",
              "--shiki-dark-font-style": "italic"
            },
            children: "from"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: " \""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "@shikijs/transformers"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: ";"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#C792EA",
              "--shiki-dark-font-style": "italic"
            },
            children: "export"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#C792EA",
              "--shiki-dark-font-style": "italic"
            },
            children: " default"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: " defineConfig"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "({"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "  // ..."
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "  markdown"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "    remarkPlugins"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " [remarkToc"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " [remarkCollapse"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " { test"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: " \""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "Table of contents"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " }]]"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "    shikiConfig"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " {"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "      themes"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " { light"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: " \""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "min-light"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " dark"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: " \""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "night-owl"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " }"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "      defaultColor"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#1976D2",
              "--shiki-dark": "#FF5874"
            },
            children: " false"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "      wrap"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#1976D2",
              "--shiki-dark": "#FF5874"
            },
            children: " false"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "      transformers"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " ["
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "        transformerFileName"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "()"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line diff remove",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "        transformerNotationHighlight"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "()"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line diff remove",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "        transformerNotationWordHighlight"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "()"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line diff remove",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#6F42C1",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#82AAFF",
              "--shiki-dark-font-style": "italic"
            },
            children: "        transformerNotationDiff"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "({ matchAlgorithm"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: ":"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: " \""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#ECC48D"
            },
            children: "v3"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#D9F5DD"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: " })"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "      ]"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "    }"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "  }"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#212121",
              "--shiki-dark": "#D6DEEB"
            },
            children: ","
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "  // ..."
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "});"
          })
        })]
      }), createVNode(_components.span, {
        class: "absolute py-1 text-foreground text-xs font-medium leading-4 pl-4 pr-2 before:inline-block before:size-1 before:bg-green-500 before:rounded-full before:absolute before:top-[45%] before:left-2 left-2 top-(--file-name-offset) border rounded-md bg-background",
        children: "astro.config.ts"
      })]
    }), "\n", createVNode(_components.h2, {
      id: "storing-images-for-blog-content",
      children: "Storing Images for Blog Content"
    }), "\n", createVNode(_components.p, {
      children: "Here are two methods for storing images and using them inside a markdown file."
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: ["Note: If you need to style optimized images in markdown, you should ", createVNode(_components.a, {
          href: "https://docs.astro.build/en/guides/images/#images-in-mdx-files",
          children: "use MDX"
        }), "."]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "inside-srcassets-directory-recommended",
      children: ["Inside ", createVNode(_components.code, {
        children: "src/assets/"
      }), " directory (recommended)"]
    }), "\n", createVNode(_components.p, {
      children: ["You can store images inside the ", createVNode(_components.code, {
        children: "src/assets/"
      }), " directory. These images will be automatically optimized by Astro through the ", createVNode(_components.a, {
        href: "https://docs.astro.build/en/reference/image-service-reference/",
        children: "Image Service API"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["You can use a relative path or alias path (", createVNode(_components.code, {
        children: "@/assets/"
      }), ") to reference these images."]
    }), "\n", createVNode(_components.p, {
      children: ["Example: suppose you want to display ", createVNode(_components.code, {
        children: "example.jpg"
      }), " whose path is ", createVNode(_components.code, {
        children: "src/assets/images/example.jpg"
      }), "."]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code astro-code-themes min-light night-owl",
      style: {
        "--shiki-light": "#24292eff",
        "--shiki-dark": "#d6deeb",
        "--shiki-light-bg": "#ffffff",
        "--shiki-dark-bg": "#011627",
        overflowX: "auto",
        "--file-name-offset": "-0.75rem"
      },
      tabindex: "0",
      "data-language": "md",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "!["
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: "something"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "]"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#7FDBCA"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-light-text-decoration": "inherit",
              "--shiki-dark": "#FF869A",
              "--shiki-dark-text-decoration": "underline"
            },
            children: "@/assets/images/example.jpg"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#7FDBCA"
            },
            children: ")"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "<!-- OR -->"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "!["
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: "something"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "]"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#7FDBCA"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-light-text-decoration": "inherit",
              "--shiki-dark": "#FF869A",
              "--shiki-dark-text-decoration": "underline"
            },
            children: "../../assets/images/example.jpg"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#7FDBCA"
            },
            children: ")"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "<!-- Using img tag or Image component won't work in markdown ❌ -->"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "<img src=\"@/assets/images/example.jpg\" alt=\"something\">"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "<!-- ^^ This is wrong -->"
          })
        })]
      })
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: ["Technically, you can store images inside any directory under ", createVNode(_components.code, {
          children: "src"
        }), ". ", createVNode(_components.code, {
          children: "src/assets"
        }), " is just a recommendation."]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "inside-public-directory",
      children: ["Inside ", createVNode(_components.code, {
        children: "public/"
      }), " directory"]
    }), "\n", createVNode(_components.p, {
      children: ["You can store images inside the ", createVNode(_components.code, {
        children: "public/"
      }), " directory. Keep in mind that images stored in ", createVNode(_components.code, {
        children: "public/"
      }), " remain untouched by Astro, meaning they will be unoptimized and you need to handle image optimization yourself."]
    }), "\n", createVNode(_components.p, {
      children: ["For these images, use an absolute path. They can be displayed using ", createVNode(_components.a, {
        href: "https://www.markdownguide.org/basic-syntax/#images-1",
        children: "markdown image syntax"
      }), " or an HTML ", createVNode(_components.code, {
        children: "img"
      }), " tag."]
    }), "\n", createVNode(_components.p, {
      children: ["Example: assume ", createVNode(_components.code, {
        children: "example.jpg"
      }), " is located at ", createVNode(_components.code, {
        children: "public/assets/images/example.jpg"
      }), "."]
    }), "\n", createVNode(_components.pre, {
      class: "astro-code astro-code-themes min-light night-owl",
      style: {
        "--shiki-light": "#24292eff",
        "--shiki-dark": "#d6deeb",
        "--shiki-light-bg": "#ffffff",
        "--shiki-dark-bg": "#011627",
        overflowX: "auto",
        "--file-name-offset": "-0.75rem"
      },
      tabindex: "0",
      "data-language": "md",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "!["
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#D32F2F",
              "--shiki-dark": "#D6DEEB"
            },
            children: "something"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "]"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#7FDBCA"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-light-text-decoration": "inherit",
              "--shiki-dark": "#FF869A",
              "--shiki-dark-text-decoration": "underline"
            },
            children: "/assets/images/example.jpg"
          }), createVNode(_components.span, {
            style: {
              "--shiki-light": "#22863A",
              "--shiki-dark": "#7FDBCA"
            },
            children: ")"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#C2C3C5",
              "--shiki-light-font-style": "inherit",
              "--shiki-dark": "#637777",
              "--shiki-dark-font-style": "italic"
            },
            children: "<!-- OR -->"
          })
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            style: {
              "--shiki-light": "#24292EFF",
              "--shiki-dark": "#D6DEEB"
            },
            children: "<img src=\"/assets/images/example.jpg\" alt=\"something\">"
          })
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "bonus",
      children: "Bonus"
    }), "\n", createVNode(_components.h3, {
      id: "image-compression",
      children: "Image compression"
    }), "\n", createVNode(_components.p, {
      children: ["When putting images in a blog post (especially those in the ", createVNode(_components.code, {
        children: "public/"
      }), " directory), it is recommended to compress them. This will affect the overall performance of the website."]
    }), "\n", createVNode(_components.p, {
      children: "Recommended image compression sites:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "https://tinypng.com/",
          children: "TinyPng"
        })
      }), "\n", createVNode(_components.li, {
        children: createVNode(_components.a, {
          href: "https://tinyjpg.com/",
          children: "TinyJPG"
        })
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "og-image",
      children: "OG Image"
    }), "\n", createVNode(_components.p, {
      children: ["The default OG image will be used if a post does not specify one. Though not required, an OG image relevant to the post should be specified in the frontmatter. The recommended size for OG images is ", createVNode(_components.strong, {
        children: createVNode(_components.em, {
          children: "1200 X 640"
        })
      }), " px."]
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: ["Since AstroPaper v1.4.0, OG images are generated automatically if not specified. Check out ", createVNode(_components.a, {
          href: "https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/",
          children: "the announcement"
        }), "."]
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/posts/adding-new-post.mdx";
const file = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/content/posts/adding-new-post.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "D:/Claude Works/IDEA works/ANSYS_SIMULATION_TEST1/Astro Web/src/content/posts/adding-new-post.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
