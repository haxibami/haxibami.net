import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import {
  getPostBySlug,
  getPostsByTag,
  getPostTags,
  replaceMdwithTxt,
  readYaml,
} from "lib/api";
import type { PageMetaProps, SiteInfo } from "lib/interface";
import { ogpHost } from "lib/constant";
import MyHead from "components/MyHead";
import BlogHeader from "components/BlogHeader";
import Tiling from "components/Tiling";
import ArticleMenu from "components/ArticleMenu";
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

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag: string }>
) => {
  const { params } = context;
  const tag = params?.tag ?? "";
  const taggedblogs: string[] = getPostsByTag(tag, "blog");
  const sitename: SiteInfo = readYaml("meta.yaml");

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

  const metaprops: PageMetaProps = {
    title: `タグ: #${tag}の記事`,
    sitename: sitename.siteinfo.blog.title,
    description: encodeURI(`タグ: #${tag}を付与された記事の一覧`),
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=タグ: %23${tag}の記事`),
    pageRelPath: `blog/tag/${tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: { allBlogs, params, metaprops, sitename },
  };
};

const TaggedBlogs: NextPage<Props> = ({
  allBlogs,
  params,
  metaprops,
  sitename,
}) => {
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <BlogHeader {...sitename} />
      <main>
        <div id={Styles.MainBox}>
          <ArticleMenu
            contentType={"blog"}
            tabs={[
              {
                name: `#${params?.tag}`,
                link: `tag/${params?.tag}`,
              },
            ]}
            focus={0}
          />
          <Tiling allPosts={allBlogs} contentTop="blog" />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default TaggedBlogs;
