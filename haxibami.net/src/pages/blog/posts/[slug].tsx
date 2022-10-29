import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import Link from "next/link";

import MyHead from "components/MyHead";
import TagList from "components/TagList";
import ThemeChanger from "components/ThemeChanger";
import {
  getAllPosts,
  getPostBySlug,
  replaceMdwithTxt,
  readYaml,
} from "lib/api";
import { ogpHost } from "lib/constant";
import { dateVisualizer } from "lib/front";
import { MdToHtml } from "lib/parser";
import RehypeReact from "lib/rehype-react";
import Styles from "styles/[slug].module.scss";

import type { PageMetaProps, SiteInfo } from "lib/interface";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"], "blog");

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const { params } = context;
  const slug = params?.slug ?? "";
  const post = getPostBySlug(
    slug,
    ["slug", "title", "date", "tags", "content"],
    "blog"
  );

  const content = await MdToHtml(post.content);

  const description = (await replaceMdwithTxt(post)).content.substring(0, 300);

  const sitename: SiteInfo = readYaml("meta.yaml");

  const metaprops: PageMetaProps = {
    title: post.title,
    sitename: sitename.siteinfo.blog.title,
    description: description,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=${post.title}&date=${post.date}`
    ),
    pageRelPath: `blog/posts/${post.slug}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: {
      metaprops,
      post,
      content,
    },
  };
};

const AllBlog: NextPage<Props> = ({ metaprops, post, content }) => {
  return (
    <div id={Styles.Wrapper}>
      <div id={Styles.Container}>
        <MyHead {...metaprops} />
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/katex/dist/katex.min.css"
            crossOrigin="anonymous"
          />
        </Head>
        <header>
          <div className={Styles.Title}>
            <div className={Styles.TopLink}>
              <Link href={"/blog"}>
                <h2>{"Raw, Warm, Tasty"}</h2>
              </Link>
            </div>
            <ThemeChanger />
          </div>
          <div>
            <span className={Styles.Date}>{dateVisualizer(post.date)}</span>
          </div>
          <div>
            <TagList tags={post.tags} postType={"blog"} />
          </div>
          <h1 id={Styles.Title}>{post.title}</h1>
        </header>
        <main>
          <article>{RehypeReact(content)}</article>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default AllBlog;
