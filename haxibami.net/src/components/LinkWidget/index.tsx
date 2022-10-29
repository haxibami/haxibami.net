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
        <div className={Styles.Widget}>
          <div className={Styles.Main}>
            <div className={Styles.Title}>{title}</div>
            <div className={Styles.Description}>{description}</div>
            <div className={Styles.Host}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} height={15} width={15} alt="" loading="lazy" />
              {url.indexOf("/", 8) != -1
                ? url.slice(8, url.indexOf("/", 8))
                : url.slice(8)}
            </div>
          </div>
          <div className={Styles.Image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={og} height={105} width={200} alt="image" loading="lazy" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default LinkWidget;
