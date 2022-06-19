

import ArticleMenu from "components/ArticleMenu";
import Pager from "components/Pager";
import PostList from "components/PostList";

import Styles from "./style.module.scss";

import type { PostItem, MenuTab, PostType } from "lib/interface";
import "@fortawesome/fontawesome-svg-core/styles.css";

interface PostTopProps {
  top: string;
  postMenuTabs: MenuTab[];
  posts: PostItem[];
  id: number;
  total: number;
  perPage: number;
  postType: PostType;
}

const PostTop: React.FC<PostTopProps> = (props) => {
  const { top, postMenuTabs, posts, id, total, perPage, postType } = props;
  return (
    <main id={Styles.Main}>
      <div id={Styles.MainBox}>
        <ArticleMenu contentType={postType} tabs={postMenuTabs} />
        <PostList posts={posts} postType={postType} />
        <Pager
          top={top}
          total={total}
          page={id}
          perPage={perPage}
          postType={postType}
        />
      </div>
    </main>
  );
};

export default PostTop;
