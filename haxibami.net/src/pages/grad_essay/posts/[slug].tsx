import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import {
  getAllPosts,
  getPostBySlug,
  replaceMdwithTxt,
  readYaml,
  SiteInfo,
} from "lib/api";
import { MdToHtml, HtmlToReact } from "lib/parser";
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

  const sitename: SiteInfo = readYaml("meta.yaml");

  const metaprops: MetaProps = {
    title: post.title,
    sitename: sitename.siteinfo.grad_essay.title,
    description: description,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=${post.title}&date=${post.date}`
    ),
    pageRelPath: `grad_essay/posts/${post.slug}`,
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

const AllGradEssay: NextPage<Props> = ({ metaprops, post, content }) => {
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
        <article>{HtmlToReact(content)}</article>
      </main>
      <footer> </footer>
    </div>
  );
};

export default AllGradEssay;
