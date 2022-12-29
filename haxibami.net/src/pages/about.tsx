import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { MDXRemote } from "next-mdx-remote";

import Footer from "components/Footer";
import MdxComponent from "components/MdxComponent";
import MyHead from "components/MyHead";
import ThemeChanger from "components/ThemeChanger";
import { compileMdx } from "lib/compile";
import { OGPHOST } from "lib/constant";
import { getPost } from "lib/fs";
import Styles from "styles/about.module.scss";

import icon from "../../public/icon_ange_glasses_512.webp";

import type { PageMetaData } from "lib/interface";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const file = getPost("about", "docs");

  const mdxSource = await compileMdx(file);

  return {
    props: { mdxSource },
  };
};

const About: NextPage<Props> = ({ mdxSource }) => {
  const pageMetaData: PageMetaData = {
    title: "私について",
    sitename: "haxibami.net",
    description: `${mdxSource.frontmatter?.description}`,
    ogImageUrl: encodeURI(
      `${OGPHOST}/api/ogp?title=${mdxSource.frontmatter?.jatitle}`
    ),
    pageRelPath: "about",
    pagetype: "article",
    twcardtype: "summary_large_image",
  };
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...pageMetaData} />
      <header>
        <div id={Styles.HeaderBox}>
          <h2>
            <Link href={"/"}>
              <span className={Styles.Red}>ha</span>
              <span className={Styles.Yellow}>xi</span>
              <span className={Styles.Green}>ba</span>
              <span className={Styles.Cyan}>mi</span>
              <span className={Styles.Blue}>.n</span>
              <span className={Styles.Magenta}>et</span>
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
              src={icon}
              alt="icon"
              placeholder="blur"
            />
          </div>
          <span id={Styles.Name}>
            <h1>{mdxSource.frontmatter?.title}</h1>
          </span>
        </div>
        <article>
          <MDXRemote {...mdxSource} components={MdxComponent} />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default About;
