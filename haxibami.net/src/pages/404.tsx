import type { NextPage } from "next";
import Link from "next/link";

import Styles from "styles/404.module.scss";

const NotFound: NextPage = () => {
  return (
    <div className={Styles.container}>
      <main className={Styles.main}>
        <div className={Styles.console}>
          <div className={Styles.titlebar}>
            <span>404: hash</span> <div className={Styles.windowbutton}></div>
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
                <b>Internet-2.0</b>
              </span>
              <br />
              └─<span className={Styles.magenta}>{">>"}</span>{" "}
              <span className={Styles.typing}>
                <span className={Styles.green}>haxibami</span>{" "}
                <span className={Styles.yellow}>show</span> status
              </span>
            </p>
            <br />
            <p>
              <span className={Styles.red}>
                <b>
                  <span className={Styles.error}>[haxibami.net ERROR!]</span>
                </b>
              </span>
            </p>
            <p>
              <span className={Styles.notfound}>
                404 not found. Go back to <Link href="/">Home</Link>
              </span>
            </p>

            <br />
            <p className={Styles.newprompt}>
              ┌──{" "}
              <span className={Styles.path}>
                <b>~/haxibami.net</b>
              </span>{" "}
              on{" "}
              <span className={Styles.cyan}>
                <b>Internet-2.0</b>
              </span>
              <br />
              └─<span className={Styles.red}>{">>"}</span>{" "}
              <span className={Styles.blinking}></span>
            </p>

            <br />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
