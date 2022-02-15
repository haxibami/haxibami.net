import Link from "next/link";
import React from "react";
import Tip from "components/Tip/Tip";
import Styles from "./BlogHeader.module.scss";

const BlogHeader: React.VFC = () => {
  return (
    <div id={Styles.HeaderBox}>
      <header className={Styles.Desktop}>
        <Tip />
        <div id={Styles.Title}>
          <h1>偽偽書</h1>
          <p>二重否定除去</p>
        </div>
      </header>
      <header className={Styles.Mobile}>
        <div>
          <h1>偽偽書</h1>
          <p>二重否定除去</p>
        </div>
        <ul>
          <li>
            <Link href={"/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href={"/blog"}>
              <a>BlogTop</a>
            </Link>
          </li>
          <li>
            <Link href={"/blog/tags"}>
              <a>Tags</a>
            </Link>
          </li>
          <li>
            <Link href={"/blog/about"}>
              <a>About</a>
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default BlogHeader;
