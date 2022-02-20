import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import * as Svg from "lib/svg";
import MyHead, { MetaProps } from "components/MyHead/MyHead";
import Tree from "components/Tree/Tree";
import styles from "styles/index.module.scss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const metaprops: MetaProps = {
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
                  alt="haxibami Logo"
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
                  <Svg.About
                    className={styles.About}
                    alt="about"
                    layout="fill"
                  />
                </div>
              </a>
            </Link>
          </div>
          <div className={styles.Twitter_box}>
            <a href="https://twitter.com/haxibami">
              <div className={styles.Twitter_wrapper}>
                <Svg.Twitter
                  className={styles.Twitter}
                  alt="twitter"
                  layout="fill"
                />
              </div>
            </a>
          </div>
          <div className={styles.Instagram_box}>
            <a href="https://instagram.com/haxibami">
              <div className={styles.Instagram_wrapper}>
                <Svg.Instagram
                  className={styles.Instagram}
                  alt="instagram"
                  layout="fill"
                />
              </div>
            </a>
          </div>
          <div className={styles.Mail_box}>
            <Link href="mail">
              <a>
                <div className={styles.Mail_wrapper}>
                  <Svg.Mail className={styles.Mail} alt="mail" layout="fill" />
                </div>
              </a>
            </Link>
          </div>
          <div className={styles.Github_box}>
            <a href="https://github.com/haxibami">
              <div className={styles.Github_wrapper}>
                <Svg.Github
                  className={styles.Github}
                  alt="github"
                  layout="fill"
                />
              </div>
            </a>
          </div>
          <div className={styles.Bookmark_box}>
            <a href="https://bookmeter.com/users/1025874">
              <div className={styles.Bookmark_wrapper}>
                <Svg.Bookmark
                  className={styles.Bookmark}
                  alt="bookmark"
                  layout="fill"
                />
              </div>
            </a>
          </div>
          <div className={styles.Book_box}>
            <Link href="works">
              <a>
                <div className={styles.Book_wrapper}>
                  <Svg.Book className={styles.Book} alt="book" layout="fill" />
                </div>
              </a>
            </Link>
          </div>
          <div className={styles.Blog1_box}>
            <a href="https://haxibami.hatenablog.jp">
              <div className={styles.Blog1_wrapper}>
                <Svg.Blog className={styles.Blog1} alt="blog" layout="fill" />
              </div>
            </a>
          </div>
          <div className={styles.Blog2_box}>
            <Link href={`/blog`}>
              <a>
                <div className={styles.Blog2_wrapper}>
                  <Svg.Blog className={styles.Blog2} alt="blog" layout="fill" />
                </div>
              </a>
            </Link>
          </div>

          <div className={styles.Write_box}>
            <a href="https://kakuyomu.jp/users/haxibami">
              <div className={styles.Write_wrapper}>
                <Svg.Write
                  className={styles.Write}
                  alt="kakuyomu"
                  layout="fill"
                />
              </div>
            </a>
          </div>
          <div className={styles.Poem_box}>
            <a href="https://utakatanka.jp/kajin/1102">
              <div className={styles.Poem_wrapper}>
                <Svg.Poem
                  className={styles.Poem}
                  alt="utakatanka"
                  layout="fill"
                />
              </div>
            </a>
          </div>
          <div className={styles.Spotify_box}>
            <a href="https://open.spotify.com/user/a0ndq420ky5fxfey4rpqx952w">
              <div className={styles.Spotify_wrapper}>
                <Svg.Spotify
                  className={styles.Spotify}
                  alt="spotify"
                  layout="fill"
                />
              </div>
            </a>
          </div>
          <div className={styles.Keybase_box}>
            <a href="https://keybase.io/haxibami">
              <div className={styles.Keybase_wrapper}>
                <Svg.Keybase
                  className={styles.Keybase}
                  alt="keybase"
                  layout="fill"
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
