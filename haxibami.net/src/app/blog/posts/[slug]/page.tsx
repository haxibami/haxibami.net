import type { Metadata } from "next";

import TagList from "components/TagList";
import { fetchPost, fetchPostsData } from "lib/api";
import compiler from "lib/compiler";
import { HOST } from "lib/constant";
import { dateVisualizer } from "lib/front";
import { getSlugs } from "lib/fs";

import "katex/dist/katex.min.css";

const postType = "blog";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const postsData = await fetchPostsData(`articles/${postType}`);
  const frontmatter = postsData.find((post) => post.data?.slug === slug)?.data;
  return {
    title: `${frontmatter?.title}`,
    description: `${frontmatter?.description}`,
    openGraph: {
      title: `${frontmatter?.title}`,
      description: `${frontmatter?.description}`,
      url: `https://${HOST}/${postType}/posts/${frontmatter?.slug}`,
      type: "article",
      authors: "haxibami",
      publishedTime: frontmatter?.date,
      modifiedTime: frontmatter?.date,
      tags: frontmatter?.tags,
      images: {
        url: encodeURI(
          `https://${HOST}/api/ogp?title=${frontmatter?.title}&date=${frontmatter?.date}`
        ),
        width: 1200,
        height: 630,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${frontmatter?.title}`,
      description: `${frontmatter?.description}`,
      images: encodeURI(
        `https://${HOST}/api/ogp?title=${frontmatter?.title}&date=${frontmatter?.date}`
      ),
      site: "@haxibami",
      siteId: "1077091437517238272",
      creator: "@haxibami",
      creatorId: "1077091437517238272",
    },
  };
}

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
          <span className="mr-4 text-[color:var(--secondary)]">
            {dateVisualizer(frontmatter.date)}
          </span>
        </div>
        <h1>{frontmatter.title}</h1>
        <div>
          <TagList tags={frontmatter.tags} postType={postType} />
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
