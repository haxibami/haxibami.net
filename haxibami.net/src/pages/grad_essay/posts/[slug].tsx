import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import Link from "next/link";

import { MDXRemote } from "next-mdx-remote";

import MdxComponent from "components/MdxComponent";
import MyHead from "components/MyHead";
import TagList from "components/TagList";
import { compileMdx } from "lib/compile";
import { OGPHOST, SITEDATA } from "lib/constant";
import { dateVisualizer } from "lib/front";
import { getSlugs, getPost } from "lib/fs";
import Styles from "styles/[slug].module.scss";

import type { PageMetaData } from "lib/interface";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const slugs = getSlugs("articles/grad_essay");

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

  const file = getPost(slug, "articles/grad_essay");

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

const AllGradEssay: NextPage<Props> = ({ mdxSource }) => {
  const frontmatter = mdxSource.frontmatter;
  const pageMetaData: PageMetaData = {
    title: `${frontmatter?.title}`,
    sitename: SITEDATA.grad_essay.title,
    description: `{${frontmatter?.description}`,
    ogImageUrl: encodeURI(
      `${OGPHOST}/api/ogp?title=${frontmatter?.title}&date=${frontmatter?.date}`
    ),
    pageRelPath: `grad_essay/posts/${frontmatter?.slug}`,
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
              <Link href={"/grad_essay"}>
                <h2>{"卒業文集"}</h2>
              </Link>
            </div>
          </div>
          <div>
            <span className={Styles.Date}>
              {dateVisualizer(frontmatter?.date)}
            </span>
          </div>
          <div>
            <TagList tags={frontmatter?.tags} postType={"grad_essay"} />
          </div>
          <h1 id={Styles.Title}>{frontmatter?.title}</h1>
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

export default AllGradEssay;
