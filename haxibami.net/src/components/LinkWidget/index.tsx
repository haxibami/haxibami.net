import Styles from "./style.module.scss";

export interface LinkWidgetProps {
  url: string;
  title: string;
  description: string;
  og: string;
  icon: string;
}

const LinkWidget: React.FC<LinkWidgetProps> = (props) => {
  const { url, title, description, og, icon } = props;
  return (
    <div className={Styles.Wrapper}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <span className={Styles.Widget}>
          <span className={Styles.Main}>
            <span className={Styles.Title}>{title}</span>
            <span className={Styles.Description}>{description}</span>
            <span className={Styles.Host}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} height={15} width={15} alt="" loading="lazy" />
              {url.indexOf("/", 8) != -1
                ? url.slice(8, url.indexOf("/", 8))
                : url.slice(8)}
            </span>
          </span>
          <span className={Styles.Image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={og} height={105} width={200} alt="image" loading="lazy" />
          </span>
        </span>
      </a>
    </div>
  );
};

export default LinkWidget;
