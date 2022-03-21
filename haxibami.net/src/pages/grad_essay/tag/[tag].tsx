import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import {
  getPostBySlug,
  getPostsByTag,
  getPostTags,
  replaceMdwithTxt,
  readYaml,
} from "lib/api";
import { PageMetaProps, SiteInfo, PostType } from "lib/interface";
import { COUNT_PER_PAGE, ogpHost } from "lib/constant";
import MyHead from "components/MyHead";
import Header from "components/PostTopHeader";
import PostTop from "components/PostTop";
import Footer from "components/Footer";
import Styles from "styles/[tag].module.scss";

const postType: PostType = "grad_essay";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const tags: string[] = getPostTags(postType);

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          tag: tag,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag: string }>
) => {
  const { params } = context;
  const id = 1;
  const end = COUNT_PER_PAGE;
  const start = 0;
  const tag = params?.tag ?? "";
  const taggedposts: string[] = getPostsByTag(tag, postType);
  const sitename: SiteInfo = readYaml("meta.yaml");

  const allPostsPre = taggedposts.map((slug) => {
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

  const metaprops: PageMetaProps = {
    title: `タグ: #${tag}の卒業文集`,
    sitename: sitename.siteinfo.grad_essay.title,
    description: `タグ: #${tag}を付与されたセクションの一覧`,
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=タグ: %23${tag}の卒業文集`),
    pageRelPath: `${postType}/tag/${tag}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: {
      posts,
      tag,
      id,
      total,
      perPage: COUNT_PER_PAGE,
      postType,
      metaprops,
      siteinfo: sitename,
    },
  };
};

const TaggedPosts: NextPage<Props> = (props) => {
  const { posts, tag, id, total, perPage, postType, metaprops, siteinfo } =
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

export default TaggedPosts;
