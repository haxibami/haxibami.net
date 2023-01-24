import SharedHead from "components/SharedHead";
import { fetchPostsData } from "lib/api";
import { SITEDATA, APIHOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

export default async function Head({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postsData = await fetchPostsData("articles/blog");
  const frontmatter = postsData.find((post) => post.data?.slug === slug)?.data;
  const pageMetaData: PageMetaData = {
    title: `${frontmatter?.title}`,
    sitename: SITEDATA.blog.title,
    description: `${frontmatter?.description}`,
    ogImageUrl: encodeURI(
      `${APIHOST}/api/ogp?title=${frontmatter?.title}&date=${frontmatter?.date}`
    ),
    pageRelPath: `blog/posts/${frontmatter?.slug}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };
  return (
    <>
      <SharedHead {...pageMetaData} />
      <link
        rel="stylesheet"
        // @ts-expect-error 2322
        // see: https://beta.nextjs.org/docs/api-reference/file-conventions/head#supported-head-tags
        precedence="default"
        href="https://unpkg.com/katex/dist/katex.min.css"
        crossOrigin="anonymous"
      />
    </>
  );
}
