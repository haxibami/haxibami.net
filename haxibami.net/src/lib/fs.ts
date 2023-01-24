import fs from "fs";
import { join } from "path";

import { mdInfo } from "lib/parser";

import type { PostData } from "lib/interface";

export const getPostDir = (path: string) => join(process.cwd(), "src", path);

export const getPost = (slug: string, path: string) => {
  const filePath = join(getPostDir(path), `${slug}.md`);
  const content = fs.readFileSync(filePath, "utf-8");
  return content;
};

export const getSlugs = (path: string) => {
  const files = fs.readdirSync(getPostDir(path), {
    withFileTypes: true,
  });
  return files.flatMap((file) =>
    file.isFile() && file.name.endsWith(".md")
      ? file.name.replace(/.md/g, "")
      : []
  );
};

const getPaths = (path: string) => {
  const files = fs.readdirSync(getPostDir(path), {
    withFileTypes: true,
  });
  return files.flatMap((file) =>
    file.isFile() && file.name.endsWith(".md")
      ? join(getPostDir(path), file.name)
      : []
  );
};

export const getPostsData = async (path: string) => {
  console.log("getpostsdata fired");
  const files = getPaths(path);
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = fs.readFileSync(file, "utf-8");
      const res: PostData = await mdInfo(content);
      return res;
    })
  );
  return posts.sort((a, b) => {
    const dateA = Number(a.data?.date);
    const dateB = Number(b.data?.date);

    return dateB - dateA;
  });
};

export const getTags = async (path: string) => {
  const taglists = Array.from(
    new Set((await getPostsData(path)).flatMap((post) => post.data?.tags ?? []))
  ).sort();
  return taglists;
};

// if given n, returns array of {2...n}
export const pageIdGen = (stop: number) => {
  return Array.from({ length: stop }, (_, i) => i + 1).slice(1);
};
