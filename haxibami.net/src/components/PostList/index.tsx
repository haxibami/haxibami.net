import React from "react";

import Link from "next/link";

import TagList from "components/TagList";
import { dateVisualizer } from "lib/front";

import Styles from "./style.module.scss";

import type { PostItem, PostType } from "lib/interface";

interface PostListProps {
  posts: PostItem[]; // assigned posts to display
  postType: PostType; // post type
}

const PostList: React.FC<PostListProps> = (props) => {
  const { posts, postType } = props;
  return (
    <ul className={Styles.PostList}>
      {posts.map((post) => (
        <Link href={`/${postType}/posts/${post.slug}`} key={post.slug}>
          <a>
            <li className={Styles.PostTile} key={post.slug}>
              <div className={Styles.TileTitle}>
                <h2>{post.title}</h2>
              </div>
              <div className={Styles.TileDate}>
                <div>{dateVisualizer(post.date)}</div>
              </div>
              <div className={Styles.TilePreview}>
                {post.content.substring(0, 200)}...
              </div>
              <div className={Styles.TileTags}>
                <div>
                  <TagList tags={post.tags} postType={postType} />
                </div>
              </div>
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
};

export default PostList;
