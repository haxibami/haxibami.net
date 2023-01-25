// caches locally fetched data. see: https://beta.nextjs.org/docs/data-fetching/caching#per-request-caching
// currently this doesn't cache ¯\_(ツ)_/¯
import { cache } from "react";

import { getPost, getPostsData } from "lib/fs";

export const fetchPost = cache(async (path: string, slug: string) => {
  const post = getPost(slug, path);
  return post;
});

export const fetchPostsData = cache(async (path: string) => {
  const posts = await getPostsData(path);
  return posts;
});

export const fetchSlugs = async (path: string) => {
  const data = await fetchPostsData(path);
  return data.map((post) => post.data?.slug ?? "");
};

export const fetchTags = async (path: string) => {
  const data = await fetchPostsData(path);
  return Array.from(new Set(data.flatMap((d) => d.data?.tags ?? []))).sort();
};

export const fetchTaggedPostsData = async (path: string, tag: string) => {
  const data = await fetchPostsData(path);
  return data.filter((d) => d.data?.tags?.includes(tag));
};
