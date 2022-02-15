import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug, replaceMdwithTxt } from "lib/api";
import { MdToHtml } from "lib/parser";
import { ogpHost } from "lib/ogpprops";
import MyHead, { MetaProps } from "components/MyHead/MyHead";
import Styles from "styles/[slug].module.scss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const blogs = getAllPosts(["slug"], "blog");

  return {
    paths: blogs.map((blog) => {
      return {
        params: {
          slug: blog.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const blog = getPostBySlug(
    params.slug,
    ["slug", "title", "date", "tags", "content"],
    "blog"
  );

  const content: string = await MdToHtml(blog.content);

  const description: string = (await replaceMdwithTxt(blog)).content;

  const metaprops: MetaProps = {
    title: blog.title,
    sitename: "偽偽書",
    description: description,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=${blog.title}&date=${blog.date}`
    ),
    pageRelPath: `blog/${blog.slug}`,
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: {
      metaprops,
      blog: {
        ...blog,
        content,
      },
    },
  };
};

const AllBlog: NextPage<Props> = ({ blog, metaprops }) => {
  return (
    <div id={Styles.Wrapper} key={blog.slug}>
      <MyHead {...metaprops} />
      <header>
        <nav>
          <span>
            <Link href={"/blog"}>
              <a>{"<< top"}</a>
            </Link>
          </span>
        </nav>
        <ul>
          <span className={Styles.Date}>#{blog.date}</span>
          {blog.tags.map((tag) => (
            <span key={tag}>
              <Link href={`/blog/tag/${tag}`}>
                <a>
                  <li>#{tag}</li>
                </a>
              </Link>
            </span>
          ))}
        </ul>
      </header>
      <main>
        <h1 id={Styles.Title}>{blog.title}</h1>
        <article>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </main>
      <footer> </footer>
    </div>
  );
};

export default AllBlog;
