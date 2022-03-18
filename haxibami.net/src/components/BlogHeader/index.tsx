import Link from "next/link";
import React from "react";
import Styles from "./BlogHeader.module.scss";
import { SiteInfo } from "lib/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faRss,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import ThemeChanger from "components/ThemeChanger";

const BlogHeader: React.VFC<SiteInfo> = ({ siteinfo }) => {
  return (
    <div id={Styles.HeaderBox}>
      <header className={Styles.Desktop}>
        <div id={Styles.Title}>
          <h1>{siteinfo.blog.title}</h1>
          <p>{siteinfo.blog.description}</p>
        </div>
        <div id={Styles.Icons}>
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
          <Link href={"/blog/posts/about"}>
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
        </div>
      </header>
      <header className={Styles.Mobile}>
        <div>
          <h1>{siteinfo.blog.title}</h1>
          <p>{siteinfo.blog.description}</p>
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
            <Link href={"/blog/posts/about"}>
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
      </header>
    </div>
  );
};

export default BlogHeader;
