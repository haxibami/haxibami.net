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
  faExclamation,
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
import Styles from "styles/index.module.scss";

import icon from "../../public/icon_ange_glasses_192.webp";

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
            <span className={Styles.TooltipUp}>
              <FontAwesomeIcon
                icon={faExclamation}
                id={Styles.Icon}
                size="xl"
              />
            </span>
            <Image
              id={Styles.Icon}
              src={icon}
              alt="haxibami"
              placeholder="blur"
              fill={true}
            />
          </Link>
        </div>

        <div id={Styles.About_box}>
          <Link href="about">
            <span className={Styles.TooltipUp}>About me</span>
            <FontAwesomeIcon icon={faQuestion} id={Styles.About} size={"2x"} />
          </Link>
        </div>
        <div id={Styles.Twitter_box}>
          <a
            href="https://twitter.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipDown}>Twitter</span>
            <FontAwesomeIcon icon={faTwitter} id={Styles.Twitter} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Instagram_box}>
          <a
            href="https://instagram.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipDown}>Instagram</span>
            <FontAwesomeIcon
              icon={faInstagram}
              id={Styles.Instagram}
              size={"2x"}
            />
          </a>
        </div>
        <div id={Styles.Mail_box}>
          <Link href="mail">
            <span className={Styles.TooltipDown}>Mail</span>
            <FontAwesomeIcon icon={faEnvelope} id={Styles.Mail} size={"2x"} />
          </Link>
        </div>
        <div id={Styles.Github_box}>
          <a
            href="https://github.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>GitHub</span>
            <FontAwesomeIcon icon={faGithub} id={Styles.Github} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Bookmark_box}>
          <a
            href="https://bookmeter.com/users/1025874"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Bookmark</span>
            <FontAwesomeIcon
              icon={faChartSimple}
              id={Styles.Bookmark}
              size={"2x"}
            />
          </a>
        </div>
        <div id={Styles.Book_box}>
          <Link href="works">
            <span className={Styles.TooltipUp}>Works</span>
            <FontAwesomeIcon icon={faBook} id={Styles.Book} size={"2x"} />
          </Link>
        </div>
        <div id={Styles.Blog1_box}>
          <a
            href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipDown}>Blog RSS</span>
            <FontAwesomeIcon icon={faRssSquare} id={Styles.Blog1} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Blog2_box}>
          <Link href={`/blog`}>
            <span className={Styles.TooltipDown}>Blog</span>
            <FontAwesomeIcon icon={faBlog} id={Styles.Blog2} size={"2x"} />
          </Link>
        </div>

        <div id={Styles.Write_box}>
          <a
            href="https://kakuyomu.jp/users/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Kakuyomu</span>
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
            <span className={Styles.TooltipUp}>Tanka</span>
            <FontAwesomeIcon icon={faQuoteLeft} id={Styles.Poem} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Spotify_box}>
          <a
            href="https://open.spotify.com/user/a0ndq420ky5fxfey4rpqx952w"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Spotify</span>
            <FontAwesomeIcon icon={faSpotify} id={Styles.Spotify} size={"2x"} />
          </a>
        </div>
        <div id={Styles.Keybase_box}>
          <a
            href="https://keybase.io/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Keybase</span>
            <FontAwesomeIcon icon={faKeybase} id={Styles.Keybase} size={"2x"} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
