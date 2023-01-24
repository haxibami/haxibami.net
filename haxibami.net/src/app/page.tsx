// import Image from "next/image";
// import Link from "next/link";

import Footer from "components/Footer";
// import * as Svg from "components/Svg";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";
import Styles from "styles/index.module.scss";

export default async function Home() {
  const file = await fetchPost("docs", "home");
  const { content } = await compiler(file);
  return (
    <div id={Styles.Wrapper}>
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
          <article>{content}</article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
