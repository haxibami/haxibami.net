import React from "react";

import Link from "next/link";

import TagList from "components/TagList";
import { dateVisualizer } from "lib/front";

import type { PostData, PostType } from "lib/interface";

interface PostListProps {
  assign: PostData[];
  postType: PostType;
}

const PostList: React.FC<PostListProps> = (props) => {
  const { assign, postType } = props;
  return (
    <ul className="flex w-full grow flex-col gap-6">
      {assign.map((post) => {
        const { data } = post;
        return (
          <li key={data?.slug}>
            <article className="flex flex-col gap-2 overflow-hidden rounded leading-6 text-[color:var(--secondary)]">
              <div>
                <div>{dateVisualizer(data?.date)}</div>
              </div>
              <div className="text-[color:var(--title)]">
                <Link href={`/${postType}/posts/${data?.slug}`}>
                  <h2 className=" max-h-32 overflow-hidden text-ellipsis hover:underline hover:underline-offset-2">
                    {data?.title}
                  </h2>
                </Link>
              </div>
              <div className="overflow-hidden text-sm">{data?.description}</div>
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <TagList tags={data?.tags ?? []} postType={postType} />
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
