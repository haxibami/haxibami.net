import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { PostItem, PostType, SiteInfo } from "./interface";
import { MdStrip } from "lib/parser";
import * as yaml from "js-yaml";

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
  fields: string[] = [],
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

export const getAllPosts = (fields: string[] = [], posttype: PostType) => {
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
  const res: string[] = Array.from(new Set(taglist));

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

export const getPostsByDate = (date: string, posttype: PostType) => {
  const sdpair: PostItem[] = getAllPosts(["slug", "date"], posttype);
  const dayposts: string[] = [];
  sdpair.forEach((one: PostItem) => {
    if (one.date === date) {
      dayposts.push(one.slug);
    }
  });

  return dayposts;
};

export const replaceMdwithTxt = async (post: PostItem) => {
  post.content = await MdStrip(post.content);
  return post;
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

// if given n, returns array of 2...n
export const pageIdGen = (stop: number) => {
  return Array.from({ length: stop }, (_, i) => i + 1).slice(1);
};
