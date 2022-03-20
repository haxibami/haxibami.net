import React from "react";

export interface OgpInfo {
  title: string;
  date: string;
  icon: string;
  style: string;
}

const OgpImage: React.VFC<OgpInfo> = (props) => {
  const { title, date, icon, style } = props;
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </head>
      <body>
        <div id="Wrapper">
          <h1 id="Title">
            <p>{title}</p>
          </h1>
          <div id="Name">
            <img
              src={`data:image/png;base64,${icon}`}
              alt="haxicon"
              width={100}
              height={100}
            />
            <h2 id="Host">
              <p>haxibami.net</p>
            </h2>
          </div>
          <h2 id="Date">
            <p>{date}</p>
          </h2>
        </div>
      </body>
    </html>
  );
};

export default OgpImage;
