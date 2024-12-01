import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import purgecss from "astro-purgecss";
import { h } from "hastscript";
import postcssPresetEnv from "postcss-preset-env";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkRuby from "remark-denden-ruby";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";

import rehypeBudoux from "./src/lib/rehype-budoux";
import rehypePagefind from "./src/lib/rehype-pagefind";
import remarkFootnoteTitle from "./src/lib/remark-footnote-title";
import remarkImagePlaceholder from "./src/lib/remark-image-placeholder";
import remarkLinkcard from "./src/lib/remark-link-card";

import type { Element } from "hast";

export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            features: {
              "nesting-rules": true,
            },
          }),
        ],
      },
    },
  },
  integrations: [
    expressiveCode({
      themes: ["github-dark-default", "github-light-default"],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: false,
      },
      shiki: {
        langs: [
          async () =>
            await fetch(
              "https://raw.githubusercontent.com/caddyserver/vscode-caddyfile/refs/heads/master/syntaxes/caddyfile.tmLanguage.json",
              { cache: "force-cache" },
            ).then((res) => res.json()),
        ],
      },
    }),
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
  markdown: {
    syntaxHighlight: false,
    smartypants: false,
    remarkPlugins: [
      remarkGemoji,
      remarkMath,
      remarkRuby,
      remarkLinkcard,
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
              class: "heading-link",
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
      rehypeBudoux,
      rehypeKatex,
      rehypePagefind,
    ],
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  site: "https://www.haxibami.net",
});
