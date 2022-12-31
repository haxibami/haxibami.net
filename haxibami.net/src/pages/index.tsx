import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import MyHead from "components/MyHead";
import * as Svg from "components/Svg";
import Tree from "components/Tree";
import { FEEDLY_URL, HOST } from "lib/constant";
import Styles from "styles/index.module.scss";

import icon from "../../public/icon_ange_glasses_192.webp";

import type { PageMetaData } from "lib/interface";

const Home: NextPage = () => {
  const pageMetaData: PageMetaData = {
    title: "haxibami",
    sitename: `${HOST}`,
    description: "私の系統樹",
    ogImageUrl: `https://${HOST}/icon_ange_glasses_512.webp`,
    pageRelPath: "",
    pagetype: "website",
    twcardtype: "summary",
  };
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...pageMetaData} />
      <main id={Styles.Main}>
        <Tree />
        <div id={Styles.Icon_box}>
          <Link href="/about">
            <span className={Styles.TooltipUp}>
              <Svg.ExclamationIcon id={Styles.Icon} />
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
            <Svg.QuestionIcon id={Styles.About} />
          </Link>
        </div>
        <div id={Styles.Twitter_box}>
          <a
            href="https://twitter.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipDown}>Twitter</span>
            <Svg.TwitterIcon id={Styles.Twitter} />
          </a>
        </div>
        <div id={Styles.Instagram_box}>
          <a
            href="https://instagram.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipDown}>Instagram</span>
            <Svg.InstagramIcon id={Styles.Instagram} />
          </a>
        </div>
        <div id={Styles.Mail_box}>
          <Link href="mail">
            <span className={Styles.TooltipDown}>Mail</span>
            <Svg.MailIcon id={Styles.Mail} />
          </Link>
        </div>
        <div id={Styles.Github_box}>
          <a
            href="https://github.com/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>GitHub</span>
            <Svg.GitHub id={Styles.Github} />
          </a>
        </div>
        <div id={Styles.Read_box}>
          <a
            href="https://bookmeter.com/users/1025874"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Read</span>
            <Svg.ReadIcon id={Styles.Read} />
          </a>
        </div>
        <div id={Styles.Works_box}>
          <Link href="works">
            <span className={Styles.TooltipUp}>Works</span>
            <Svg.WorkIcon id={Styles.Works} />
          </Link>
        </div>
        <div id={Styles.Rss_box}>
          <a href={`${FEEDLY_URL}`} target="_blank" rel="noopener noreferrer">
            <span className={Styles.TooltipDown}>Blog RSS</span>
            <Svg.RssIcon id={Styles.Rss} />
          </a>
        </div>
        <div id={Styles.Blog_box}>
          <Link href={`/blog`}>
            <span className={Styles.TooltipDown}>Blog</span>
            <Svg.FeatherIcon id={Styles.Blog} />
          </Link>
        </div>

        <div id={Styles.Kakuyomu_box}>
          <a
            href="https://kakuyomu.jp/users/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Kakuyomu</span>
            <Svg.KIcon id={Styles.Kakuyomu} />
          </a>
        </div>
        <div id={Styles.Poem_box}>
          <a
            href="https://utakatanka.jp/kajin/1102"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Tanka</span>
            <Svg.QuoteIcon id={Styles.Poem} />
          </a>
        </div>
        <div id={Styles.Spotify_box}>
          <a
            href="https://open.spotify.com/user/a0ndq420ky5fxfey4rpqx952w"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Spotify</span>
            <Svg.SpotifyIcon id={Styles.Spotify} />
          </a>
        </div>
        <div id={Styles.Keybase_box}>
          <a
            href="https://keybase.io/haxibami"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={Styles.TooltipUp}>Keybase</span>
            <Svg.KeybaseIcon id={Styles.Keybase} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
