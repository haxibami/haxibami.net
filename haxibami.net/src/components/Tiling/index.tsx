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
                <div className={Styles.TileTitle}>
                  <h2>{post.title}</h2>
                </div>
                <div className={Styles.TilePreview}>
                  {post.content.substring(0, 200)}...
                </div>
                <div className={Styles.TileDate}>
                  <span className={Styles.Date}>{post.date}</span>
                  <span className={Styles.TileTags}>
                    {post.tags.map((tag) => (
                      <span key={tag}>
                        <Link href={`${props.contentTop}/tag/${tag}`}>
                          <a>#{tag}</a>
                        </Link>
                      </span>
                    ))}
                  </span>
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
