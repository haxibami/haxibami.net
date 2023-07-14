import type { Metadata } from "next";

import TagsDisplay from "components/TagsDisplay";
import { fetchTags } from "lib/api";
import { SITEDATA } from "lib/constant";

const postType = "blog";

export const metadata: Metadata = {
  title: `${SITEDATA[postType].title} - タグ一覧`,
  description: "タグ一覧",
  openGraph: {
    title: `${SITEDATA[postType].title} - タグ一覧`,
    description: "タグ一覧",
    type: "website",
    url: `/${postType}/tags`,
    images: {
      url: encodeURI(`/api/ogp?title=${SITEDATA[postType].title}.png`),
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITEDATA[postType].title} - タグ一覧`,
    description: "タグ一覧",
    images: encodeURI(`/api/ogp?title=${SITEDATA[postType].title}.png`),
    site: "@haxibami",
    siteId: "1077091437517238272",
    creator: "@haxibami",
    creatorId: "1077091437517238272",
  },
};

export default async function Tags() {
  const taglist = await fetchTags(`articles/${postType}`);
  return <TagsDisplay taglists={taglist} postType={postType} />;
}
