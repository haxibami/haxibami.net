import type { Metadata } from "next";

import PostDisplay from "components/PostDisplay";
import { fetchPostsData } from "lib/api";
import { COUNT_PER_PAGE, SITEDATA } from "lib/constant";

const postType = "blog";

export const metadata: Metadata = {
  title: SITEDATA[postType].title,
  description: SITEDATA[postType].description,
  openGraph: {
    title: SITEDATA[postType].title,
    description: SITEDATA[postType].description,
    url: `/${postType}`,
    type: "website",
    images: {
      url: encodeURI(`/api/ogp?title=${SITEDATA[postType].title}`),
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: SITEDATA[postType].title,
    description: SITEDATA[postType].description,
    images: encodeURI(`/api/ogp?title=${SITEDATA[postType].title}`),
    site: "@haxibami",
    siteId: "1077091437517238272",
    creator: "@haxibami",
    creatorId: "1077091437517238272",
  },
};

export default async function Posts() {
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;

  const postsData = await fetchPostsData(`articles/${postType}`);
  const total = postsData.length;
  const assign = postsData.slice(start, end);

  return (
    <PostDisplay
      title={undefined}
      topPath={`/${postType}`}
      assign={assign}
      id={id}
      total={total}
      perPage={COUNT_PER_PAGE}
      postType={postType}
    />
  );
}
