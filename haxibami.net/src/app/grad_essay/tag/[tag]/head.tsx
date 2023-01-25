import SharedHead from "components/SharedHead";
import { APIHOST, SITEDATA } from "lib/constant";

import type { PageMetaData } from "lib/interface";

const postType = "grad_essay";

export default function Head({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const pageMetaData: PageMetaData = {
    title: `タグ: #${tag}の卒業文集記事`,
    sitename: SITEDATA[postType].title,
    description: `タグ: #${tag}を付与されたセクションの一覧`,
    ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=タグ: ${tag}の卒業文集`),
    pageRelPath: `${postType}/tag/${tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };
  return <SharedHead {...pageMetaData} />;
}
