import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkStringify from "remark-stringify";
import stripMarkdown from "strip-markdown";
import emoji from "remark-emoji";

export const MdStrip = async (md: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(stripMarkdown, {
      remove: ["heading", "list", "blockquote", "code", "image"],
    })
    .use(remarkStringify)
    .process(md);
  return result.toString();
};

export const MdToHtml = async (md: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(emoji)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);

  return result.toString();
};
