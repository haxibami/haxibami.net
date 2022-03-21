import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageMetaProps } from "lib/interface";
//import * as Svg from "lib/svg";
import MyHead from "components/MyHead";
import Tree from "components/Tree";
import ThemeChanger from "components/ThemeChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
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
import {
  faGithub,
  faInstagram,
  faKeybase,
  faSpotify,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Styles from "styles/index.module.scss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const metaprops: PageMetaProps = {
    title: "haxibami",
    sitename: "haxibami.net",
    description: "私の系統樹",
    ogImageUrl: "/ogpicon.webp",
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
    <div className={Styles.container}>
      <MyHead {...metaprops} />
      <main id={Styles.Main}>
        <div id={Styles.Tree}>
          <Tree />
          <div id={Styles.ThemeChanger}>
            <ThemeChanger />
          </div>
          <div className={Styles.icon_wrapper}>
            <Link href="/profile">
              <a>
                <Image
                  className={Styles.icon}
                  src="/ogpicon.webp"
                  alt="icon"
                  width={100}
                  height={100}
                />
                <div className={Styles.icon_tip}>!</div>
              </a>
            </Link>
          </div>

          <div className={Styles.About_box}>
            <Link href="about">
              <a>
                <div className={Styles.About_wrapper}>
                  <FontAwesomeIcon icon={faQuestion} className={Styles.About} />
                  {/*<Svg.About
                    className={Styles.About}
                    alt="about"
                    layout="fill"
                  />*/}
                </div>
              </a>
            </Link>
          </div>
          <div className={Styles.Twitter_box}>
            <a
              href="https://twitter.com/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Twitter_wrapper}>
                <FontAwesomeIcon
                  icon={faTwitter as IconProp}
                  className={Styles.Twitter}
                />
              </div>
            </a>
          </div>
          <div className={Styles.Instagram_box}>
            <a
              href="https://instagram.com/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Instagram_wrapper}>
                <FontAwesomeIcon
                  icon={faInstagram as IconProp}
                  className={Styles.Instagram}
                />
              </div>
            </a>
          </div>
          <div className={Styles.Mail_box}>
            <Link href="mail">
              <a>
                <div className={Styles.Mail_wrapper}>
                  <FontAwesomeIcon icon={faEnvelope} className={Styles.Mail} />
                </div>
              </a>
            </Link>
          </div>
          <div className={Styles.Github_box}>
            <a
              href="https://github.com/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Github_wrapper}>
                <FontAwesomeIcon
                  icon={faGithub as IconProp}
                  className={Styles.Github}
                />
              </div>
            </a>
          </div>
          <div className={Styles.Bookmark_box}>
            <a
              href="https://bookmeter.com/users/1025874"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Bookmark_wrapper}>
                <FontAwesomeIcon
                  icon={faChartSimple}
                  className={Styles.Bookmark}
                />
              </div>
            </a>
          </div>
          <div className={Styles.Book_box}>
            <Link href="works">
              <a>
                <div className={Styles.Book_wrapper}>
                  <FontAwesomeIcon icon={faBook} className={Styles.Book} />
                </div>
              </a>
            </Link>
          </div>
          <div className={Styles.Blog1_box}>
            <a
              href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Blog1_wrapper}>
                <FontAwesomeIcon icon={faRssSquare} className={Styles.Blog1} />
              </div>
            </a>
          </div>
          <div className={Styles.Blog2_box}>
            <Link href={`/blog`}>
              <a>
                <div className={Styles.Blog2_wrapper}>
                  <FontAwesomeIcon icon={faBlog} className={Styles.Blog2} />
                </div>
              </a>
            </Link>
          </div>

          <div className={Styles.Write_box}>
            <a
              href="https://kakuyomu.jp/users/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Write_wrapper}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={Styles.Write}
                />
              </div>
            </a>
          </div>
          <div className={Styles.Poem_box}>
            <a
              href="https://utakatanka.jp/kajin/1102"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Poem_wrapper}>
                <FontAwesomeIcon icon={faQuoteLeft} className={Styles.Poem} />
              </div>
            </a>
          </div>
          <div className={Styles.Spotify_box}>
            <a
              href="https://open.spotify.com/user/a0ndq420ky5fxfey4rpqx952w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Spotify_wrapper}>
                <FontAwesomeIcon
                  icon={faSpotify as IconProp}
                  className={Styles.Spotify}
                />
              </div>
            </a>
          </div>
          <div className={Styles.Keybase_box}>
            <a
              href="https://keybase.io/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={Styles.Keybase_wrapper}>
                <FontAwesomeIcon
                  icon={faKeybase as IconProp}
                  className={Styles.Keybase}
                />
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
