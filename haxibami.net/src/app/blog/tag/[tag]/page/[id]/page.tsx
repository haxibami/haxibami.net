import PostDisplay from "components/PostDisplay";
import { fetchTags, fetchTaggedPostsData } from "lib/api";
import { COUNT_PER_PAGE } from "lib/constant";
import { pageIdGen } from "lib/fs";

const postType = "blog";

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
      id={pageId}
      total={total}
      perPage={COUNT_PER_PAGE}
      postType={postType}
    />
  );
}

export const generateStaticParams = async () => {
  const tags = await fetchTags(`articles/${postType}`);
  const paths = await Promise.all(
    tags.map(async (tag) => {
      const taggedPostsData = await fetchTaggedPostsData(
        `articles/${postType}`,
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
