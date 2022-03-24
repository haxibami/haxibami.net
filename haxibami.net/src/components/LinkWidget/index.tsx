import Image from "next/image";
import type { LinkWidgetMeta } from "lib/interface";
import Styles from "./style.module.scss";

export interface LinkWidgetProps {
  children: string;
}

const LinkWidget: React.VFC<LinkWidgetProps> = (props) => {
  const { children } = props;
  const meta: LinkWidgetMeta = JSON.parse(children);
  return (
    <div className={Styles.Wrapper}>
      <a href={meta.url}>
        <div className={Styles.Widget}>
          <div className={Styles.Main}>
            <div className={Styles.Title}>{meta.title}</div>
            <div className={Styles.Description}>{meta.description}</div>
            <div className={Styles.Host}>
              <img
                src={meta.icon}
                height={15}
                width={15}
                alt="icon"
                loading="lazy"
              />
              {meta.url.indexOf("/", 8) != -1
                ? meta.url.slice(8, meta.url.indexOf("/", 8))
                : meta.url.slice(8)}
            </div>
          </div>
          <div className={Styles.Image}>
            <img
              src={meta.image}
              height={105}
              width={200}
              alt="image"
              loading="lazy"
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default LinkWidget;
