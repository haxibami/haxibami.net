import Footer from "components/Footer";
import PostDisplay from "components/PostDisplay";
import Header from "components/PostTopHeader";
import { fetchPostsData } from "lib/api";
import { COUNT_PER_PAGE, postMenuTabs } from "lib/constant";
import Styles from "styles/posttop.module.scss";

import type { PostType } from "lib/interface";

const postType: PostType = "grad_essay";

export default async function Posts() {
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;

  const postsData = await fetchPostsData("articles/grad_essay");
  const total = postsData.length;
  const assign = postsData.slice(start, end);

  return (
    <div>
      <div id={Styles.Wrapper}>
        <Header posttype={postType} />
        <PostDisplay
          top={`/${postType}`}
          postMenuTabs={postMenuTabs}
          assign={assign}
          id={id}
          total={total}
          perPage={COUNT_PER_PAGE}
          postType={postType}
        />
        <Footer />
      </div>
    </div>
  );
}
