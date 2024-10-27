import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

import purgecss from "astro-purgecss";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkRuby from "remark-denden-ruby";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import { createHighlighter } from "shiki";

import rehypePagefind from "./src/lib/rehype-pagefind";
import remarkFootnoteTitle from "./src/lib/remark-footnote-title";
import remarkImagePlaceholder from "./src/lib/remark-image-placeholder";
import remarkLinkcard from "./src/lib/remark-link-card";

import type { Element } from "hast";
import type { Options as PrettyOptions } from "rehype-pretty-code";

export default defineConfig({
  integrations: [
    mdx(),
    solid({
      exclude: ["**/OgImage/**"],
    }),
    sitemap(),
    purgecss({
      fontFace: true,
    }),
  ],
  build: {
    format: "file",
  },
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true,
        },
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
    smartypants: false,
    remarkPlugins: [
      remarkGemoji,
      remarkMath,
      remarkRuby,
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
      remarkImagePlaceholder,
    ],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteBackLabel: "戻る",
    },
    rehypePlugins: [
      rehypeSlug,
      rehypeUnwrapImages,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties(node: Element) {
            return {
              "aria-labelledby": node.properties.id,
            };
          },
          content: h("span.heading-link-icon", {
            title: "リンク",
          }),
        },
      ],
      [
        rehypeMermaid,
        {
          strategy: "img-svg",
          dark: {
            theme: "dark",
            fontFamily: "monospace",
          },
          mermaidConfig: {
            fontFamily: "monospace",
          },
          launchOptions: {
            channel: "chrome",
          },
        },
      ],
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: {
            light: "poimandres",
            dark: "rose-pine",
          },
          grid: false,
          defaultLang: "plaintext",
          getHighlighter: (options) =>
            createHighlighter({
              ...options,
              langs: [
                async () =>
                  await fetch(
                    "https://raw.githubusercontent.com/caddyserver/vscode-caddyfile/refs/heads/master/syntaxes/caddyfile.tmLanguage.json",
                  ).then((res) => res.json()),
              ],
            }),
        } satisfies PrettyOptions,
      ],
      rehypePagefind,
    ],
  },
  site: "https://www.haxibami.net",
});
