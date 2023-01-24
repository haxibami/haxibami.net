import SharedHead from "components/SharedHead";
import { SITEDATA, APIHOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

const pageMetaData: PageMetaData = {
  title: "トップ",
  sitename: SITEDATA.grad_essay.title,
  description: SITEDATA.grad_essay.description,
  ogImageUrl: encodeURI(
    `${APIHOST}/api/ogp?title=${SITEDATA.grad_essay.title}`
  ),
  pageRelPath: "grad_essay",
  pagetype: "website",
  twcardtype: "summary",
};

export default function Head() {
  return <SharedHead {...pageMetaData} />;
}
