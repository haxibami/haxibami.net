import React from "react";

import Link from "next/link";

import { SITEDATA } from "lib/constant";

import type { PostType } from "lib/interface";

interface PostHeaderProps {
  posttype: PostType;
}

const PostHeader: React.FC<PostHeaderProps> = ({ posttype }) => {
  return (
    <header className="flex py-12">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl text-[color:var(--title)]">
            <Link href={`/${posttype}`}>{SITEDATA[posttype].title}</Link>
          </h2>
        </div>
        <ul className="flex gap-5 text-lg">
          <li>
            <Link href={"/"}>Root</Link>
          </li>
          <li>
            <Link href={`/blog`}>Blog</Link>
          </li>
          <li>
            <Link href={`/about`}>About</Link>
          </li>
        </ul>
      </div>
      {/*<div className={Styles.Mobile}>
        <div>
          {posttype === "blog" ? (
            <h1>
              <Link href={`/${posttype.toString()}`}>
                {SITEDATA[posttype].title}
              </Link>
            </h1>
          ) : posttype === "grad_essay" ? (
            <h1>
              <Link href={`/${posttype}`}>{SITEDATA[posttype].title}</Link>
            </h1>
          ) : (
            <h1></h1>
          )}
        </div>
        <ul>
          <li>
            <Link href={"/"}>
home
            </Link>
          </li>
          <li>
            <Link href={`/${posttype}/posts/about`}>
            about
               </Link>
          </li>
          <li>
            <Link
              href={
                "https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml"
              }
            >
              rss
            </Link>
          </li>
          <li></li>
        </ul>
      </div>*/}
    </header>
  );
};

export default PostHeader;
