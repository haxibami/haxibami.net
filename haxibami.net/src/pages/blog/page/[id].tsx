import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostTop from "components/PostTop";
import Header from "components/PostTopHeader";
import { replaceMdwithTxt, getAllPosts, readYaml, pageIdGen } from "lib/api";
import { ogpHost, COUNT_PER_PAGE, postMenuTabs } from "lib/constant";
import Styles from "styles/posttop.module.scss";

import type { SiteInfo, PageMetaProps, PostType } from "lib/interface";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const postType: PostType = "blog";

const Gallery: NextPage<Props> = (props) => {
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

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"], postType);
  const pages = pageIdGen(Math.ceil(posts.length / COUNT_PER_PAGE));
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
  const allPostsPre = getAllPosts(
    ["slug", "title", "date", "tags", "content"],
    postType
  );
  const total = allPostsPre.length;
  const postsAssign = allPostsPre.slice(start, end);
  const posts = await Promise.all(
    postsAssign.map(async (item) => {
      const processed = await replaceMdwithTxt(item);
      return processed;
    })
  );

  const sitename: SiteInfo = readYaml("meta.yaml");

  const metaprops: PageMetaProps = {
    title: `${sitename.siteinfo.blog.title}: ページ${id}`,
    sitename: sitename.siteinfo.blog.title,
    description: sitename.siteinfo.blog.description,
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=ページ${id}`),
    pageRelPath: `${postType}/page/${id}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: {
      posts: posts,
      id: id,
      total: total,
      perPage: COUNT_PER_PAGE,
      postType: postType,
      metaprops: metaprops,
      siteinfo: sitename,
    },
  };
};

export default Gallery;
