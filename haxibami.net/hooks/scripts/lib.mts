import fs from "fs";
import { join, dirname, sep, basename } from "path";
import matter from "gray-matter";
import * as yaml from "js-yaml";
import { unified } from "unified";
import remarkParse from "remark-parse";
import stripMarkdown from "strip-markdown";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import remarkJaruby from "remark-jaruby";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

import type { PostType, PostItem, SiteInfo } from "../../src/lib/interface";

export const getArticlesDir = (posttype: PostType) => {
  const ArticlesDir = join(process.cwd(), `src/articles/${posttype}`);
  return ArticlesDir;
};

export const getPostSlugs = (posttype: PostType) => {
  const allobjects = fs.readdirSync(getArticlesDir(posttype), {
    withFileTypes: true,
  });
  return allobjects
    .filter((objects) => objects.isFile())
    .map(({ name }) => name.replace(/.md/g, ""));
};

export const getPostBySlug = (
  slug: string,
  fields: string[],
  posttype: PostType
) => {
  const fullPath = join(getArticlesDir(posttype), `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  const Post: PostItem = {
    slug: "",
    title: "",
    date: "",
    tags: [],
    content: "",
  };

  fields.forEach((field) => {
    if (field === "slug") {
      Post[field] = slug;
    }

    if (field === "title" || field === "date" || field === "tags") {
      Post[field] = data[field];
    }

    if (field === "content") {
      Post[field] = content;
    }
  });

  return Post;
};

export const getAllPosts = (fields: string[], posttype: PostType) => {
  const slugs: string[] = getPostSlugs(posttype);
  const posts: PostItem[] = slugs
    .map((slug) => getPostBySlug(slug, fields, posttype))
    .sort((a, b) => {
      const dateA = Number(a.date);
      const dateB = Number(b.date);

      return dateB - dateA;
    });

  return posts;
};

export const getPostTags = (posttype: PostType) => {
  const alltags = getAllPosts(["tags"], posttype);
  let taglist: string[] = [];
  alltags.forEach(
    (tagset: PostItem) => (taglist = taglist.concat(tagset.tags))
  );
  const res: string[] = Array.from(new Set(taglist)).sort();

  return res;
};

export const getPostsByTag = (tag: string, posttype: PostType) => {
  const stpair: PostItem[] = getAllPosts(["slug", "tags", "date"], posttype);
  const taggedposts: string[] = [];
  stpair.forEach((item: PostItem) => {
    if (item.tags.includes(tag)) {
      taggedposts.push(item.slug);
    }
  });

  return taggedposts;
};

export const getShareDir = () => {
  const shareDir = join(process.cwd(), `src/share`);
  return shareDir;
};

export const readYaml = (filename: string) => {
  const fullPath = join(getShareDir(), filename);
  const content = yaml.load(fs.readFileSync(fullPath, "utf8")) as SiteInfo;
  return content;
};

export const MdToHtml = (md: string) => {
  const result = unified()
    .use(remarkParse)
    .use(stripMarkdown, {
      remove: ["list", "blockquote", "image", "code"],
    })
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkMath)
    .use(remarkJaruby)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .processSync(md);

  return result.toString();
};

export const dateConverter = (date: string) => {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
};
