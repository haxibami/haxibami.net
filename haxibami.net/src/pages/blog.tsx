import type { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostTags, replaceMdwithTxt, readYaml } from "lib/api";
import type { PageMetaProps, MenuTab, SiteInfo } from "lib/interface";
import { ogpHost } from "lib/constant";
import MyHead from "components/MyHead";
import BlogHeader from "components/BlogHeader";
import Tiling from "components/Tiling";
import ArticleMenu from "components/ArticleMenu";
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

  const metaprops: PageMetaProps = {
    title: meta.siteinfo.blog.title,
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
          <div id={Styles.MainBox}>
            <ArticleMenu contentType={"blog"} tabs={tabs} focus={0} />
            <Tiling allPosts={allBlogs} contentTop="blog" />
          </div>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default BlogTop;
