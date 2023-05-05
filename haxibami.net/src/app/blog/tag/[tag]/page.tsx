import type { Metadata } from "next";

import PostDisplay from "components/PostDisplay";
import { fetchTags, fetchTaggedPostsData } from "lib/api";
import { COUNT_PER_PAGE, SITEDATA } from "lib/constant";

const postType = "blog";

export function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Metadata {
  const { tag } = params;
  return {
    title: `${SITEDATA[postType].title} - #${tag}`,
    description: `タグ: #${tag} の記事`,
    openGraph: {
      title: `${SITEDATA[postType].title} - #${tag}`,
      description: `タグ: #${tag} の記事`,
      url: `/${postType}/tag/${tag}`,
      type: "website",
      images: {
        url: encodeURI(`/api/ogp?title=${SITEDATA[postType].title}`),
        width: 1200,
        height: 630,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITEDATA[postType].title} - #${tag}`,
      description: `タグ: #${tag} の記事`,
      images: encodeURI(`/api/ogp?title=${SITEDATA[postType].title}`),
      site: "@haxibami",
      siteId: "1077091437517238272",
      creator: "@haxibami",
      creatorId: "1077091437517238272",
    },
  };
}

export default async function TaggedPosts({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = params;
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;

  const taggedPostsData = await fetchTaggedPostsData(
    `articles/${postType}`,
    tag
  );

  const total = taggedPostsData.length;
  const assign = taggedPostsData.slice(start, end);
  return (
    <PostDisplay
      title={tag}
      topPath={`/${postType}/tag/${tag}`}
      assign={assign}
      id={id}
      total={total}
      perPage={COUNT_PER_PAGE}
      postType={postType}
    />
  );
}

export const generateStaticParams = async () => {
  const tags = await fetchTags(`articles/${postType}`);
  return tags.map((tag) => {
    return {
      tag,
    };
  });
};
