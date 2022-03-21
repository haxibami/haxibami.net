import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import {
  getAllPosts,
  getPostBySlug,
  replaceMdwithTxt,
  readYaml,
} from "lib/api";
import { dateVisualizer } from "lib/front";
import type { PageMetaProps, SiteInfo } from "lib/interface";
import { ogpHost } from "lib/constant";
import { MdToHtml } from "lib/parser";
import { HtmlToReact } from "lib/rehype-react";
import MyHead from "components/MyHead";
import TagList from "components/TagList";
import Styles from "styles/[slug].module.scss";
import ThemeChanger from "components/ThemeChanger";

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

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const { params } = context;
  const slug = params?.slug ?? "";
  const post = getPostBySlug(
    slug,
    ["slug", "title", "date", "tags", "content"],
    "grad_essay"
  );

  const content: string = await MdToHtml(post.content);

  const description: string = (await replaceMdwithTxt(post)).content;

  const sitename: SiteInfo = readYaml("meta.yaml");

  const metaprops: PageMetaProps = {
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
          <span className={Styles.TopLink}>
            <Link href={"/grad_essay"}>
              <a>
                <h2>{"卒業文集"}</h2>
              </a>
            </Link>
          </span>
          <ThemeChanger />
        </nav>
        <div>
          <span className={Styles.Date}>{dateVisualizer(post.date)}</span>
        </div>
        <div>
          <TagList tags={post.tags} postType={"grad_essay"} />
        </div>
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
