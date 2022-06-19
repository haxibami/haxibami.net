import Link from "next/link";

import ArticleMenu from "components/ArticleMenu";

import Styles from "./style.module.scss";

import type { MenuTab, PostType } from "lib/interface";


interface TagsTopProps {
  tagsMenuTabs: MenuTab[];
  taglists: string[];
  postType: PostType;
}

const TagsTop: React.FC<TagsTopProps> = (props) => {
  const { tagsMenuTabs, taglists, postType } = props;
  return (
    <main id={Styles.Main}>
      <div id={Styles.MainBox}>
        <ArticleMenu contentType={postType} tabs={tagsMenuTabs} />
        <ul className={Styles.TagList}>
          {taglists.map((tag) => (
            <li className={Styles.TagTile} key={tag}>
              <Link href={`/${postType}/tag/${tag}`}>
                <a>#{tag}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default TagsTop;
