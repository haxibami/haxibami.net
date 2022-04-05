import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import Head from "next/head";
import {
  getAllPosts,
  getPostBySlug,
  replaceMdwithTxt,
  readYaml,
} from "lib/api";
import { dateVisualizer } from "lib/front";
import { MdToHtml } from "lib/parser";
import { HtmlToReact } from "lib/rehype-react";
import type { PageMetaProps, SiteInfo } from "lib/interface";
import { ogpHost } from "lib/constant";
import MyHead from "components/MyHead";
import TagList from "components/TagList";
import Styles from "styles/[slug].module.scss";
import ThemeChanger from "components/ThemeChanger";

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
            href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
            integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
            crossOrigin="anonymous"
          />
        </Head>
        <header>
          <div className={Styles.Title}>
            <div className={Styles.TopLink}>
              <Link href={"/blog"}>
                <a>
                  <h2>{"Raw, Warm, Tasty"}</h2>
                </a>
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
          <article>{HtmlToReact(content)}</article>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default AllBlog;
