import { NextPage, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getPostTags, readYaml, SiteInfo } from "lib/api";
import { ogpHost } from "lib/ogpprops";
import MyHead, { MetaProps } from "components/MyHead/MyHead";
import BlogHeader from "components/BlogHeader/BlogHeader";
import ArticleMenu, { MenuTab } from "components/ArticleMenu/ArticleMenu";
import Styles from "styles/tags.module.scss";

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
  const taglists = getPostTags("grad_essay");
  const meta: SiteInfo = readYaml("meta.yaml");

  const metaprops: MetaProps = {
    title: "タグ一覧",
    sitename: meta.siteinfo.grad_essay.title,
    description: "タグ別記事",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=タグ一覧`),
    pageRelPath: "grad_essay/tags",
    pagetype: "article",
    twcardtype: "summary",
  };

  return {
    props: { taglists, metaprops, meta },
  };
};

const Tags: NextPage<Props> = ({ taglists, metaprops, meta }) => {
  return (
    <div>
      <div id={Styles.Wrapper}>
        <MyHead {...metaprops} />
        <BlogHeader {...meta} />
        <main>
          <ArticleMenu contentType={"grad_essay"} tabs={tabs} focus={1} />
          <ul className={Styles.TagList}>
            {taglists?.map((tag) => (
              <li className={Styles.TagTile} key={tag}>
                <Link href={`/grad_essay/tag/${tag}`}>
                  <a>#{tag}</a>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Tags;