import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkJaruby from "remark-jaruby";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";

import MDXComponent from "components/MDXComponent";
import rehypeImageOpt from "lib/rehype-image-opt";
import { remarkLinkCard, extLinkHandler } from "lib/remark-link-card";
import remarkMermaid from "lib/remark-mermaid";

import type { Options } from "rehype-pretty-code";

const rpcOptions: Partial<Options> = {
  theme: {
    light: "poimandres",
    // dark: "rose-pine",
  },
  keepBackground: true,
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

const compiler = async (source: string) => {
  const result: Promise<{
    content: JSX.Element;
    frontmatter: {
      slug: string;
      title: string;
      date: string;
      description: string;
      tags: string[];
    };
  }> = compileMDX({
    source,
    components: MDXComponent,
    options: {
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
          footnoteLabel: "目次",
          footnoteBackLabel: "戻る",
        },
        format: "md",
      },
      parseFrontmatter: true,
    },
  });
  return result;
};

export default compiler;
