import Link from "next/link";
import React from "react";
import Styles from "./style.module.scss";
import { PostType, MenuTab } from "lib/interface";

interface ArticleMenuProps {
  contentType: PostType;
  tabs: MenuTab[];
}

const ArticleMenu: React.VFC<ArticleMenuProps> = (props) => {
  const { contentType, tabs } = props;
  return (
    <h2 className={Styles.ArticleMenu}>
      {tabs.map((tab) => {
        return (
          <div className={tab.focus ? Styles.Focus : ""} key={tab.name}>
            <Link href={`/${contentType}/${tab.link}`} scroll={false}>
              <a>{tab.name}</a>
            </Link>
          </div>
        );
      })}
    </h2>
  );
};

export default ArticleMenu;
