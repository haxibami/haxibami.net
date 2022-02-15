import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ogpHost } from "lib/ogpprops";
import MyHead, { MetaProps } from "components/MyHead/MyHead";
import Styles from "styles/about.module.scss";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const metaprops: MetaProps = {
    title: "haxibami.netについて",
    sitename: "haxibami.net",
    description: "このサイトの概略",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=このサイトについて`),
    pageRelPath: "about",
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: { metaprops },
  };
};

const About: NextPage<Props> = ({ metaprops }) => {
  return (
    <div className={Styles.container}>
      <MyHead {...metaprops} />
      <main className={Styles.main}>
        <div className={Styles.console}>
          <div className={Styles.titlebar}>
            <span>About this site: hash</span>{" "}
            <div className={Styles.windowbutton}></div>
          </div>
          <div className={Styles.console_text}>
            <br />
            <p>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami.net</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Vercel</b>
              </span>
              <br />
              └─<span className={Styles.magenta}>{">>"}</span>{" "}
              <span className={Styles.typing}>
                <span className={Styles.green}>haxfetch</span>{" "}
                <span className={Styles.cyan}>--system</span>
              </span>
            </p>
            <br />
            <p className={Styles.info}>
              <span className={Styles.icon_wrapper}>
                <Link href="/profile">
                  <a>
                    <Image
                      className={Styles.icon}
                      src="/favicon_glasses.ico"
                      alt="haxibami Logo"
                      width={150}
                      height={150}
                    />
                  </a>
                </Link>{" "}
              </span>
              <span className={Styles.infotext}>
                <p>
                  <span className={Styles.cyan}>haxibami.net</span>@
                  <span className={Styles.cyan}>Vercel</span>
                </p>
                <p>---------------------</p>
                <p>
                  <span className={Styles.blue}>Framework</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> Next.js, React
                </p>
                <p>
                  <span className={Styles.blue}>Lang</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> TypeScript,
                  scss
                </p>
                <p>
                  <span className={Styles.blue}>Host</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> Vercel
                </p>
                <p>
                  <span className={Styles.blue}>Domain</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> Google Domains
                </p>
                <p>
                  <span className={Styles.blue}>Repo</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> Github:{" "}
                  <a href="https://github.com/haxibami/haxibami.net">
                    haxibami/haxibami.net
                  </a>
                </p>
                <p>
                  <span className={Styles.blue}>Comment</span>{" "}
                  <span className={Styles.magenta}>{">>"}</span> To get info
                  about me, visit{" "}
                  <span className={Styles.green}>
                    <Link href="/profile">
                      <a>PROFILE</a>
                    </Link>
                  </span>{" "}
                  page.
                </p>
              </span>
            </p>

            <br />
            <p>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami.net</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Vercel</b>
              </span>
              <br />
              └─<span className={Styles.magenta}>{">>"}</span>{" "}
              <span className={Styles.green}>what</span> are these{" "}
              <span className={Styles.magenta}>brand-icons</span>?
            </p>
            <br />
            <p>
              Svg icons (/*.svg) are licensed under Creative Commons 4.0
              International license(CC BY 4.0), as stated in the{" "}
              <Link href="https://fontawesome.com/license/free">
                <a>
                  {"<"}FontAwesome Free Icons License{">"}
                </a>
              </Link>
              .
            </p>

            <br />
            <p>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami.net</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Vercel</b>
              </span>
              <br />
              └─<span className={Styles.magenta}>{">>"}</span>{" "}
              <span className={Styles.green}>why</span>{" "}
              <span className={Styles.magenta}>window-buttons</span> on the{" "}
              <span className={Styles.yellow}>right</span>?
            </p>
            <br />
            <p>
              Remember, not all computers are running MacOS (or Windows). Some
              GTK theme on Linux has this kind of style.
            </p>

            <br />
            <p>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami.net</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Vercel</b>
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

export default About;
