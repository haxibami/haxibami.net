import Link from "next/link";
import React from "react";
import Styles from "./style.module.scss";
import { PostType, SiteInfo } from "lib/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faRss,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import ThemeChanger from "components/ThemeChanger";

interface PostHeaderProps {
  siteinfo: SiteInfo;
  posttype: PostType;
}

const PostHeader: React.VFC<PostHeaderProps> = ({ siteinfo, posttype }) => {
  return (
    <header id={Styles.HeaderBox}>
      <div className={Styles.Desktop}>
        <span id={Styles.Title}>
          <h1>
            <Link href={`/${posttype}`}>
              <a>{siteinfo.siteinfo[posttype].title}</a>
            </Link>
          </h1>
          <p>{siteinfo.siteinfo[posttype].description}</p>
        </span>
        <span id={Styles.Icons}>
          <Link href={"/"}>
            <a>
              <FontAwesomeIcon
                icon={faHouseChimney}
                width={30}
                height={30}
                color={"#9986bf"}
              />
            </a>
          </Link>
          <Link href={`/${posttype}/posts/about`}>
            <a>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                width={30}
                height={30}
                color={"#86bfb6"}
              />
            </a>
          </Link>
          <Link
            href={
              "https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml"
            }
          >
            <a>
              <FontAwesomeIcon
                icon={faRss}
                width={30}
                height={30}
                color={"#abbf86"}
              />
            </a>
          </Link>
          <ThemeChanger />
        </span>
      </div>
      <div className={Styles.Mobile}>
        <div>
          {posttype === "blog" ? (
            <h1>
              <Link href={`/${posttype}`}>
                <a>
                  <div>なま</div>
                  <div>あたたかくて</div>
                  <div>おいしい</div>
                </a>
              </Link>
            </h1>
          ) : posttype === "grad_essay" ? (
            <h1>
              <Link href={`/${posttype}`}>
                <a>{siteinfo.siteinfo[posttype].title}</a>
              </Link>
            </h1>
          ) : (
            <h1></h1>
          )}
        </div>
        <ul>
          <li>
            <Link href={"/"}>
              <a>
                <FontAwesomeIcon
                  icon={faHouseChimney}
                  width={30}
                  height={30}
                  color={"#9986bf"}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${PostType}/posts/about`}>
              <a>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  width={30}
                  height={30}
                  color={"#86bfb6"}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={
                "https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml"
              }
            >
              <a>
                <FontAwesomeIcon
                  icon={faRss}
                  width={30}
                  height={30}
                  color={"#abbf86"}
                />
              </a>
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
