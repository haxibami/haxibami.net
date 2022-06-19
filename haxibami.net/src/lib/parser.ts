// Markdown parser for build-time. Never include frontend code (ex. rehype-react).

import { join } from "path";

import rehypeShiki from "@leafac/rehype-shiki";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkJaruby from "remark-jaruby";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import remarkToc from "remark-toc";
import remarkUnwrapImages from "remark-unwrap-images";
import * as shiki from "shiki";
import stripMarkdown from "strip-markdown";
import { unified } from "unified";

import { remarkLinkWidget, extLinkHandler } from "./remark-link-widget";
import remarkMermaid from "./remark-mermaid";

import type { Options as RemarkRehypeOptions } from "remark-rehype";

// Get shiki theme file (`src/styles/shiki/${themename}.json`) full path
const getThemePath = (themename: string) =>
  join(process.cwd(), "src/styles/shiki", `${themename}.json`);

// Convert Markdown to HTML
export const MdToHtml = async (md: string) => {
  const myShikiTheme = await shiki.loadTheme(getThemePath("urara-color-theme"));
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkMath)
    .use(remarkJaruby)
    .use(remarkLinkWidget)
    .use(remarkUnwrapImages)
    .use(remarkToc, {
      heading: "目次",
      tight: true,
    })
    .use(remarkMermaid, {
      launchOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
      wrap: true,
      classname: ["mermaid"],
    })
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: {
        extlink: extLinkHandler,
      },
    } as RemarkRehypeOptions)
    .use(rehypeKatex)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: myShikiTheme }),
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(md);

  return result.toString();
};

// Convert Markdown to plaintext
export const MdStrip = async (md: string) => {
  const result = unified()
    .use(remarkParse)
    .use(stripMarkdown, {
      remove: ["heading", "list", "blockquote", "code", "image"],
    })
    .use(remarkStringify)
    .processSync(md);

  return result.toString();
};
