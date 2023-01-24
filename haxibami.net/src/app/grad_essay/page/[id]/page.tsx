import Footer from "components/Footer";
import PostDisplay from "components/PostDisplay";
import Header from "components/PostTopHeader";
import { fetchPostsData, fetchSlugs } from "lib/api";
import { COUNT_PER_PAGE, postMenuTabs } from "lib/constant";
import { pageIdGen } from "lib/fs";
import Styles from "styles/posttop.module.scss";

import type { PostType } from "lib/interface";

const postType: PostType = "grad_essay";

export default async function Posts({ params }: { params: { id: string } }) {
  const { id } = params;
  const pageId = parseInt(id ?? ``, 10);
  const end = COUNT_PER_PAGE * pageId;
  const start = end - COUNT_PER_PAGE;

  const postsData = await fetchPostsData("articles/grad_essay");
  const total = postsData.length;
  const assign = postsData.slice(start, end);

  return (
    <div id={Styles.Wrapper}>
      <Header posttype={postType} />
      <PostDisplay
        top={`/${postType}`}
        postMenuTabs={postMenuTabs}
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
  const slugs = await fetchSlugs("articles/grad_essay");
  const pages = pageIdGen(Math.ceil(slugs.length / COUNT_PER_PAGE));
  return pages.map((page) => ({
    id: `${page}`,
  }));
};
