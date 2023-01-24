import SharedHead from "components/SharedHead";
import { APIHOST, SITEDATA } from "lib/constant";

import type { PageMetaData } from "lib/interface";

export default function Head() {
  const pageMetaData: PageMetaData = {
    title: "タグ一覧",
    sitename: SITEDATA.grad_essay.title,
    description: "タグ別記事",
    ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=タグ一覧`),
    pageRelPath: "grad_essay/tags",
    pagetype: "article",
    twcardtype: "summary",
  };
  return <SharedHead {...pageMetaData} />;
}
