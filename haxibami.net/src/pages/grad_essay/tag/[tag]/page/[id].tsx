import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";

import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostTop from "components/PostTop";
import Header from "components/PostTopHeader";
import { SITEDATA, OGPHOST, COUNT_PER_PAGE } from "lib/constant";
import { pageIdGen, getTags, getPostsData } from "lib/fs";
import Styles from "styles/posttop.module.scss";

import type { PageMetaData, PostType } from "lib/interface";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const postType: PostType = "grad_essay";

const TaggedPostsGallery: NextPage<Props> = (props) => {
  const { assign, id, tag, total } = props;
  const pageMetaData: PageMetaData = {
    title: `タグ: #${tag}の記事 - ページ${id}`,
    sitename: SITEDATA.grad_essay.title,
    description: SITEDATA.grad_essay.description,
    ogImageUrl: encodeURI(`${OGPHOST}/api/ogp?title=ページ${id}`),
    pageRelPath: `${postType}/page/${id}`,
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

export const getStaticPaths = async () => {
  const postsData = await getPostsData("articles/grad_essay");
  const taglist = await getTags("articles/grad_essay");
  const paths: { params: { tag: string; id: string } }[] = [];
  taglist.forEach((tag) => {
    const targetPostData = postsData.flatMap((post) =>
      post.data?.tags?.includes(tag) ? post : []
    );
    const pages = pageIdGen(Math.ceil(targetPostData.length / COUNT_PER_PAGE));
    const subpaths = pages.map((page) => ({
      params: { tag: tag, id: `${page}` },
    }));
    paths.push(...subpaths);
  });

  return { paths: paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag: string; id: string }>
) => {
  const { params } = context;
  const tag = params?.tag ?? ``;
  const id = parseInt(params?.id ?? ``, 10);
  const end = COUNT_PER_PAGE * id;
  const start = end - COUNT_PER_PAGE;

  const targetPostData = (await getPostsData("articles/grad_essay")).flatMap(
    (post) => (post.data?.tags?.includes(tag) ? post : [])
  );
  const total = targetPostData.length;
  const assign = targetPostData.slice(start, end);

  return {
    props: {
      assign,
      id,
      tag,
      total,
    },
  };
};

export default TaggedPostsGallery;
