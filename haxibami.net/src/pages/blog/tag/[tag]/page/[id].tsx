import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";


import Footer from "components/Footer";
import MyHead from "components/MyHead";
import PostTop from "components/PostTop";
import Header from "components/PostTopHeader";
import {
  replaceMdwithTxt,
  readYaml,
  pageIdGen,
  getPostTags,
  getPostsByTag,
  getPostBySlug,
} from "lib/api";
import { ogpHost, COUNT_PER_PAGE } from "lib/constant";
import Styles from "styles/posttop.module.scss";

import type { SiteInfo, PageMetaProps, PostType } from "lib/interface";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const postType: PostType = "blog";

const TaggedPostsGallery: NextPage<Props> = (props) => {
  const { posts, id, tag, total, perPage, postType, metaprops, siteinfo } =
    props;
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <Header siteinfo={siteinfo} posttype={postType} />
      <PostTop
        top={`/${postType}/tag/${tag}`}
        postMenuTabs={[
          {
            name: `#${tag}`,
            link: `tag/${tag}`,
            focus: true,
          },
        ]}
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

export const getStaticPaths = async () => {
  const tags = getPostTags(postType);
  const paths: { params: { tag: string; id: string } }[] = [];
  tags.forEach((tag) => {
    const posts = getPostsByTag(tag, postType);
    const pages = pageIdGen(Math.ceil(posts.length / COUNT_PER_PAGE));
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
  const taggedslugs = getPostsByTag(tag, postType);
  const allPostsPre = taggedslugs.map((slug) => {
    return getPostBySlug(
      slug,
      ["slug", "title", "date", "tags", "content"],
      postType
    );
  });
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
    title: `タグ: #${tag}の記事 - ページ${id}`,
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
      tag: tag,
      total: total,
      perPage: COUNT_PER_PAGE,
      postType: postType,
      metaprops: metaprops,
      siteinfo: sitename,
    },
  };
};

export default TaggedPostsGallery;
