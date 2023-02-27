import type { Metadata } from "next";

import PostDisplay from "components/PostDisplay";
import { fetchTags, fetchTaggedPostsData } from "lib/api";
import { COUNT_PER_PAGE, HOST, SITEDATA } from "lib/constant";
import { pageIdGen } from "lib/fs";

const postType = "blog";

export function generateMetadata({
  params,
}: {
  params: { tag: string; id: string };
}): Metadata {
  const { tag, id } = params;
  return {
    title: `${SITEDATA[postType].title} - #${tag}`,
    description: `タグ: #${tag} の記事`,
    openGraph: {
      title: `${SITEDATA[postType].title} - #${tag}`,
      description: `タグ: #${tag} の記事`,
      url: `https://${HOST}/${postType}/tag/${tag}/page/${id}`,
      type: "website",
      images: {
        url: encodeURI(
          `https://${HOST}/api/ogp?title=${SITEDATA[postType].title}`
        ),
        width: 1200,
        height: 630,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITEDATA[postType].title} - #${tag}`,
      description: `タグ: #${tag} の記事`,
      images: encodeURI(
        `https://${HOST}/api/ogp?title=${SITEDATA[postType].title}`
      ),
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
  params: { tag: string; id: string };
}) {
  const { tag, id } = params;
  const pageId = parseInt(id ?? ``, 10);
  const end = COUNT_PER_PAGE * pageId;
  const start = end - COUNT_PER_PAGE;

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
      id={pageId}
      total={total}
      perPage={COUNT_PER_PAGE}
      postType={postType}
    />
  );
}

export const generateStaticParams = async () => {
  const tags = await fetchTags(`articles/${postType}`);
  const paths = await Promise.all(
    tags.map(async (tag) => {
      const taggedPostsData = await fetchTaggedPostsData(
        `articles/${postType}`,
        tag
      );
      const pages = pageIdGen(
        Math.ceil(taggedPostsData.length / COUNT_PER_PAGE)
      );
      return pages.map((id) => ({
        tag,
        id: `${id}`,
      }));
    })
  );
  return paths.flat();
};
