import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostTop from "components/PostTop";
import Header from "components/PostTopHeader";
import { SITEDATA, OGPHOST, COUNT_PER_PAGE, postMenuTabs } from "lib/constant";
import { pageIdGen, getPostsData, getSlugs } from "lib/fs";
import Styles from "styles/posttop.module.scss";

import type { PageMetaData, PostType } from "lib/interface";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const postType: PostType = "blog";

const Gallery: NextPage<Props> = (props) => {
  const { assign, id, total } = props;
  const pageMetaData: PageMetaData = {
    title: `${SITEDATA.blog.title}: ページ${id}`,
    sitename: SITEDATA.blog.title,
    description: SITEDATA.blog.description,
    ogImageUrl: encodeURI(`${OGPHOST}/api/ogp?title=ページ${id}`),
    pageRelPath: `${postType}/page/${id}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...pageMetaData} />
        <Header posttype={postType} />
        <PostTop
          top={`/${postType}`}
          postMenuTabs={postMenuTabs}
          assign={assign}
          id={id}
          total={total}
          perPage={COUNT_PER_PAGE}
          postType={postType}
        />
        <Footer />
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const slugs = getSlugs("articles/blog");
  const pages = pageIdGen(Math.ceil(slugs.length / COUNT_PER_PAGE));
  const paths = pages.map((page) => ({
    params: { id: `${page}` },
  }));

  return { paths: paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const { params } = context;
  const id = parseInt(params?.id ?? ``, 10);
  const end = COUNT_PER_PAGE * id;
  const start = end - COUNT_PER_PAGE;

  const postsInfo = await getPostsData("articles/blog");
  const total = postsInfo.length;
  const assign = postsInfo.slice(start, end);

  return {
    props: {
      assign,
      id,
      total,
    },
  };
};

export default Gallery;
