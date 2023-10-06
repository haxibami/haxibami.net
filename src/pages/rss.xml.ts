import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getEntry, getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const meta = await getEntry("data", "meta");
  const posts = (await getCollection("blog"))
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())
    .reverse();
  return rss({
    title: meta.data.blog.title,
    description: meta.data.blog.description,
    site: context.site ?? "",
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
  });
}
