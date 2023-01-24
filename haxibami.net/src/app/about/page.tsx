import Image from "next/image";
import Link from "next/link";

import Footer from "components/Footer";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";
import Styles from "styles/about.module.scss";

import icon from "/public/icon_ange_glasses_512.webp";

export default async function About() {
  const file = await fetchPost("docs", "about");
  const { content, frontmatter } = await compiler(file);
  return (
    <div id={Styles.Wrapper}>
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
            <h1>{frontmatter?.title}</h1>
          </span>
        </div>
        <article>{content}</article>
      </main>
      <Footer />
    </div>
  );
}
