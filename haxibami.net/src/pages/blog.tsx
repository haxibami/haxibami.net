import type { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostTags, replaceMdwithTxt, readYaml } from "lib/api";
import type { PageMetaProps, SiteInfo, PostType } from "lib/interface";
import { COUNT_PER_PAGE, ogpHost, postMenuTabs } from "lib/constant";
import MyHead from "components/MyHead";
import Header from "components/PostTopHeader";
import PostTop from "components/PostTop";
import Footer from "components/Footer";
import Styles from "styles/posttop.module.scss";

const postType: PostType = "blog";

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
  const postsAssign = allPostsPre.slice(start, end);

  const taglists = getPostTags(postType);

  const posts = await Promise.all(
    postsAssign.map(async (item) => {
      const processed = await replaceMdwithTxt(item);
      return processed;
    })
  );

  const sitename: SiteInfo = readYaml("meta.yaml");

  const metaprops: PageMetaProps = {
    title: sitename.siteinfo.blog.title,
    sitename: sitename.siteinfo.blog.title,
    description: sitename.siteinfo.blog.description,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=${sitename.siteinfo.blog.title}`
    ),
    pageRelPath: "blog",
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

const BlogTop: NextPage<Props> = (props) => {
  const { posts, id, total, perPage, postType, metaprops, siteinfo } = props;
  return (
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
  );
};

export default BlogTop;
