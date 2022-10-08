import fs from "fs";

import prettier from "prettier";

import { getAllPosts } from "./lib.mjs";

import type { IndexItem } from "./interface.mjs";

const articleIndexer = () => {
  const allBlogs = getAllPosts(["slug", "title", "date"], "blog");
  const allGrads = getAllPosts(["slug", "title", "date"], "grad_essay");
  const blogIndex = allBlogs.map((item) => {
    const indexitem: IndexItem = {
      slug: item.slug,
      title: item.title,
      date: item.date,
    };
    return indexitem;
  });
  const gradIndex = allGrads.map((item) => {
    const indexitem: IndexItem = {
      slug: item.slug,
      title: item.title,
      date: item.date,
    };
    return indexitem;
  });

  const index = {
    articles: {
      blog: blogIndex,
      grad_essay: gradIndex,
    },
  };

  const formatted = (json: string) => prettier.format(json, { parser: "json" });

  fs.writeFileSync("src/share/index.json", formatted(JSON.stringify(index)));
};

const exp = () => {
  return new Promise<void>((resolve) => {
    articleIndexer();
    resolve();
  });
};

export default exp;
