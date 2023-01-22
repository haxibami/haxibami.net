import { ArticleIcon, LinkIcon } from "components/Svg";

import Styles from "./style.module.scss";

export interface LinkCardProps {
  url: string;
  title: string;
  description: string;
  og: string | undefined;
  icon: string | undefined;
}

const LinkCard: React.FC<LinkCardProps> = (props) => {
  const { url, title, description, og, icon } = props;
  return (
    <div className={Styles.Wrapper}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <span className={Styles.Widget}>
          <span className={Styles.Main}>
            <span className={Styles.Title}>{title}</span>
            <span className={Styles.Description}>{description}</span>
            <span className={Styles.Host}>
              {icon ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={icon} height={15} width={15} alt="" loading="lazy" />
              ) : (
                <LinkIcon id={Styles.Favicon} />
              )}
              {url.indexOf("/", 8) != -1
                ? url.slice(8, url.indexOf("/", 8))
                : url.slice(8)}
            </span>
          </span>
          <span className={Styles.Image}>
            {og ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={og}
                height={105}
                width={200}
                alt="og image"
                loading="lazy"
              />
            ) : (
              <span className={Styles.NotFound}>
                <ArticleIcon id={Styles.NotFoundIcon} />
              </span>
            )}
          </span>
        </span>
      </a>
    </div>
  );
};

export default LinkCard;
