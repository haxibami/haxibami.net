import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts, getPostTags, replaceMdwithTxt } from "lib/api";
import { ogpHost } from "lib/ogpprops";
import MyHead, { MetaProps } from "components/MyHead/MyHead";
import BlogHeader from "components/BlogHeader/BlogHeader";
import Tiling from "components/Tiling/Tiling";
import ArticleMenu, { MenuTab } from "components/ArticleMenu/ArticleMenu";
import Styles from "styles/blog.module.scss";

const tabs: MenuTab[] = [
  {
    name: "Articles",
    link: "",
  },
  {
    name: "Tags",
    link: "tags",
  },
];

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
          <ArticleMenu contentType={"blog"} tabs={tabs} focus={0} />
          <Tiling allPosts={allBlogs} contentTop="blog" />
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default BlogTop;
