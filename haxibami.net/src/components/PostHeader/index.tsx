import React from "react";

import Link from "next/link";

import { SITEDATA } from "lib/constant";

import type { PostType } from "lib/interface";

interface PostHeaderProps {
  posttype: PostType;
}

const PostHeader: React.FC<PostHeaderProps> = ({ posttype }) => {
  return (
    <header className="flex py-4">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl text-[color:var(--title)]">
            <Link href="/">{SITEDATA.blog.engtitle}</Link>
          </h2>
        </div>
        <ul className="flex flex-row items-center gap-5 text-lg">
          <li>
            {posttype === "grad_essay" ? (
              <Link href={`/grad_essay`}>Essay</Link>
            ) : (
              <Link href={`/blog`}>Blog</Link>
            )}
          </li>
          <li>
            <Link href={`/about`}>About</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default PostHeader;
