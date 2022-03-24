import Styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer: React.VFC = () => {
  const date = new Date();
  return (
    <footer id={Styles.Footer}>
      <div id={Styles.FooterBox}>
        <div id={Styles.Container}>
          <span>©{date.getFullYear()} haxibami</span>
          <span id={Styles.Icons}>
            <a
              href={"https://twitter.com/haxibami"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} size={"2x"} />
            </a>
            <a
              href={"https://twitter.com/haxibami"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size={"2x"} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
