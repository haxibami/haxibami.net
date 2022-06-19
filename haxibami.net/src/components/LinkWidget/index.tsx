import Styles from "./style.module.scss";

import type { LinkWidgetMeta } from "lib/interface";

export interface LinkWidgetProps {
  children: string;
}

const LinkWidget: React.FC<LinkWidgetProps> = (props) => {
  const { children } = props;
  const meta: LinkWidgetMeta = JSON.parse(children);
  return (
    <div className={Styles.Wrapper}>
      <a href={meta.url} target="_blank" rel="noopener noreferrer">
        <div className={Styles.Widget}>
          <div className={Styles.Main}>
            <div className={Styles.Title}>{meta.title}</div>
            <div className={Styles.Description}>{meta.description}</div>
            <div className={Styles.Host}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={meta.icon}
                height={15}
                width={15}
                alt=""
                loading="lazy"
              />
              {meta.url.indexOf("/", 8) != -1
                ? meta.url.slice(8, meta.url.indexOf("/", 8))
                : meta.url.slice(8)}
            </div>
          </div>
          <div className={Styles.Image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
