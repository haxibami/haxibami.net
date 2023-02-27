import type { Metadata } from "next";

import PostDisplay from "components/PostDisplay";
import { fetchPostsData, fetchSlugs } from "lib/api";
import { COUNT_PER_PAGE, SITEDATA, HOST } from "lib/constant";
import { pageIdGen } from "lib/fs";

const postType = "grad_essay";

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const { id } = params;
  return {
    title: `${SITEDATA[postType].title}: ページ${id}`,
    description: SITEDATA[postType].description,
    openGraph: {
      title: SITEDATA[postType].title,
      description: SITEDATA[postType].description,
      url: `https://${HOST}/${postType}/page/${id}`,
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
      title: SITEDATA[postType].title,
      description: SITEDATA[postType].description,
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

export default async function Posts({ params }: { params: { id: string } }) {
  const { id } = params;
  const pageId = parseInt(id ?? ``, 10);
  const end = COUNT_PER_PAGE * pageId;
  const start = end - COUNT_PER_PAGE;

  const postsData = await fetchPostsData(`articles/${postType}`);
  const total = postsData.length;
  const assign = postsData.slice(start, end);

  return (
    <PostDisplay
      title={undefined}
      topPath={`/${postType}`}
      assign={assign}
      id={pageId}
      total={total}
      perPage={COUNT_PER_PAGE}
      postType={postType}
    />
  );
}

export const generateStaticParams = async () => {
  const slugs = await fetchSlugs(`articles/${postType}`);
  const pages = pageIdGen(Math.ceil(slugs.length / COUNT_PER_PAGE));
  return pages.map((page) => ({
    id: `${page}`,
  }));
};
