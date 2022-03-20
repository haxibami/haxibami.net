import ArticleMenu from "components/ArticleMenu";
import { PostItem, MenuTab, PostType } from "lib/interface";
import PostList from "components/PostList";
import Pager from "components/Pager";
import Styles from "./style.module.scss";

interface PostTopProps {
  top: string;
  postMenuTabs: MenuTab[];
  posts: PostItem[];
  id: number;
  total: number;
  perPage: number;
  postType: PostType;
}

const PostTop: React.VFC<PostTopProps> = (props) => {
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
