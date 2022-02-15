import { ArticleType } from "lib/api";
import Link from "next/link";
import React from "react";
import Styles from "./ArticleMenu.module.scss";

export interface MenuTab {
  name: string;
  link: string;
}

interface ArticleMenuProps {
  contentType: ArticleType;
  tabs: MenuTab[];
  focus: number;
}

const ArticleMenu: React.VFC<ArticleMenuProps> = (props) => {
  return (
    <h2 className={Styles.ArticleMenu}>
      {props.tabs.map((tab, index) => {
        return (
          <div
            className={index === props.focus ? Styles.Focus : ""}
            key={tab.name}
          >
            <Link href={`/${props.contentType}/${tab.link}`}>
              <a>{tab.name}</a>
            </Link>
          </div>
        );
      })}
    </h2>
  );
};

export default ArticleMenu;
