import SharedHead from "components/SharedHead";
import { APIHOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

export default async function Head() {
  const pageMetaData: PageMetaData = {
    title: "私について",
    sitename: "haxibami.net",
    description: "プロフィール",
    ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=私について`),
    pageRelPath: "about",
    pagetype: "article",
    twcardtype: "summary_large_image",
  };
  return <SharedHead {...pageMetaData} />;
}
