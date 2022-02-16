import React from "react";
import chromium from "chrome-aws-lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactDomServer from "react-dom/server";
import path from "path";
import fs from "fs";

const fullPath = path.resolve("./public");
const faviconPath = path.join(fullPath, "favicon.ico");
const favicon = fs.readFileSync(faviconPath).toString("base64");

type OgpInfo = {
  title: string | string[];
  date: string | string[];
};

const styles = `

@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap");
* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  background: #292433;
  font-family: sans-serif, "Noto Sans JP";
  font-size: 125%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: repeating-linear-gradient(to left bottom, transparent, transparent 46px, #d9989ccc 46px, #d9989ccc 92px, transparent 92px, transparent 138px, #a6b4decc 138px, #a6b4decc 184px);
}

#Wrapper {
  width: 1100px;
  height: 530px;
  background: white;
  display: flex;
  flex-direction: row;
  border-radius: 50px;
  background: #f3f3f6;
  box-shadow: 30px 30px 60px #1c192166, -10px -10px 20px #1c192166;
}

#Left {
  display: flex;
  flex-direction: column;
  width: 225px;
  height: 100%;
}
#Left::before {
  position: relative;
  top: 0;
  left: 210px;
  width: 30px;
  height: 15px;
  background: #292433;
  border-radius: 0 0 15px 15px;
  content: "";
}
#Left::after {
  position: relative;
  bottom: 0;
  left: 210px;
  width: 30px;
  height: 15px;
  background: #292433;
  border-radius: 15px 15px 0 0;
  content: "";
}
#Left img {
  margin: auto;
  margin-top: 25px;
  border-radius: 50%;
  border: 5px solid #8a8299;
}
#Left h3 {
  font-size: 175%;
  display: flex;
  align-items: center;
  width: 100px;
  writing-mode: vertical-rl;
  font-family: "Roboto mono", monospace;
  margin: auto;
}

#Right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  height: 100%;
  width: 883px;
  background-image: linear-gradient(to bottom, #1c192166, #1c192166 12px, transparent 12px, transparent 24px);
  background-size: 4px 24px;
  background-position: left top;
  background-repeat: repeat-y;
  gap: 20px;
}
#Right #Title {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 75px;
  margin-bottom: 0;
  overflow: hidden;
}
#Right #Title p {
  overflow: hidden;
  max-height: 100%;
}
#Right #Host {
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 75px;
  margin-top: 0;
  font-size: 150%;
}

/*# sourceMappingURL=ogp.css.map */
`;

function Content(ogpinfo: OgpInfo) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>
        <div id="Wrapper">
          <div id="Left">
            <img
              src={`data:image/png;base64,${favicon}`}
              alt="haxicon"
              width={125}
              height={125}
            />
            <h3>
              <p>{ogpinfo.date}</p>
            </h3>
          </div>
          <div id="Right">
            <h1 id="Title">
              <p>{ogpinfo.title}</p>
            </h1>
            <h2 id="Host">
              <p>@haxibami.net</p>
            </h2>
          </div>
        </div>
      </body>
    </html>
  );
}

const OgpGen = async (req: NextApiRequest, res: NextApiResponse) => {
  const chromePath = {
    production: await chromium.executablePath,
    development: "/opt/google/chrome/google-chrome",
    test: await chromium.executablePath,
  }[process.env.NODE_ENV];

  const viewport = { width: 1200, height: 630 };

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: viewport,
    executablePath: chromePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  const ogpinfo: OgpInfo = {
    title: req.query.title,
    date: req.query.date,
  };

  const markup = ReactDomServer.renderToStaticMarkup(Content(ogpinfo));
  const html = `<!doctype html>${markup}`;

  await page.setContent(html, { waitUntil: "networkidle2" });

  const image = await page.screenshot({ type: "png" });
  await browser.close();

  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");

  res.setHeader("Content-Type", "image/png");

  res.end(image);
};

export default OgpGen;
