import Link from "next/link";
import React from "react";
import type { PostItem } from "lib/interface";
import Styles from "./Tiling.module.scss";

interface TilingInfo {
  allPosts: PostItem[];
  contentTop: string;
}

const Tiling: React.VFC<TilingInfo> = (props) => {
  return (
    <div>
      <ul className={Styles.ArticleList}>
        {props.allPosts?.map((post) => (
          <Link
            href={`/${props.contentTop}/posts/${post.slug}`}
            key={post.slug}
          >
            <a>
              <li className={Styles.ArticleTile} key={post.slug}>
                <div className={Styles.TileDate}>
                  <span>{post.date}</span>
                </div>
                <div className={Styles.TileTitle}>
                  <h2>{post.title}</h2>
                </div>
                <div className={Styles.TilePreview}>
                  {post.content.substring(0, 200)}
                </div>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Tiling;
