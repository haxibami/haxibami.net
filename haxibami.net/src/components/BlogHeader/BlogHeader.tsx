import Link from "next/link";
import React from "react";
import Tip from "components/Tip/Tip";
import Styles from "./BlogHeader.module.scss";
import { SiteInfo } from "lib/api";

const BlogHeader: React.VFC<SiteInfo> = ({ siteinfo }) => {
  return (
    <div id={Styles.HeaderBox}>
      <header className={Styles.Desktop}>
        <Tip />
        <div id={Styles.Title}>
          <h1>{siteinfo.blog.title}</h1>
          <p>{siteinfo.blog.description}</p>
        </div>
      </header>
      <header className={Styles.Mobile}>
        <div>
          <h1>{siteinfo.blog.title}</h1>
          <p>{siteinfo.blog.description}</p>
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
            <Link href={"/blog/posts/about"}>
              <a>About</a>
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default BlogHeader;
