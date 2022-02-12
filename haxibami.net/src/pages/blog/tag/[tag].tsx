import { NextPage, InferGetStaticPropsType } from "next";
import { BlogItem, getPostBySlug, getPostsByTag, getPostTags } from "lib/api";
import Styles from "styles/[tag].module.scss";
import Link from "next/link";
import Head from "next/head";
import { MdStrip } from "modules/parser";
import BlogHeader from "components/blogheader";
import MyHead, { MetaProps } from "components/myhead";
import { ogpHost } from "lib/ogpprops";

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

  const CreatePreview = async (blog: BlogItem) => {
    const result = await MdStrip(blog.content);
    blog.content = result;
    return blog;
  };

  const allBlogs = await Promise.all(
    allBlogsPre.map(async (item) => {
      const processed = await CreatePreview(item);
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
        <h2 className={Styles.BlogMenu}>
          <div className={Styles.CurrentFocus}>#{params?.tag}</div>
        </h2>
        <ul className={Styles.ArticleList}>
          {allBlogs?.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <a>
                <li className={Styles.ArticleTile}>
                  {/*<Image
                    className={Styles.ArticleTileIcon}
                    src="/ogpicon.webp"
                    alt="haxibami logo"
                    width={80}
                    height={80}
                  />*/}
                  <div className={Styles.TilePreview}>
                    {blog.content.substring(0, 100)}
                  </div>
                  {/*<div className={Styles.TileDate}>
                    <span>{blog.date}</span>
                  </div>*/}
                  <div className={Styles.TileTitle}>
                    <h2>{blog.title}</h2>
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </main>
      <footer></footer>
    </div>
  );
};

export default TaggedBlogs;
