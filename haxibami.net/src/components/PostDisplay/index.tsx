import Pager from "components/Pager";
import PostList from "components/PostList";

import type { PostData, PostType } from "lib/interface";

interface PostDisplayProps {
  title: string | undefined;
  topPath: string;
  assign: PostData[];
  id: number;
  total: number;
  perPage: number;
  postType: PostType;
}

const PostDisplay: React.FC<PostDisplayProps> = (props) => {
  const { title, topPath, assign, id, total, perPage, postType } = props;
  return (
    <div className="flex w-full grow flex-col gap-8">
      {title ? (
        <h1 className="before:text-[color:var(--link)] before:content-['#_']">
          {title}
        </h1>
      ) : null}
      <PostList assign={assign} postType={postType} />
      <Pager
        topPath={topPath}
        total={total}
        page={id}
        perPage={perPage}
        postType={postType}
      />
    </div>
  );
};

export default PostDisplay;
