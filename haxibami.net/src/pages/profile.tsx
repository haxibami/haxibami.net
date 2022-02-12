import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Styles from "styles/Profile.module.scss";
import MyHead, { MetaProps } from "components/myhead";
import { ogpHost } from "lib/ogpprops";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const metaprops: MetaProps = {
    title: "私について",
    sitename: "haxibami.net",
    description: "自己紹介",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=私について`),
    pageRelPath: "profile",
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: { metaprops },
  };
};

const Profile: NextPage<Props> = ({ metaprops }) => {
  return (
    <div className={Styles.container}>
      <MyHead {...metaprops} />
      <main className={Styles.main}>
        <div className={Styles.console}>
          <div className={Styles.titlebar}>
            <span>About me: hash</span>{" "}
            <div className={Styles.windowbutton}></div>
          </div>
          <div className={Styles.console_text}>
            <br />
            <p>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Internet-2.0</b>
              </span>
              <br />
              └─<span className={Styles.magenta}>{">>"}</span>{" "}
              <span className={Styles.typing}>
                <span className={Styles.green}>haxfetch</span>
              </span>
            </p>
            <br />
            <p className={Styles.info}>
              <span className={Styles.icon_wrapper}>
                <Link href="/">
                  <a>
                    <Image
                      className={Styles.icon}
                      src="/favicon.ico"
                      alt="haxibami Logo"
                      width={150}
                      height={150}
                    />
                  </a>
                </Link>
              </span>
              <span className={Styles.infotext}>
                <p>
                  <span className={Styles.cyan}>haxibami</span>@
                  <span className={Styles.cyan}>Internet-2.0</span>
                </p>
                <p>---------------------</p>
                <p>
                  <span className={Styles.blue}>Name</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> haxibami
                  (IPA:[haʃibamʲi], 漢字:端食)
                </p>
                <p>
                  <span className={Styles.blue}>Lang</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span>{" "}
                  {"Japanese (learning English & Russian)"}
                </p>
                <p>
                  <span className={Styles.blue}>Country</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> Japan
                </p>
                <p>
                  <span className={Styles.blue}>Org</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span>{" "}
                  {
                    "The Univ. of Tokyo Junior Division, Humanity and Social sciences I (B1)"
                  }
                </p>
                <p>
                  <span className={Styles.blue}>Recently</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> 🍅🗡👑✨{" "}
                  <span className={Styles.yellow}>
                    <a href="https://cinema.revuestarlight.com">
                      starlightened!
                    </a>
                  </span>
                </p>
              </span>
            </p>

            <br />
            <p>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Internet-2.0</b>
              </span>
              <br />
              └─<span className={Styles.magenta}>{">>"}</span>{" "}
              <span className={Styles.green}>list</span>{" "}
              <span className={Styles.magenta}>interests</span>
            </p>
            <br />
            <p>
              Things that are fundamental to human (ex: cognitive science,
              philosophy)
            </p>
            <p>
              also I like: geography, geology, jurisprudence, computer systems.
            </p>
            <br />
            <p>
              人間存在の根源に関わる領域に興味があります（認知科学、哲学など）。ほか、地理や地学、法、歴史、計算機なども好きです。
            </p>

            <br />
            <p>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Internet-2.0</b>
              </span>
              <br />
              └─<span className={Styles.magenta}>{">>"}</span>{" "}
              <span className={Styles.green}>list</span>{" "}
              <span className={Styles.magenta}>awards</span>
            </p>
            <br />
            <p>
              {
                "Japan Geography Olympiad: 科学地理オリンピック日本選手権 '19銀, '20&'21金"
              }
            </p>

            <br />
            <p>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Internet-2.0</b>
              </span>
              <br />
              └─<span className={Styles.magenta}>{">>"}</span>{" "}
              <span className={Styles.blinking}></span>
            </p>

            <br />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
