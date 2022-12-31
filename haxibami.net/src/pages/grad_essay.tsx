import type { NextPage, InferGetStaticPropsType } from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostTop from "components/PostTop";
import Header from "components/PostTopHeader";
import { SITEDATA, COUNT_PER_PAGE, OGPHOST, postMenuTabs } from "lib/constant";
import { getPostsData } from "lib/fs";
import Styles from "styles/posttop.module.scss";

import type { PageMetaData, PostType } from "lib/interface";

const postType: PostType = "grad_essay";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;

  const postsInfo = await getPostsData("articles/grad_essay");
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

const GradEssayTop: NextPage<Props> = (props) => {
  const { assign, id, total } = props;
  const pageMetaData: PageMetaData = {
    title: "トップ",
    sitename: SITEDATA.grad_essay.title,
    description: SITEDATA.grad_essay.description,
    ogImageUrl: encodeURI(
      `${OGPHOST}/api/ogp?title=${SITEDATA.grad_essay.title}`
    ),
    pageRelPath: "grad_essay",
    pagetype: "website",
    twcardtype: "summary",
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

export default GradEssayTop;
