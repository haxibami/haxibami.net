import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostDisplay from "components/PostDisplay";
import Header from "components/PostTopHeader";
import { COUNT_PER_PAGE, SITEDATA, APIHOST } from "lib/constant";
import { getTags, getPostsData } from "lib/fs";
import Styles from "styles/[tag].module.scss";

import type { PageMetaData, PostType } from "lib/interface";

const postType: PostType = "blog";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const taglist = await getTags("articles/blog");

  return {
    paths: taglist.map((tag) => {
      return {
        params: {
          tag,
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

  const targetPostData = (await getPostsData("articles/blog")).flatMap((post) =>
    post.data?.tags?.includes(tag) ? post : []
  );
  const total = targetPostData.length;
  const assign = targetPostData.slice(start, end);

  return {
    props: {
      assign,
      tag,
      id,
      total,
    },
  };
};

const TaggedPosts: NextPage<Props> = (props) => {
  const { assign, tag, id, total } = props;
  const pageMetaData: PageMetaData = {
    title: `タグ: #${tag}の記事`,
    sitename: SITEDATA.blog.title,
    description: encodeURI(`タグ: #${tag}を付与された記事の一覧`),
    ogImageUrl: encodeURI(`${APIHOST}/api/ogp?title=タグ: %23${tag}の記事`),
    pageRelPath: `${postType}/tag/${tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...pageMetaData} />
      <Header posttype={postType} />
      <PostDisplay
        top={`/${postType}/tag/${tag}`}
        postMenuTabs={[
          {
            name: `#${tag}`,
            link: `tag/${tag}`,
            focus: true,
          },
        ]}
        assign={assign}
        id={id}
        total={total}
        perPage={COUNT_PER_PAGE}
        postType={postType}
      />
      <Footer />
    </div>
  );
};

export default TaggedPosts;
