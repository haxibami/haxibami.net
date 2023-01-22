import type { InferGetStaticPropsType, NextPage } from "next";
// import Image from "next/image";
// import Link from "next/link";

import { MDXRemote } from "next-mdx-remote";

import Footer from "components/Footer";
import MdxComponent from "components/MdxComponent";
import MyHead from "components/MyHead";
// import * as Svg from "components/Svg";
import { compileMdx } from "lib/compile";
import { HOST } from "lib/constant";
import { getPost } from "lib/fs";
import Styles from "styles/index.module.scss";

import type { PageMetaData } from "lib/interface";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const file = getPost("home", "docs");

  const mdxSource = await compileMdx(file);

  return {
    props: { mdxSource },
  };
};

const Home: NextPage<Props> = ({ mdxSource }) => {
  const pageMetaData: PageMetaData = {
    title: "haxibami",
    sitename: `${HOST}`,
    description: "haxibamiのホームページ",
    ogImageUrl: `https://${HOST}/icon_ange_glasses_512.webp`,
    pageRelPath: "",
    pagetype: "website",
    twcardtype: "summary",
  };
  return (
    <div id={Styles.Wrapper}>
      <MyHead {...pageMetaData} />
      <main className={Styles.Main}>
        <div className={Styles.Container}>
          <div className={Styles.Title}>
            <div className={Styles.Box}>
              <h2>«who?»</h2>
              <h1>HAXIBAMI</h1>
            </div>
          </div>
          <div className={Styles.Placeholder} />
          <div className={Styles.Desc}>
            <h3>
              code,
              <br />
              write,
              <br />
              and read.
            </h3>
          </div>
        </div>
        <div id={Styles.ArticleBox}>
          <article>
            <MDXRemote {...mdxSource} components={MdxComponent} />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
