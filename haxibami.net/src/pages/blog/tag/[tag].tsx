import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostTop from "components/PostTop";
import Header from "components/PostTopHeader";
import {
  getPostBySlug,
  getPostsByTag,
  getPostTags,
  replaceMdwithTxt,
  readYaml,
} from "lib/api";
import { COUNT_PER_PAGE, ogpHost } from "lib/constant";
import Styles from "styles/[tag].module.scss";

import type { PageMetaProps, SiteInfo, PostType } from "lib/interface";

const postType: PostType = "blog";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const tags: string[] = getPostTags(postType);

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          tag: tag,
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
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;
  const tag = params?.tag ?? "";
  const taggedblogs: string[] = getPostsByTag(tag, postType);
  const sitename: SiteInfo = readYaml("meta.yaml");

  const allPostsPre = taggedblogs.map((slug) => {
    return getPostBySlug(
      slug,
      ["slug", "title", "date", "tags", "content"],
      postType
    );
  });

  const total = allPostsPre.length;
  const postsAssign = allPostsPre.slice(start, end);

  const posts = await Promise.all(
    postsAssign.map(async (item) => {
      const processed = await replaceMdwithTxt(item);
      return processed;
    })
  );

  const metaprops: PageMetaProps = {
    title: `タグ: #${tag}の記事`,
    sitename: sitename.siteinfo.blog.title,
    description: encodeURI(`タグ: #${tag}を付与された記事の一覧`),
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=タグ: %23${tag}の記事`),
    pageRelPath: `${postType}/tag/${tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: {
      posts,
      tag,
      id,
      total,
      perPage: COUNT_PER_PAGE,
      postType,
      metaprops,
      siteinfo: sitename,
    },
  };
};

const TaggedPosts: NextPage<Props> = (props) => {
  const { posts, tag, id, total, perPage, postType, metaprops, siteinfo } =
    props;
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <Header siteinfo={siteinfo} posttype={postType} />
      <PostTop
        top={`/${postType}/tag/${tag}`}
        postMenuTabs={[
          {
            name: `#${tag}`,
            link: `tag/${tag}`,
            focus: true,
          },
        ]}
        posts={posts}
        id={id}
        total={total}
        perPage={perPage}
        postType={postType}
      />
      <Footer />
    </div>
  );
};

export default TaggedPosts;
