import type { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostTags, replaceMdwithTxt, readYaml } from "lib/api";
import type { PageMetaProps, SiteInfo, PostType } from "lib/interface";
import { COUNT_PER_PAGE, ogpHost, postMenuTabs } from "lib/constant";
import MyHead from "components/MyHead";
import Header from "components/PostTopHeader";
import PostTop from "components/PostTop";
import Footer from "components/Footer";
import Styles from "styles/posttop.module.scss";

const postType: PostType = "grad_essay";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;
  const allPostsPre = getAllPosts(
    ["slug", "title", "date", "tags", "content"],
    postType
  );

  const total = allPostsPre.length;
  const postAssign = allPostsPre.slice(start, end);

  const taglists = getPostTags(postType);

  const posts = await Promise.all(
    postAssign.map(async (item) => {
      const processed = await replaceMdwithTxt(item);
      return processed;
    })
  );

  const sitename: SiteInfo = readYaml("meta.yaml");

  const metaprops: PageMetaProps = {
    title: "トップ",
    sitename: sitename.siteinfo.grad_essay.title,
    description: sitename.siteinfo.grad_essay.description,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=${sitename.siteinfo.grad_essay.title}`
    ),
    pageRelPath: "grad_essay",
    pagetype: "website",
    twcardtype: "summary",
  };

  return {
    props: {
      posts,
      taglists,
      id,
      total,
      perPage: COUNT_PER_PAGE,
      postType,
      metaprops,
      siteinfo: sitename,
    },
  };
};

const GradEssayTop: NextPage<Props> = (props) => {
  const { posts, id, total, perPage, postType, metaprops, siteinfo } = props;
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <Header siteinfo={siteinfo} posttype={postType} />
        <PostTop
          top={`/${postType}`}
          postMenuTabs={postMenuTabs}
          posts={posts}
          id={id}
          total={total}
          perPage={perPage}
          postType={postType}
        />
        <Footer />
      </div>
    </div>
  );
};

export default GradEssayTop;
