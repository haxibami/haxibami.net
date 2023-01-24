import Footer from "components/Footer";
import PostDisplay from "components/PostDisplay";
import Header from "components/PostTopHeader";
import { fetchTags, fetchTaggedPostsData } from "lib/api";
import { COUNT_PER_PAGE } from "lib/constant";
import Styles from "styles/[tag].module.scss";

import type { PostType } from "lib/interface";

const postType: PostType = "grad_essay";

export default async function TaggedPosts({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = params;
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;

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
        id={id}
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
  return tags.map((tag) => {
    return {
      tag,
    };
  });
};
