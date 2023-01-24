import SharedHead from "components/SharedHead";
import { APIHOST, SITEDATA } from "lib/constant";

import type { PageMetaData } from "lib/interface";

export default function Head({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const pageMetaData: PageMetaData = {
    title: `タグ: #${tag}の記事`,
    sitename: SITEDATA.blog.title,
    description: `タグ: #${tag}を付与された記事の一覧`,
    ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=タグ: ${tag}の記事`),
    pageRelPath: `blog/tag/${tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };
  return <SharedHead {...pageMetaData} />;
}
