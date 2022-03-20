import Styles from "./style.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Footer: React.VFC = () => {
  const date = new Date();
  return (
    <footer id={Styles.Footer}>
      <div id={Styles.FooterBox}>
        <div id={Styles.Container}>
          <span>©{date.getFullYear()} haxibami</span>
          <span id={Styles.Icons}>
            <Link href={"https://twitter.com/haxibami"}>
              <a>
                <FontAwesomeIcon icon={faTwitter as IconProp} width={30} />
              </a>
            </Link>
            <Link href={"https://github.com/haxibami"}>
              <a>
                <FontAwesomeIcon icon={faGithub as IconProp} width={30} />
              </a>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
