import SharedHead from "components/SharedHead";
import { SITEDATA, APIHOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

const postType = "blog";

export default function Head({ params }: { params: { id: string } }) {
  const { id } = params;
  const pageMetaData: PageMetaData = {
    title: `${SITEDATA[postType].title}: ページ${id}`,
    sitename: SITEDATA[postType].title,
    description: SITEDATA[postType].description,
    ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=ページ${id}`),
    pageRelPath: `${postType}/page/${id}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return <SharedHead {...pageMetaData} />;
}
