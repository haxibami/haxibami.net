import { NextPage, InferGetStaticPropsType } from "next";
import {
  getAllPosts,
  getPostTags,
  replaceMdwithTxt,
  readYaml,
  SiteInfo,
} from "lib/api";
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

  const meta: SiteInfo = readYaml("meta.yaml");

  const metaprops: MetaProps = {
    title: "トップ",
    sitename: meta.siteinfo.grad_essay.title,
    description: meta.siteinfo.grad_essay.description,
    ogImageUrl: encodeURI(
      `${ogpHost}/api/ogp?title=${meta.siteinfo.grad_essay.title}`
    ),
    pageRelPath: "grad_essay",
    pagetype: "website",
    twcardtype: "summary",
  };

  return {
    props: { allPosts, taglists, metaprops, meta },
  };
};

const GradEssayTop: NextPage<Props> = ({ allPosts, metaprops, meta }) => {
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <BlogHeader {...meta} />
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
