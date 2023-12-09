import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import type { RemarkPlugins, RehypePlugins } from "astro";
import { defineConfig } from "astro/config";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
// import rehypeMermaid from "rehype-mermaidjs";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkRuby from "remark-denden-ruby";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";

import remarkFootnoteTitle from "./src/lib/remark-footnote-title";
// import remarkImageOpt from "./src/lib/remark-image-opt";
import remarkLinkcard from "./src/lib/remark-link-card";

export default defineConfig({
  redirects: {
    "/blog/tags": "/blog",
  },
  integrations: [
    mdx(),
    solid({
      exclude: ["**/OgImage/**"],
    }),
    sitemap(),
  ],
  build: {
    format: "file",
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          nesting: true,
          customMedia: true,
        },
      },
    },
    ssr: {
      external: ["@resvg/resvg-js"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  markdown: {
    syntaxHighlight: false,
    smartypants: false,
    remarkPlugins: [
      remarkGemoji,
      remarkMath,
      remarkRuby,
      remarkUnwrapImages,
      // remarkImageOpt,
      remarkLinkcard,
      //         [
      //           remarkToc,
      //           {
      //             heading: "目次",
      //             tight: true,
      //             maxDepth: 3,
      //             parents: ["root", "listItem"],
      //           },
      //         ],
      remarkFootnoteTitle,
    ] as RemarkPlugins, // TODO: remove type assertion when all plugins are updated to use unified 11
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteBackLabel: "戻る",
    },
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      //       [
      //         rehypeMermaid,
      //         {
      //           strategy: "inline-svg",
      //           mermaidConfig: {
      //             fontFamily: "sans-serif, monospace",
      //           },
      //         },
      //       ],
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: {
            light: "poimandres",
            dark: "rose-pine",
          },
          grid: true,
        },
      ],
    ] as RehypePlugins, // TODO: remove type assertion when all plugins are updated to use unified 11
  },
  // scopedStyleStrategy: "class",
  site: "https://www.haxibami.net",
});
