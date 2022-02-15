import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getAllPosts, getPostTags, replaceMdwithTxt } from "lib/api";
import { ogpHost } from "lib/ogpprops";
import MyHead, { MetaProps } from "components/MyHead/MyHead";
import BlogHeader from "components/BlogHeader/BlogHeader";
import Tiling from "components/Tiling/Tiling";
import ArticleMenu, { MenuTab } from "components/ArticleMenu/ArticleMenu";
import Styles from "styles/grad_essay.module.scss";

const tabs: MenuTab[] = [
  {
    name: "Articles",
    link: "",
  },
  {
    name: "Tags",
    link: "tags",
  },
];

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPostsPre = getAllPosts(
    ["slug", "title", "date", "tags", "content"],
    "grad_essay"
  );

  const taglists = getPostTags("grad_essay");

  const allPosts = await Promise.all(
    allPostsPre.map(async (item) => {
      const processed = await replaceMdwithTxt(item);
      return processed;
    })
  );

  const metaprops: MetaProps = {
    title: "トップ",
    sitename: "卒業文集",
    description: "haxibamiの卒業文集",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=卒業文集`),
    pageRelPath: "grad_essay",
    pagetype: "website",
    twcardtype: "summary",
  };

  return {
    props: { allPosts, taglists, metaprops },
  };
};

const GradEssayTop: NextPage<Props> = ({ allPosts, metaprops }) => {
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <BlogHeader />
        <main>
          <ArticleMenu contentType={"grad_essay"} tabs={tabs} focus={0} />
          <Tiling allPosts={allPosts} contentTop="grad_essay" />
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default GradEssayTop;
