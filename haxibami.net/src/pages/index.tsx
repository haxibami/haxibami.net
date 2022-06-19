import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  faGithub,
  faInstagram,
  faKeybase,
  faSpotify,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faQuestion,
  faBook,
  faEnvelope,
  faBlog,
  faRssSquare,
  faPenToSquare,
  faQuoteLeft,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import MyHead from "components/MyHead";
import ThemeChanger from "components/ThemeChanger";
import Tree from "components/Tree";
//import * as Svg from "lib/svg";
import Styles from "styles/index.module.scss";

import type { PageMetaProps } from "lib/interface";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const metaprops: PageMetaProps = {
    title: "haxibami",
    sitename: "haxibami.net",
    description: "私の系統樹",
    ogImageUrl: "https://www.haxibami.net/icon_ange_glasses_512.webp",
    pageRelPath: "",
    pagetype: "website",
    twcardtype: "summary",
  };
  return {
    props: { metaprops },
  };
};

const Home: NextPage<Props> = ({ metaprops }) => {
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <main id={Styles.Main}>
        <Tree />
        <div id={Styles.ThemeChanger}>
          <ThemeChanger />
        </div>
        <div id={Styles.Icon_box}>
          <Link href="/about">
            <a>
              <Image
                id={Styles.Icon}
                src="/icon_ange_glasses_192.webp"
                alt="haxibami"
                layout={"fill"}
                objectFit={"cover"}
              />
            </a>
          </Link>
        </div>

        <div id={Styles.About_box}>
          <Link href="about">
            <a>
              <FontAwesomeIcon
                icon={faQuestion}
                id={Styles.About}
                size={"2x"}
              />
            </a>
          </Link>
        </div>
        <div id={Styles.Twitter_box}>
          <a
            href="https://twitter.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} id={Styles.Twitter} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Instagram_box}>
          <a
            href="https://instagram.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              id={Styles.Instagram}
              size={"2x"}
            />
          </a>
        </div>
        <div id={Styles.Mail_box}>
          <Link href="mail">
            <a>
              <FontAwesomeIcon icon={faEnvelope} id={Styles.Mail} size={"2x"} />
            </a>
          </Link>
        </div>
        <div id={Styles.Github_box}>
          <a
            href="https://github.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} id={Styles.Github} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Bookmark_box}>
          <a
            href="https://bookmeter.com/users/1025874"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faChartSimple}
              id={Styles.Bookmark}
              size={"2x"}
            />
          </a>
        </div>
        <div id={Styles.Book_box}>
          <Link href="works">
            <a>
              <FontAwesomeIcon icon={faBook} id={Styles.Book} size={"2x"} />
            </a>
          </Link>
        </div>
        <div id={Styles.Blog1_box}>
          <a
            href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faRssSquare} id={Styles.Blog1} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Blog2_box}>
          <Link href={`/blog`}>
            <a>
              <FontAwesomeIcon icon={faBlog} id={Styles.Blog2} size={"2x"} />
            </a>
          </Link>
        </div>

        <div id={Styles.Write_box}>
          <a
            href="https://kakuyomu.jp/users/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              id={Styles.Write}
              size={"2x"}
            />
          </a>
        </div>
        <div id={Styles.Poem_box}>
          <a
            href="https://utakatanka.jp/kajin/1102"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faQuoteLeft} id={Styles.Poem} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Spotify_box}>
          <a
            href="https://open.spotify.com/user/a0ndq420ky5fxfey4rpqx952w"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faSpotify} id={Styles.Spotify} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Keybase_box}>
          <a
            href="https://keybase.io/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faKeybase} id={Styles.Keybase} size={"2x"} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
