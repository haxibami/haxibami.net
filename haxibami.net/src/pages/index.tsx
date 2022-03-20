import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { PageMetaProps } from "lib/interface";
//import * as Svg from "lib/svg";
import MyHead from "components/MyHead";
import Tree from "components/Tree";
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
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faKeybase,
  faSpotify,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "styles/index.module.scss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const metaprops: PageMetaProps = {
    title: "haxibami.net",
    sitename: "haxibami.net",
    description: "my phylogenetic tree",
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
    <div className={styles.container}>
      <MyHead {...metaprops} />
      <Head>
        <title>haxibami</title>
        <meta name="description" content="私の系統樹" lang="ja" />
        <meta name="twitter:site" content="@haxibami" />
        <meta name="twitter:creator" content="@haxibami" />
        <meta
          name="twitter:image"
          content="https://www.haxibami.net/ogpicon.webp"
        />
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content="https://www.haxibami.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="haxibami.net" />
        <meta property="og:description" content="私の系統樹" />
        <meta property="og:site_name" content="haxibami.net" />
        <meta
          property="og:image"
          content="https://www.haxibami.net/ogpicon.webp"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.tree}>
          <Tree></Tree>
          <div className={styles.icon_wrapper}>
            <Link href="/profile">
              <a>
                <Image
                  className={styles.icon}
                  src="/favicon.ico"
                  alt="haxibami"
                  width={100}
                  height={100}
                />
                <div className={styles.icon_tip}>!</div>
              </a>
            </Link>
          </div>

          <div className={styles.About_box}>
            <Link href="about">
              <a>
                <div className={styles.About_wrapper}>
                  <FontAwesomeIcon icon={faQuestion} className={styles.About} />
                  {/*<Svg.About
                    className={styles.About}
                    alt="about"
                    layout="fill"
                  />*/}
                </div>
              </a>
            </Link>
          </div>
          <div className={styles.Twitter_box}>
            <a
              href="https://twitter.com/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Twitter_wrapper}>
                <FontAwesomeIcon
                  icon={faTwitter as IconProp}
                  className={styles.Twitter}
                />
              </div>
            </a>
          </div>
          <div className={styles.Instagram_box}>
            <a
              href="https://instagram.com/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Instagram_wrapper}>
                <FontAwesomeIcon
                  icon={faInstagram as IconProp}
                  className={styles.Instagram}
                />
              </div>
            </a>
          </div>
          <div className={styles.Mail_box}>
            <Link href="mail">
              <a>
                <div className={styles.Mail_wrapper}>
                  <FontAwesomeIcon icon={faEnvelope} className={styles.Mail} />
                  {/*<Svg.Mail className={styles.Mail} alt="mail" layout="fill" />*/}
                </div>
              </a>
            </Link>
          </div>
          <div className={styles.Github_box}>
            <a
              href="https://github.com/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Github_wrapper}>
                <FontAwesomeIcon
                  icon={faGithub as IconProp}
                  className={styles.Github}
                />
              </div>
            </a>
          </div>
          <div className={styles.Bookmark_box}>
            <a
              href="https://bookmeter.com/users/1025874"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Bookmark_wrapper}>
                <FontAwesomeIcon
                  icon={faChartBar}
                  className={styles.Bookmark}
                />
              </div>
            </a>
          </div>
          <div className={styles.Book_box}>
            <Link href="works">
              <a>
                <div className={styles.Book_wrapper}>
                  <FontAwesomeIcon icon={faBook} className={styles.Book} />
                </div>
              </a>
            </Link>
          </div>
          <div className={styles.Blog1_box}>
            <a
              href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Blog1_wrapper}>
                <FontAwesomeIcon icon={faRssSquare} className={styles.Blog1} />
              </div>
            </a>
          </div>
          <div className={styles.Blog2_box}>
            <Link href={`/blog`}>
              <a>
                <div className={styles.Blog2_wrapper}>
                  {/*<Svg.Blog className={styles.Blog2} alt="blog" layout="fill" />*/}
                  <FontAwesomeIcon icon={faBlog} className={styles.Blog2} />
                </div>
              </a>
            </Link>
          </div>

          <div className={styles.Write_box}>
            <a
              href="https://kakuyomu.jp/users/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Write_wrapper}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={styles.Write}
                />
              </div>
            </a>
          </div>
          <div className={styles.Poem_box}>
            <a
              href="https://utakatanka.jp/kajin/1102"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Poem_wrapper}>
                <FontAwesomeIcon icon={faQuoteLeft} className={styles.Poem} />
              </div>
            </a>
          </div>
          <div className={styles.Spotify_box}>
            <a
              href="https://open.spotify.com/user/a0ndq420ky5fxfey4rpqx952w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Spotify_wrapper}>
                <FontAwesomeIcon
                  icon={faSpotify as IconProp}
                  className={styles.Spotify}
                />
              </div>
            </a>
          </div>
          <div className={styles.Keybase_box}>
            <a
              href="https://keybase.io/haxibami"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.Keybase_wrapper}>
                <FontAwesomeIcon
                  icon={faKeybase as IconProp}
                  className={styles.Keybase}
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
