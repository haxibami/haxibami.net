import TagList from "components/TagList";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";
import { dateVisualizer } from "lib/front";
import { getSlugs } from "lib/fs";

const postType = "grad_essay";

export default async function ArticlePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const file = await fetchPost(`articles/${postType}`, slug);
  const { content, frontmatter } = await compiler(file);
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div>
          <span className="mr-4">{dateVisualizer(frontmatter?.date)}</span>
        </div>
        <h1>{frontmatter?.title}</h1>
        <div>
          <TagList tags={frontmatter?.tags} postType={postType} />
        </div>
      </div>
      <article className="post">{content}</article>
    </div>
  );
}

export const generateStaticParams = async () => {
  const slugs = getSlugs(`articles/${postType}`);
  return slugs.map((slug) => {
    return {
      slug,
    };
  });
};
