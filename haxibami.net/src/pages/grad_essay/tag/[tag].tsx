import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostTop from "components/PostTop";
import Header from "components/PostTopHeader";
import { COUNT_PER_PAGE, SITEDATA, OGPHOST } from "lib/constant";
import { getPostsData, getTags } from "lib/fs";
import Styles from "styles/[tag].module.scss";

import type { PageMetaData, PostType } from "lib/interface";

const postType: PostType = "grad_essay";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const taglist = await getTags("articles/grad_essay");

  return {
    paths: taglist.map((tag) => {
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
    title: `タグ: #${tag}の卒業文集`,
    sitename: SITEDATA.grad_essay.title,
    description: `タグ: #${tag}を付与されたセクションの一覧`,
    ogImageUrl: encodeURI(`${OGPHOST}/api/ogp?title=タグ: %23${tag}の卒業文集`),
    pageRelPath: `${postType}/tag/${tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return (
    <div id={Styles.Wrapper}>
      <MyHead {...pageMetaData} />
      <Header posttype={postType} />
      <PostTop
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
