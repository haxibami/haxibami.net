import { getCollection, getEntry } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const meta = await getEntry("data", "meta");
  const posts = (await getCollection("blog"))
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())
    .reverse();
  return await rss({
    title: meta.data.top.title,
    description: meta.data.top.description,
    site: context.url.origin,
    items: posts.map((post) => {
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        categories: post.data.tags,
        link: `/${post.collection}/posts/${post.slug}/`,
        enclosure: {
          url: `/api/og/article/${post.collection}/${post.slug}.png`,
          type: "image/png",
          length: 65535,
        },
      };
    }),
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: [
      "<language>ja-jp</language>",
      `<atom:link href="${context.url}" rel="self" type="application/rss+xml" />`,
    ].join(""),
  });
}
