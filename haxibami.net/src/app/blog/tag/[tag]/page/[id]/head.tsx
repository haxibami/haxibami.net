import SharedHead from "components/SharedHead";
import { APIHOST, SITEDATA } from "lib/constant";

import type { PageMetaData } from "lib/interface";

const postType = "blog";

export default function Head({
  params,
}: {
  params: { tag: string; id: string };
}) {
  const { tag, id } = params;
  const pageMetaData: PageMetaData = {
    title: `タグ: #${tag}の記事 - ページ${id}`,
    sitename: SITEDATA[postType].title,
    description: SITEDATA[postType].description,
    ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=ページ${id}`),
    pageRelPath: `${postType}/page/${id}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };
  return <SharedHead {...pageMetaData} />;
}
