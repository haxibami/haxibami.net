import React from "react";

import Link from "next/link";

import {
  faHouseChimney,
  faRss,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ThemeChanger from "components/ThemeChanger";
import { SITEDATA, FEEDLY_URL } from "lib/constant";

import Styles from "./style.module.scss";

import type { PostType } from "lib/interface";

//import "@fortawesome/fontawesome-svg-core/styles.css";

interface PostHeaderProps {
  posttype: PostType;
}

const PostHeader: React.FC<PostHeaderProps> = ({ posttype }) => {
  return (
    <header id={Styles.HeaderBox}>
      <div className={Styles.Desktop}>
        <span id={Styles.Title}>
          <h1>
            <Link href={`/${posttype}`}>{SITEDATA[posttype].title}</Link>
          </h1>
          <p>{SITEDATA[posttype].description}</p>
        </span>
        <span id={Styles.Icons}>
          <Link href={"/"}>
            <FontAwesomeIcon
              icon={faHouseChimney}
              color={"#9986bf"}
              size={"2x"}
            />
          </Link>
          <Link href={`/${posttype}/posts/about`}>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color={"#86bfb6"}
              size={"2x"}
            />
          </Link>
          <Link href={`${FEEDLY_URL}`}>
            <FontAwesomeIcon icon={faRss} color={"#abbf86"} size={"2x"} />
          </Link>
          <ThemeChanger />
        </span>
      </div>
      <div className={Styles.Mobile}>
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
              <FontAwesomeIcon
                icon={faHouseChimney}
                color={"#9986bf"}
                size={"2x"}
              />
            </Link>
          </li>
          <li>
            <Link href={`/${posttype}/posts/about`}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                color={"#86bfb6"}
                size={"2x"}
              />
            </Link>
          </li>
          <li>
            <Link
              href={
                "https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml"
              }
            >
              <FontAwesomeIcon icon={faRss} color={"#abbf86"} size={"2x"} />
            </Link>
          </li>
          <li>
            <ThemeChanger />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default PostHeader;
