import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import Link from "next/link";

import { MDXRemote } from "next-mdx-remote";

import MdxComponent from "components/MDXComponent";
import MyHead from "components/MyHead";
import TagList from "components/TagList";
import { compileMdx } from "lib/compile";
import { SITEDATA, APIHOST } from "lib/constant";
import { dateVisualizer } from "lib/front";
import { getSlugs, getPost } from "lib/fs";
import Styles from "styles/[slug].module.scss";

import type { PageMetaData } from "lib/interface";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const slugs = getSlugs("articles/blog");

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
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

  const file = getPost(slug, "articles/blog");

  const mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, any>
  > = await compileMdx(file);

  return {
    props: {
      mdxSource,
    },
  };
};

const Blog: NextPage<Props> = ({ mdxSource }) => {
  const frontmatter = mdxSource.frontmatter;
  const pageMetaData: PageMetaData = {
    title: `${frontmatter?.title}`,
    sitename: SITEDATA.blog.title,
    description: `${frontmatter?.description}`,
    ogImageUrl: encodeURI(
      `${APIHOST}/api/ogp?title=${frontmatter?.title}&date=${frontmatter?.date}`
    ),
    pageRelPath: `blog/posts/${frontmatter?.slug}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };
  return (
    <div id={Styles.Wrapper}>
      <div id={Styles.Container}>
        <MyHead {...pageMetaData} />
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
                <h2>{SITEDATA.blog.title}</h2>
              </Link>
            </div>
          </div>
          <div>
            <span className={Styles.Date}>
              {dateVisualizer(frontmatter?.date)}
            </span>
          </div>
          <div>
            <TagList tags={frontmatter?.tags} postType={"blog"} />
          </div>
          <h1 id={Styles.Title}>{mdxSource.frontmatter?.title}</h1>
        </header>
        <main>
          <article>
            <MDXRemote {...mdxSource} components={MdxComponent} />
          </article>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Blog;
