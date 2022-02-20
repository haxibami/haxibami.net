import fs from "fs";
import { getAllPosts } from "./lib.mjs";
import prettier from "prettier";

const articleIndexer = () => {
  const allBlogs = getAllPosts(["slug", "title", "date"], "blog");
  const allGrads = getAllPosts(["slug", "title", "date"], "grad_essay");
  const blogIndex = allBlogs.map((item) => {
    const indexitem = {
      slug: item.slug,
      title: item.title,
      date: item.date,
    };
    return indexitem;
  });
  const gradIndex = allGrads.map((item) => {
    const indexitem = {
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

  const formatted = (json) => prettier.format(json, { parser: "json" });

  fs.writeFileSync("public/index.json", formatted(JSON.stringify(index)));
};

export default () => {
  return new Promise(async (resolve) => {
    articleIndexer();
    resolve();
  });
};
