import SharedHead from "components/SharedHead";
import { SITEDATA, APIHOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

const postType = "blog";

const pageMetaData: PageMetaData = {
  title: SITEDATA[postType].title,
  sitename: SITEDATA[postType].title,
  description: SITEDATA[postType].description,
  ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=${SITEDATA[postType].title}`),
  pageRelPath: postType,
  pagetype: "website",
  twcardtype: "summary",
};

export default function Head() {
  return <SharedHead {...pageMetaData} />;
}
