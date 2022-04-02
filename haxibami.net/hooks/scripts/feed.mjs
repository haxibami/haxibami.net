import fs from "fs";
import { Feed } from "feed";
import { readYaml, getAllPosts, MdToHtml, dateConverter } from "./lib.mjs";

// variables
const HOST = "https://www.haxibami.net";

const meta = readYaml("meta.yaml");

// generate feed
const feedGenerator = () => {
  const author = {
    name: "haxibami",
    email: "contact@haxibami.net",
    link: HOST,
  };

  const date = new Date();
  const feed = new Feed({
    title: meta.siteinfo.blog.title,
    description: meta.siteinfo.blog.description,
    id: HOST,
    link: HOST,
    language: "ja",
    image: `${HOST}/icon_ange_glasses_192.png`,
    favicon: `${HOST}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${HOST}/rss/feed.xml`,
      json: `${HOST}/rss/feed.json`,
      atom: `${HOST}/rss/atom.xml`,
    },
    author: author,
  });

  const allBlogs = getAllPosts(["slug", "title", "date", "content"], "blog");

  allBlogs.forEach((post) => {
    const url = `${HOST}/blog/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      description: `<p>${MdToHtml(post.content).substring(0, 300)}</p>`,
      id: url,
      link: url,
      date: new Date(dateConverter(post.date)),
    });
  });

  fs.mkdirSync("public/rss", { recursive: true });
  fs.writeFileSync("public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("public/rss/feed.json", feed.json1());
};

const GenFeed = () => {
  return new Promise((resolve) => {
    feedGenerator();
    resolve();
  });
};

export default GenFeed;
