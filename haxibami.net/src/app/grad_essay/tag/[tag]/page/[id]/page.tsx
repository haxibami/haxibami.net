import Footer from "components/Footer";
import PostDisplay from "components/PostDisplay";
import Header from "components/PostTopHeader";
import { fetchTags, fetchTaggedPostsData } from "lib/api";
import { COUNT_PER_PAGE } from "lib/constant";
import { pageIdGen } from "lib/fs";
import Styles from "styles/posttop.module.scss";

import type { PostType } from "lib/interface";

const postType: PostType = "grad_essay";

export default async function TaggedPosts({
  params,
}: {
  params: { tag: string; id: string };
}) {
  const { tag, id } = params;
  const pageId = parseInt(id ?? ``, 10);
  const end = COUNT_PER_PAGE * pageId;
  const start = end - COUNT_PER_PAGE;

  const taggedPostsData = await fetchTaggedPostsData(
    "articles/grad_essay",
    tag
  );
  const total = taggedPostsData.length;
  const assign = taggedPostsData.slice(start, end);
  return (
    <div id={Styles.Wrapper}>
      <Header posttype={postType} />
      <PostDisplay
        top={`/${postType}/tag/${tag}`}
        postMenuTabs={[
          {
            name: `#${tag}`,
            link: `tag/${tag}`,
            focus: true,
          },
        ]}
        assign={assign}
        id={pageId}
        total={total}
        perPage={COUNT_PER_PAGE}
        postType={postType}
      />
      <Footer />
    </div>
  );
}

export const generateStaticParams = async () => {
  const tags = await fetchTags("articles/grad_essay");
  const paths = await Promise.all(
    tags.map(async (tag) => {
      const taggedPostsData = await fetchTaggedPostsData(
        "articles/grad_essay",
        tag
      );
      const pages = pageIdGen(
        Math.ceil(taggedPostsData.length / COUNT_PER_PAGE)
      );
      return pages.map((id) => ({
        tag,
        id: `${id}`,
      }));
    })
  );
  return paths.flat();
};
