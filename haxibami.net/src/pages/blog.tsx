import { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostTags, replaceMdwithTxt } from "lib/api";
import Styles from "styles/Blog.module.scss";
import Link from "next/link";
import BlogHeader from "components/blogheader";
import MyHead, { MetaProps } from "components/myhead";
import { ogpHost } from "lib/ogpprops";
import Tiling from "components/tiling";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allBlogsPre = getAllPosts(
    ["slug", "title", "date", "tags", "content"],
    "blog"
  );

  const taglists = getPostTags("blog");

  const allBlogs = await Promise.all(
    allBlogsPre.map(async (item) => {
      const processed = await replaceMdwithTxt(item);
      return processed;
    })
  );

  const metaprops: MetaProps = {
    title: "偽偽書",
    sitename: "偽偽書",
    description: "二重否定除去",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=偽偽書`),
    pageRelPath: "blog",
    pagetype: "website",
    twcardtype: "summary",
  };

  return {
    props: { allBlogs, taglists, metaprops },
  };
};

const BlogTop: NextPage<Props> = ({ allBlogs, metaprops }) => {
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <BlogHeader />
        <main>
          <h2 className={Styles.BlogMenu}>
            <div className={Styles.CurrentFocus}>
              <Link href={"/blog"}>
                <a>Articles</a>
              </Link>
            </div>{" "}
            <div>
              <Link href={"/blog/tags"}>
                <a>Tags</a>
              </Link>
            </div>
          </h2>
          <Tiling allPosts={allBlogs} contentTop="blog" />
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default BlogTop;
