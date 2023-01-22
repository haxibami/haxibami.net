// import { readFileSync } from "fs";
// import { join } from "path";

// import rehypeShiki from "@leafac/rehype-shiki";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkJaruby from "remark-jaruby";
import remarkMath from "remark-math";
// import remarkToc from "remark-toc";
import remarkUnwrapImages from "remark-unwrap-images";
// import * as shiki from "shiki";

import type { Options } from "rehype-pretty-code";

import rehypeImageOpt from "./rehype-image-opt";
import { remarkLinkCard, extLinkHandler } from "./remark-link-card";
import remarkMermaid from "./remark-mermaid";

export const compileMdx = async (file: string) => {
  // Get shiki theme file
  //   const getThemePath = (themename: string) =>
  //     join(process.cwd(), "src/styles/shiki", `${themename}.json`);
  // const myShikiTheme = await shiki.loadTheme(getThemePath("urara-color-theme"));

  const rpcOptions: Partial<Options> = {
    theme: {
      light: "poimandres",
      // dark: "rose-pine",
    },
    // theme: JSON.parse(readFileSync(getThemePath("urara-color-theme"), "utf-8")),
    onVisitLine(node) {
      // Prevent lines from collapsing in `display: grid` mode, and
      // allow empty lines to be copy/pasted
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(node) {
      node.properties.className.push("highlighted");
    },
    onVisitHighlightedWord(node) {
      node.properties.className = ["word"];
    },
  };

  // compile md(x)
  const mdxSource = await serialize(file, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkGemoji,
        remarkMath,
        remarkJaruby,
        remarkLinkCard,
        remarkUnwrapImages,
        //         [
        //           remarkToc,
        //           {
        //             heading: "目次",
        //             tight: true,
        //             maxDepth: 3,
        //             parents: ["root", "listItem"],
        //           },
        //         ],
        [
          remarkMermaid,
          {
            launchOptions: {
              args: ["--no-sandbox", "--disable-setuid-sandbox"],
            },
            wrap: true,
            className: ["mermaid"],
          },
        ],
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeKatex,
        [rehypePrettyCode, rpcOptions],
        rehypeImageOpt,
        rehypeRaw,
      ],
      remarkRehypeOptions: {
        handlers: {
          extlink: extLinkHandler,
        },
      },
      format: "md",
    },
    parseFrontmatter: true,
  });

  return mdxSource;
};
