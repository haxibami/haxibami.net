import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug, replaceMdwithTxt } from "lib/api";
import { MdToHtml } from "lib/parser";
import { ogpHost } from "lib/ogpprops";
import MyHead, { MetaProps } from "components/MyHead/MyHead";
import Styles from "styles/[slug].module.scss";

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

  const description: string = (await replaceMdwithTxt(post)).content;

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
      <main>
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
