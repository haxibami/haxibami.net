// Markdown parser for metadata & preview data

import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import stripMarkdown from "strip-markdown";
import { unified } from "unified";
import { matter } from "vfile-matter";

import type { PostMeta } from "./interface";
import type { VFile } from "vfile-matter";

/**
 * Plugin to parse YAML frontmatter and expose it at `file.data.matter`.
 *
 * @type {import('unified').Plugin<Array<void>>}
 */
export default function remarkParseMatter() {
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

  const regex = "\n*";

  return {
    preview: result.toString().replaceAll(regex, " ").substring(0, 100),
    data: result.data.matter,
  };
};

export const parseMatter = async (md: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkParseMatter)
    .process(md);

  return result.data.matter;
};
