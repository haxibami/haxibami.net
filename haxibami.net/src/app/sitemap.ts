import type { MetadataRoute } from "next";

import { globby } from "globby";

import { dateConverter } from "lib/build";
import { HOST } from "lib/constant";
// Article index file
import postIndex from "share/index.json";

import type { PostData } from "lib/interface";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const constPaths = await globby(["src/app/**/page.tsx", "src/app/page.tsx"], {
    ignore: ["src/app/api/*.tsx", "src/app/grad_essay/**", "src/app/**/[*/**"],
  });

  const constPageEntries = constPaths.map((filePath) => {
    const constPageEntry = {
      relpath: filePath.replace("src/app/", "").replace("page.tsx", ""),
      lastmod: "",
    };
    return constPageEntry;
  });

  const blogposts = postIndex.articles.blog;

  const blogTags = postIndex.tags.blog;

  const blogEntries = blogposts.map((post: PostData) => {
    const blogEntry = {
      relpath: `blog/posts/${post.data?.slug}`,
      lastmod: dateConverter(post.data?.date),
    };
    return blogEntry;
  });

  const blogTagEntries = blogTags.map((tag: string) => {
    const blogTagEntry = {
      relpath: `blog/tag/${tag}`,
      lastmod: "",
    };
    return blogTagEntry;
  });

  const sitemapEntries = constPageEntries.concat(blogEntries, blogTagEntries);
  return sitemapEntries.map((entry) =>
    entry.lastmod !== ""
      ? {
          url: `https://${HOST}/${entry.relpath}`,
          lastModified: entry.lastmod,
        }
      : {
          url: `https://${HOST}/${entry.relpath}`,
        },
  );
}
