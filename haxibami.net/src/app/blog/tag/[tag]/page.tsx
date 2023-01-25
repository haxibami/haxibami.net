import PostDisplay from "components/PostDisplay";
import { fetchTags, fetchTaggedPostsData } from "lib/api";
import { COUNT_PER_PAGE } from "lib/constant";

const postType = "blog";

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
    `articles/${postType}`,
    tag
  );

  const total = taggedPostsData.length;
  const assign = taggedPostsData.slice(start, end);
  return (
    <PostDisplay
      title={`# ${tag}`}
      topPath={`/${postType}/tag/${tag}`}
      assign={assign}
      id={id}
      total={total}
      perPage={COUNT_PER_PAGE}
      postType={postType}
    />
  );
}

export const generateStaticParams = async () => {
  const tags = await fetchTags(`articles/${postType}`);
  return tags.map((tag) => {
    return {
      tag,
    };
  });
};
