import type { NextPage, InferGetStaticPropsType } from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import Header from "components/PostTopHeader";
import TagsTop from "components/TagsTop";
import { SITEDATA, OGPHOST, tagsMenuTabs } from "lib/constant";
import { getTags } from "lib/fs";
import Styles from "styles/tags.module.scss";

import type { PageMetaData, PostType } from "lib/interface";

const postType: PostType = "blog";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const taglists = await getTags("articles/blog");

  return {
    props: { taglists },
  };
};

const Tags: NextPage<Props> = (props) => {
  const { taglists } = props;
  const pageMetaData: PageMetaData = {
    title: "タグ一覧",
    sitename: SITEDATA.blog.title,
    description: "タグ別記事",
    ogImageUrl: encodeURI(`${OGPHOST}/api/ogp?title=タグ一覧`),
    pageRelPath: `${postType}/tags`,
    pagetype: "article",
    twcardtype: "summary",
  };
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...pageMetaData} />
        <Header posttype={postType} />
        <TagsTop
          tagsMenuTabs={tagsMenuTabs}
          taglists={taglists}
          postType={postType}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Tags;
