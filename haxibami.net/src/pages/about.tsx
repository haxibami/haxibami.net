import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";


import Footer from "components/Footer";
import MyHead from "components/MyHead";
import ThemeChanger from "components/ThemeChanger";
import { getDocBySlug } from "lib/api";
import { ogpHost } from "lib/constant";
import { MdToHtml } from "lib/parser";
import RehypeReact from "lib/rehype-react";
import Styles from "styles/about.module.scss";

import type { PageMetaProps } from "lib/interface";

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
              src="/icon_ange_glasses_512.webp"
              alt="icon"
              width={175}
              height={175}
            />
          </div>
          <span id={Styles.Name}>
            <h1>{doc.title}</h1>
          </span>
        </div>
        <article>{RehypeReact(content)}</article>
      </main>
      <Footer />
    </div>
  );
};

export default About;
