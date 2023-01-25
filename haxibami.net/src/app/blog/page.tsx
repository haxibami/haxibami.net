import PostDisplay from "components/PostDisplay";
import { fetchPostsData } from "lib/api";
import { COUNT_PER_PAGE } from "lib/constant";

const postType = "blog";

export default async function Posts() {
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;

  const postsData = await fetchPostsData(`articles/${postType}`);
  const total = postsData.length;
  const assign = postsData.slice(start, end);

  return (
    <PostDisplay
      title={undefined}
      topPath={`/${postType}`}
      assign={assign}
      id={id}
      total={total}
      perPage={COUNT_PER_PAGE}
      postType={postType}
    />
  );
}
