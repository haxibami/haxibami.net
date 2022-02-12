import { NextPage, InferGetStaticPropsType } from "next";
import { BlogItem, getPostBySlug, getPostsByTag, getPostTags } from "lib/api";
import Styles from "styles/[tag].module.scss";
import { MdStrip } from "modules/parser";
import BlogHeader from "components/blogheader";
import MyHead, { MetaProps } from "components/myhead";
import { ogpHost } from "lib/ogpprops";
import Tiling from "components/tiling";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const tags: string[] = getPostTags("grad_essay");

  return {
    paths: tags.map((post) => {
      return {
        params: {
          tag: post,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const taggedposts: string[] = getPostsByTag(params.tag, "grad_essay");

  const allPostsPre = taggedposts.map((slug) => {
    return getPostBySlug(
      slug,
      ["slug", "title", "date", "tags", "content"],
      "grad_essay"
    );
  });

  const CreatePreview = async (post: BlogItem) => {
    const result = await MdStrip(post.content);
    post.content = result;
    return post;
  };

  const allPosts = await Promise.all(
    allPostsPre.map(async (item) => {
      const processed = await CreatePreview(item);
      return processed;
    })
  );

  const metaprops: MetaProps = {
    title: `タグ: #${params.tag}の卒業文集`,
    sitename: "卒業文集",
    description: `タグ: #${params.tag}を付与されたセクションの一覧`,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=タグ: %23${params.tag}の卒業文集`
    ),
    pageRelPath: `grad_essay/tag/${params.tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: { allPosts, params, metaprops },
  };
};

const TaggedPosts: NextPage<Props> = ({ allPosts, params, metaprops }) => {
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <BlogHeader />
      <main>
        <h2 className={Styles.BlogMenu}>
          <div className={Styles.CurrentFocus}>#{params.tag}</div>
        </h2>
        <Tiling allPosts={allPosts} relPath={`grad_essay/${params.tag}`} />
      </main>
      <footer></footer>
    </div>
  );
};

export default TaggedPosts;
