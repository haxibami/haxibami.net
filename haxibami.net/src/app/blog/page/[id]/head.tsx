import SharedHead from "components/SharedHead";
import { SITEDATA, APIHOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

const postType = "blog" as const;

export default function Head({ params }: { params: { id: string } }) {
  const { id } = params;
  const pageMetaData: PageMetaData = {
    title: `${SITEDATA.blog.title}: ページ${id}`,
    sitename: SITEDATA.blog.title,
    description: SITEDATA.blog.description,
    ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=ページ${id}`),
    pageRelPath: `${postType}/page/${id}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return <SharedHead {...pageMetaData} />;
}
