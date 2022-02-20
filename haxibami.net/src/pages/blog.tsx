import { NextPage, InferGetStaticPropsType } from "next";
import {
  getAllPosts,
  getPostTags,
  replaceMdwithTxt,
  SiteInfo,
  readYaml,
} from "lib/api";
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

  const meta: SiteInfo = readYaml("meta.yaml");

  const metaprops: MetaProps = {
    title: "トップ",
    sitename: meta.siteinfo.blog.title,
    description: meta.siteinfo.blog.description,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=${meta.siteinfo.blog.title}`
    ),
    pageRelPath: "blog",
    pagetype: "website",
    twcardtype: "summary",
  };

  return {
    props: { allBlogs, taglists, metaprops, meta },
  };
};

const BlogTop: NextPage<Props> = ({ allBlogs, metaprops, meta }) => {
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <BlogHeader {...meta} />
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
