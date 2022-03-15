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

export const getArticlesDir = (articletype) => {
  const ArticlesDir = join(process.cwd(), `src/articles/${articletype}`);
  return ArticlesDir;
};

export const getPostSlugs = (articletype) => {
  const allobjects = fs.readdirSync(getArticlesDir(articletype), {
    withFileTypes: true,
  });
  return allobjects
    .filter((objects) => objects.isFile())
    .map(({ name }) => name.replace(/.md/g, ""));
};

export const getPostBySlug = (
  slug, // string
  fields, // string[]
  articletype //ArticleType
) => {
  const fullPath = join(getArticlesDir(articletype), `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  const Post = {
    // BlogItem
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

export const getAllPosts = (
  fields = [], // string[]
  articletype // ArticleType
) => {
  const slugs = getPostSlugs(articletype); // string[]
  const posts = slugs // BlogItem[]
    .map((slug) => getPostBySlug(slug, fields, articletype))
    .sort((a, b) => {
      const dateA = Number(a.date); // number
      const dateB = Number(b.date); // number

      return dateB - dateA;
    });

  return posts;
};

export const getPostTags = (articletype) => {
  // ArticleType
  const alltags = getAllPosts(["tags"], articletype);
  let taglist = []; // string[]
  alltags.forEach(
    (tagset) => (taglist = taglist.concat(tagset.tags)) // BlogItem
  );
  const res = Array.from(new Set(taglist)); // string[]

  return res;
};

export const getPostsByTag = (tag, articletype) => {
  // string, ArticleType
  const stpair = getAllPosts(["slug", "tags", "date"], articletype); // BlogItem[]
  let taggedposts = []; // string[]
  stpair.forEach((item) => {
    // BlogItem
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

export const readYaml = (filename) => {
  const fullPath = join(getShareDir(), filename);
  const content = yaml.load(fs.readFileSync(fullPath, "utf8"));
  return content;
};

export const MdToHtml = (md) => {
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

export const dateConverter = (date) => {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
};
