import SharedHead from "components/SharedHead";
import { SITEDATA, APIHOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

const pageMetaData: PageMetaData = {
  title: "トップ",
  sitename: SITEDATA.blog.title,
  description: SITEDATA.blog.description,
  ogImageUrl: encodeURI(
    `${APIHOST}/api/ogp?title=${SITEDATA.blog.title}`
  ),
  pageRelPath: "blog",
  pagetype: "website",
  twcardtype: "summary",
};

export default function Head() {
  return <SharedHead {...pageMetaData} />;
}
