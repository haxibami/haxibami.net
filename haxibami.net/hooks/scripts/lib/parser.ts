// Markdown parser for metadata & preview data

import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import stripMarkdown from "strip-markdown";
import { unified } from "unified";
import { matter } from "vfile-matter";

import type { PostMeta } from "./interface.js";
import type { Plugin } from "unified";
import type { VFile } from "vfile";

/**
 * Plugin to parse YAML frontmatter and expose it at `file.data.matter`.
 *
 * @type {import('unified').Plugin<[void, VFile], void, void>}
 */
export default function remarkParseMatter(): Plugin<[void, VFile], void, void> {
  return function (_: void, file: VFile) {
    matter(file);
  };
}

declare module "vfile" {
  interface DataMap {
    matter: PostMeta;
  }
}

export const mdInfo = async (md: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(stripMarkdown, {
      remove: ["heading", "list", "blockquote", "code", "image", "link"],
    })
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkParseMatter)
    .process(md);

  return {
    preview: result.toString().replaceAll("\n", "").substring(0, 300),
    data: result.data.matter as PostMeta,
  };
};
