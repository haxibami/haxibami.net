import type { NextPage, InferGetStaticPropsType } from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostTop from "components/PostTop";
import Header from "components/PostTopHeader";
import { COUNT_PER_PAGE, SITEDATA, OGPHOST, postMenuTabs } from "lib/constant";
import { getPostsData } from "lib/fs";
import Styles from "styles/posttop.module.scss";

import type { PageMetaData, PostType } from "lib/interface";

const postType: PostType = "blog";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;

  const postsData = await getPostsData("articles/blog");
  const total = postsData.length;
  const assign = postsData.slice(start, end);

  return {
    props: {
      assign,
      id,
      total,
    },
  };
};

const BlogTop: NextPage<Props> = (props) => {
  const { assign, id, total } = props;
  const pageMetaData: PageMetaData = {
    title: SITEDATA.blog.title,
    sitename: SITEDATA.blog.title,
    description: SITEDATA.blog.description,
    ogImageUrl: encodeURI(`${OGPHOST}/api/ogp?title=${SITEDATA.blog.title}`),
    pageRelPath: "blog",
    pagetype: "website",
    twcardtype: "summary",
  };

  return (
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
  );
};

export default BlogTop;
