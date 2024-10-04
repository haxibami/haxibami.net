import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import ogImage from "@/components/OgImage";

const docs = await getCollection("page");
const posts = await getCollection("blog");

const articles = [...docs, ...posts];

export const GET: APIRoute = async ({ params }) => {
  let res = new Response("Not found", { status: 404 });
  const { type, key } = params;
  if (type === "article") {
    const article = articles.find(
      (post) => `${post.collection}/${post.slug}` === key,
    );
    if (article) {
      const isPost = article.collection === "blog";
      const img = await ogImage(
        article.data.title,
        isPost ? (article.data.lastmod ?? article.data.date) : undefined,
        article.data.emoji ?? undefined,
      );
      res = new Response(img);
    }
  }
  return res;
};

export async function getStaticPaths() {
  const ogEntries = [
    ...articles.map((article) => ({
      params: { type: "article", key: `${article.collection}/${article.slug}` },
    })),
  ];
  return ogEntries;
}
