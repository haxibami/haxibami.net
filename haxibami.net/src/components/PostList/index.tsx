import Link from "next/link";
import React from "react";
import type { PostItem, PostType } from "lib/interface";
import { dateVisualizer } from "lib/front";
import TagList from "components/TagList";
import Styles from "./style.module.scss";

interface PostListProps {
  posts: PostItem[]; // assigned posts to display
  postType: PostType; // post type
}

const PostList: React.VFC<PostListProps> = (props) => {
  const { posts, postType } = props;
  return (
    <div>
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
    </div>
  );
};

export default PostList;
