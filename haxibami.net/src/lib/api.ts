import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { MdStrip } from "modules/parser";

const ArticleType = {
  Blog: "blog",
  Grad_Essay: "grad_essay",
} as const;

export type ArticleType = typeof ArticleType[keyof typeof ArticleType];

export const getArticlesDir = (articletype: ArticleType) => {
  const ArticlesDir = join(process.cwd(), "src", "articles", articletype);
  return ArticlesDir;
};

export const getPostSlugs = (articletype: ArticleType) => {
  const allobjects = fs.readdirSync(getArticlesDir(articletype), {
    withFileTypes: true,
  });
  return allobjects
    .filter((objects) => objects.isFile())
    .map(({ name }) => name.replace(/.md/g, ""));
};

export type BlogItem = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
};

export const getPostBySlug = (
  slug: string,
  fields: string[] = [],
  articletype: ArticleType
) => {
  const fullPath = join(getArticlesDir(articletype), slug + ".md");
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  const Post: BlogItem = {
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
  fields: string[] = [],
  articletype: ArticleType
) => {
  const slugs: string[] = getPostSlugs(articletype);
  const posts: BlogItem[] = slugs
    .map((slug) => getPostBySlug(slug, fields, articletype))
    .sort((a, b) => {
      const dateA: number = Number(a.date);
      const dateB: number = Number(b.date);

      return dateB - dateA;
    });

  return posts;
};

export const getPostTags = (articletype: ArticleType) => {
  const alltags = getAllPosts(["tags"], articletype);
  let taglist: string[] = [];
  alltags.forEach(
    (tagset: BlogItem) => (taglist = taglist.concat(tagset.tags))
  );
  const res: string[] = Array.from(new Set(taglist));

  return res;
};

export const getPostsByTag = (tag: string, articletype: ArticleType) => {
  const stpair: BlogItem[] = getAllPosts(["slug", "tags", "date"], articletype);
  let taggedposts: string[] = [];
  stpair.forEach((one: BlogItem) => {
    if (one.tags.includes(tag)) {
      taggedposts.push(one.slug);
    }
  });

  return taggedposts;
};

export const getPostsByDate = (date: string, articletype: ArticleType) => {
  const sdpair: BlogItem[] = getAllPosts(["slug", "date"], articletype);
  let dayposts: string[] = [];
  sdpair.forEach((one: BlogItem) => {
    if (one.date === date) {
      dayposts.push(one.slug);
    }
  });

  return dayposts;
};

export const CreatePreview = async (post: BlogItem) => {
  const result = await MdStrip(post.content);
  post.content = result;
  return post;
};
