import React, { useContext } from "react";
import Context from "lib/store";
import Styles from "./style.module.scss";

export interface LinkWidgetProps {
  children: string;
}

const LinkWidget: React.VFC<LinkWidgetProps> = ({ children }) => {
  const { state } = useContext(Context);
  const target = state.metas.find((meta) => meta.url == children);
  if (target) {
    return (
      <div className={Styles.Wrapper}>
        <a href={target.url}>
          <div className={Styles.Widget}>
            <div className={Styles.Main}>
              <div className={Styles.Title}>{target.title}</div>
              <div className={Styles.Description}>{target.description}</div>
              <div className={Styles.Host}>
                <img src={target.icon} height={15} width={15} />
                {target.url.slice(8, target.url.indexOf("/", 8))}
              </div>
            </div>
            <div className={Styles.Image}>
              <img src={target.image} height={100} width={100} />
            </div>
          </div>
        </a>
      </div>
    );
  } else {
    return (
      <a href={children} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
};

export default LinkWidget;
