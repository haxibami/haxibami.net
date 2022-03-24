import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDocBySlug } from "lib/api";
import { MdToHtml } from "lib/parser";
import { HtmlToReact } from "lib/rehype-react";
import type { PageMetaProps } from "lib/interface";
import { ogpHost } from "lib/constant";
import MyHead from "components/MyHead";
import Styles from "styles/about.module.scss";
import ThemeChanger from "components/ThemeChanger";
import Footer from "components/Footer";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const doc = getDocBySlug("about", ["slug", "title", "content"]);

  const content = await MdToHtml(doc.content);

  const metaprops: PageMetaProps = {
    title: "私について",
    sitename: "haxibami.net",
    description: "自己紹介",
    ogImageUrl: encodeURI(`${ogpHost}/api/ogp?title=私について`),
    pageRelPath: "profile",
    pagetype: "article",
    twcardtype: "summary_large_image",
  };

  return {
    props: { metaprops, doc, content },
  };
};

const About: NextPage<Props> = ({ metaprops, doc, content }) => {
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...metaprops} />
      <header>
        <div id={Styles.HeaderBox}>
          <h2>
            <Link href={"/"}>
              <a>
                <span className={Styles.Red}>ha</span>
                <span className={Styles.Yellow}>xi</span>
                <span className={Styles.Green}>ba</span>
                <span className={Styles.Cyan}>mi</span>
                <span className={Styles.Blue}>.n</span>
                <span className={Styles.Magenta}>et</span>
              </a>
            </Link>
          </h2>
          <ThemeChanger />
        </div>
      </header>
      <main id={Styles.Main}>
        <div id={Styles.Card}>
          <div id={Styles.Icon}>
            <Image
              id={Styles.IconImage}
              src="/ogpicon.webp"
              alt="icon"
              width={175}
              height={175}
            />
          </div>
          <span id={Styles.Name}>
            <h1>{doc.title}</h1>
          </span>
        </div>
        <article>{HtmlToReact(content)}</article>
      </main>
      <Footer />
    </div>
  );
};

export default About;
