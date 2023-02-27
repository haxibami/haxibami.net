import type { Metadata } from "next";

import TagsDisplay from "components/TagsDisplay";
import { fetchTags } from "lib/api";
import { HOST, SITEDATA } from "lib/constant";

const postType = "grad_essay";

export const metadata: Metadata = {
  title: `${SITEDATA[postType].title}: タグ一覧`,
  description: "タグ一覧",
  openGraph: {
    title: `${SITEDATA[postType].title}: タグ一覧`,
    description: "タグ一覧",
    url: `https://${HOST}/${postType}/tags`,
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
    title: `${SITEDATA[postType].title}: タグ一覧`,
    description: "タグ一覧",
    images: encodeURI(
      `https://${HOST}/api/ogp?title=${SITEDATA[postType].title}`
    ),
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
