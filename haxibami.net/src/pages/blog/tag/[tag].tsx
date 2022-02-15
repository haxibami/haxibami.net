import { NextPage, InferGetStaticPropsType } from "next";
import {
  getPostBySlug,
  getPostsByTag,
  getPostTags,
  replaceMdwithTxt,
} from "lib/api";
import { ogpHost } from "lib/ogpprops";
import MyHead, { MetaProps } from "components/MyHead/MyHead";
import BlogHeader from "components/BlogHeader/BlogHeader";
import Tiling from "components/Tiling/Tiling";
import ArticleMenu from "components/ArticleMenu/ArticleMenu";
import Styles from "styles/[tag].module.scss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const tags: string[] = getPostTags("blog");

  return {
    paths: tags.map((blog) => {
      return {
        params: {
          tag: blog,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const taggedblogs: string[] = getPostsByTag(params.tag, "blog");

  const allBlogsPre = taggedblogs.map((slug) => {
    return getPostBySlug(
      slug,
      ["slug", "title", "date", "tags", "content"],
      "blog"
    );
  });

  const allBlogs = await Promise.all(
    allBlogsPre.map(async (item) => {
      const processed = await replaceMdwithTxt(item);
      return processed;
    })
  );

  const metaprops: MetaProps = {
    title: `タグ: #${params.tag}の記事`,
    sitename: "偽偽書",
    description: encodeURI(`タグ: #${params.tag}を付与された記事の一覧`),
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=タグ: %23${params.tag}の記事`
    ),
    pageRelPath: `blog/tag/${params.tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: { allBlogs, params, metaprops },
  };
};

const TaggedBlogs: NextPage<Props> = ({ allBlogs, params, metaprops }) => {
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <BlogHeader />
      <main>
        <ArticleMenu
          contentType={"blog"}
          tabs={[
            {
              name: `#${params.tag}`,
              link: `tag/${params.tag}`,
            },
          ]}
          focus={0}
        />
        <Tiling allPosts={allBlogs} contentTop="blog" />
      </main>
      <footer></footer>
    </div>
  );
};

export default TaggedBlogs;
