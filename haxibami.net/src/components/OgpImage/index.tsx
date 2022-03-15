import React from "react";

export interface OgpInfo {
  title: string;
  date: string;
  icon: string;
  style: string;
}

const OgpImage: React.VFC<OgpInfo> = (ogpinfo) => {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: ogpinfo.style }} />
      </head>
      <body>
        <div id="Wrapper">
          <h1 id="Title">
            <p>{ogpinfo.title}</p>
          </h1>
          <div id="Name">
            <img
              src={`data:image/png;base64,${ogpinfo.icon}`}
              alt="haxicon"
              width={100}
              height={100}
            />
            <h2 id="Host">
              <p>haxibami.net</p>
            </h2>
          </div>
          <h2 id="Date">
            <p>{ogpinfo.date}</p>
          </h2>
        </div>
      </body>
    </html>
  );
};

export default OgpImage;
