import PostDisplay from "components/PostDisplay";
import { fetchPostsData, fetchSlugs } from "lib/api";
import { COUNT_PER_PAGE } from "lib/constant";
import { pageIdGen } from "lib/fs";

const postType = "grad_essay";

export default async function Posts({ params }: { params: { id: string } }) {
  const { id } = params;
  const pageId = parseInt(id ?? ``, 10);
  const end = COUNT_PER_PAGE * pageId;
  const start = end - COUNT_PER_PAGE;

  const postsData = await fetchPostsData(`articles/${postType}`);
  const total = postsData.length;
  const assign = postsData.slice(start, end);

  return (
    <PostDisplay
      title={undefined}
      topPath={`/${postType}`}
      assign={assign}
      id={pageId}
      total={total}
      perPage={COUNT_PER_PAGE}
      postType={postType}
    />
  );
}

export const generateStaticParams = async () => {
  const slugs = await fetchSlugs(`articles/${postType}`);
  const pages = pageIdGen(Math.ceil(slugs.length / COUNT_PER_PAGE));
  return pages.map((page) => ({
    id: `${page}`,
  }));
};
