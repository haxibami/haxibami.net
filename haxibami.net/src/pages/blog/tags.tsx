import type { NextPage, InferGetStaticPropsType } from "next";
import { getPostTags, readYaml } from "lib/api";
import type { PageMetaProps, SiteInfo, PostType } from "lib/interface";
import { ogpHost, tagsMenuTabs } from "lib/constant";
import MyHead from "components/MyHead";
import Header from "components/PostTopHeader";
import TagsTop from "components/TagsTop";
import Footer from "components/Footer";
import Styles from "styles/tags.module.scss";

const postType: PostType = "blog";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const taglists = getPostTags(postType);

  const sitename: SiteInfo = readYaml("meta.yaml");

  const metaprops: PageMetaProps = {
    title: "タグ一覧",
    sitename: sitename.siteinfo.blog.title,
    description: "タグ別記事",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=タグ一覧`),
    pageRelPath: `${postType}/tags`,
    pagetype: "article",
    twcardtype: "summary",
  };

  return {
    props: { taglists, metaprops, siteinfo: sitename },
  };
};

const Tags: NextPage<Props> = (props) => {
  const { taglists, metaprops, siteinfo } = props;
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <Header siteinfo={siteinfo} posttype={postType} />
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
