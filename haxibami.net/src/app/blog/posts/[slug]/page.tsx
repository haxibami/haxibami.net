import Link from "next/link";

import TagList from "components/TagList";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";
import { SITEDATA } from "lib/constant";
import { dateVisualizer } from "lib/front";
import { getSlugs } from "lib/fs";
import Styles from "styles/[slug].module.scss";

export default async function ArticlePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const file = await fetchPost("articles/blog", slug);
  const { content, frontmatter } = await compiler(file);
  return (
    <div id={Styles.Wrapper}>
      <div id={Styles.Container}>
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
          <h1 id={Styles.Title}>{frontmatter?.title}</h1>
        </header>
        <main>
          <article>{content}</article>
        </main>
        <footer></footer>
      </div>
    </div>
  );
}

export const generateStaticParams = async () => {
  const slugs = getSlugs("articles/blog");
  return slugs.map((slug) => {
    return {
      slug,
    };
  });
};
