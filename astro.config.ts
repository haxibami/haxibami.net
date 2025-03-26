import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import purgecss from "astro-purgecss";
import { defineConfig } from "astro/config";

import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkRuby from "remark-denden-ruby";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";

import { SITE } from "./src/lib/constant";
import rehypeBudoux from "./src/lib/rehype-budoux";
import rehypePagefind from "./src/lib/rehype-pagefind";
import remarkFootnoteTitle from "./src/lib/remark-footnote-title";
import remarkImagePlaceholder from "./src/lib/remark-image-placeholder";
import remarkLinkcard from "./src/lib/remark-link-card";

import type { Element } from "hast";

export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ["github-dark-default", "github-light-default"],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: false,
      },
      styleOverrides: {
        borderRadius: "0",
        borderColor: "var(--item-border)",
        borderWidth: "1px",
        codeBackground: "var(--code-bg)",
      },
      shiki: {
        langs: [
          async () =>
            await fetch(
              "https://raw.githubusercontent.com/caddyserver/vscode-caddyfile/refs/heads/master/syntaxes/caddyfile.tmLanguage.json",
            ).then((res) => res.json()),
        ],
      },
    }),
    mdx(),
    sitemap(),
    purgecss({
      fontFace: false,
      variables: true,
      keyframes: true,
      safelist: {
        standard: [/:hover$/],
        variables: ["--font-mono"],
      },
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
      footnoteLabel: " ",
      footnoteBackLabel: "戻る",
      footnoteLabelTagName: "hr",
    },
    rehypePlugins: [
      rehypeSlug,
      rehypeUnwrapImages,
      (...args) =>
        rehypeAutolinkHeadings({
          ...args,
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
        }),
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
      (...args) =>
        rehypeKatex({
          ...args,
          trust: true,
          strict: false,
        }),
      rehypePagefind,
    ],
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  site: SITE.href,
  experimental: {
    svg: {
      mode: "inline",
    },
  },
});
