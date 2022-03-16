// Markdown parser on "Server" side. Never include Frontend code (including rehype-react).

import { join } from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import remarkJaruby from "remark-jaruby";
import rehypeKatex from "rehype-katex";
import * as shiki from "shiki";
import rehypeShiki from "@leafac/rehype-shiki";
import remarkRehype from "remark-rehype";
import type { Options as RemarkRehypeOptions } from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import stripMarkdown from "strip-markdown";
import remarkStringify from "remark-stringify";
import { remarkLinkWidget, extLinkHandler } from "./remark-link-widget";

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
    .use(remarkRehype, {
      handlers: {
        extlink: extLinkHandler,
      },
    } as RemarkRehypeOptions)
    .use(rehypeKatex)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: myShikiTheme }),
    })
    .use(rehypeStringify)
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
