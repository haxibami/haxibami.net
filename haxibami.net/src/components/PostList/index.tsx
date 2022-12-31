import React from "react";

import Link from "next/link";

import TagList from "components/TagList";
import { dateVisualizer } from "lib/front";

import Styles from "./style.module.scss";

import type { PostData, PostType } from "lib/interface";

interface PostListProps {
  assign: PostData[]; // assigned posts to display
  postType: PostType; // post type
}

const PostList: React.FC<PostListProps> = (props) => {
  const { assign, postType } = props;
  return (
    <ul className={Styles.PostList}>
      {assign.map((post) => {
        const { preview, data } = post;
        return (
          <li key={data?.slug}>
            <span className={Styles.PostTile}>
              <Link href={`/${postType}/posts/${data?.slug}`}>
                <span className={Styles.TileTitle}>
                  <h2>{data?.title}</h2>
                </span>
              </Link>
              <span className={Styles.TileDate}>
                <span>{dateVisualizer(data?.date)}</span>
              </span>
              <span className={Styles.TilePreview}>{preview}...</span>
              <span className={Styles.TileTags}>
                <span>
                  <TagList tags={data?.tags ?? []} postType={postType} />
                </span>
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
