import { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostBySlug, CreatePreview, BlogItem } from "lib/api";
import { MdStrip, MdToHtml } from "modules/parser";
import Prism from "prismjs";
import Styles from "styles/[slug].module.scss";
import Link from "next/link";
import { useEffect } from "react";
import MyHead, { MetaProps } from "components/myhead";
import { ogpHost } from "lib/ogpprops";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"], "grad_essay");

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

export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(
    params.slug,
    ["slug", "title", "date", "tags", "content"],
    "grad_essay"
  );

  const content: string = await MdToHtml(post.content);

  const description: string = (await CreatePreview(post)).content;

  const metaprops: MetaProps = {
    title: post.title,
    sitename: "卒業文集",
    description: description,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=${post.title}&date=${post.date}`
    ),
    pageRelPath: `grad_essay/${post.slug}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: {
      metaprops,
      post: {
        ...post,
        content,
      },
    },
  };
};

const AllGradEssay: NextPage<Props> = ({ post, metaprops }) => {
  useEffect(() => {
    Prism.manual = true;
    Prism.highlightAll();
  });
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <header>
        <nav>
          <span>
            <Link href={"/grad_essay"}>
              <a>{"<< top"}</a>
            </Link>
          </span>
        </nav>
        <ul>
          <span className={Styles.Date}>#{post.date}</span>
          {post.tags?.map((tag) => (
            <span key={tag}>
              <Link href={`/grad_essay/tag/${tag}`}>
                <a>
                  <li>#{tag}</li>
                </a>
              </Link>
            </span>
          ))}
        </ul>
      </header>
      <main id={Styles.Main}>
        <h1 id={Styles.Title}>{post.title}</h1>
        <article>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
      <footer> </footer>
    </div>
  );
};

export default AllGradEssay;
