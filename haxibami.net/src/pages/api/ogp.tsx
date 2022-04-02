import * as chromium from "playwright-aws-lambda";
import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactDomServer from "react-dom/server";
import path from "path";
import fs from "fs";
import OgpImage, { OgpInfo } from "components/OgpImage";

// full path resolve
const baseFullPath = path.resolve("./");

// image paths
const iconPath = path.join(baseFullPath, "public/icon_ange_glasses_192.webp");
const icon: string = fs.readFileSync(iconPath, "base64");

// font paths
const monopath = path.join(
  baseFullPath,
  "public/fonts/RobotoMono-Medium.woff2"
);
const mono = fs.readFileSync(monopath).toString("base64");

const notopath = path.join(
  baseFullPath,
  "public/fonts/NotoSansCJKjp-Bold.woff2"
);
const noto = fs.readFileSync(notopath).toString("base64");

const style = `
@font-face {
  font-family: "Noto Sans CJK JP";
  font-style: normal;
  font-weight: bold;
  src: url(data:font/woff2;charset=utf-8;base64,${noto}) format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  src: url(data:font/woff2;charset=utf-8;base64,${mono}) format("woff2");
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  background: #292433;
  font-family: "Noto Sans CJK JP", sans-serif;
  font-size: 125%;
  color: #d2ced9;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right bottom, #d9989c, #a6b4de);
}

#Wrapper {
  margin: 50px;
  background: white;
  grid-gap: 30px;
  border-radius: 30px;
  background: #1c1921;
  box-shadow: 10px 10px 20px rgba(28, 25, 33, 0.4),
    -10px -10px 20px rgba(28, 25, 33, 0.4);
  padding: 50px;
  display: grid;
  grid-template-rows: 280px 100px;
  grid-template-columns: 700px 250px;
  grid-template-areas: "Title Title" "Name Date";
}
#Wrapper #Title {
  font-size: 60px;
  grid-area: Title;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
#Wrapper #Title p {
  max-height: 100%;
  overflow-wrap: anywhere;
}
#Wrapper #Name {
  grid-area: Name;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
#Wrapper #Name img {
  margin-right: 20px;
  border-radius: 50%;
}
#Wrapper #Date {
  grid-area: Date;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: "Roboto Mono", monospace;
}
`;

const OgpGen = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const playwrightArgs = {
      production: {
        args: chromium.getChromiumArgs(true),
      },
      development: {
        executablePath: "/opt/google/chrome/google-chrome",
        headless: true,
        args: chromium.getChromiumArgs(false),
      },
      test: {},
    }[process.env.NODE_ENV];

    const viewport = { width: 1200, height: 630 };

    const browser = await chromium.launchChromium(playwrightArgs);
    const context = await browser.newContext({ viewport: viewport });
    const page = await context.newPage();
    await page.setExtraHTTPHeaders({
      "Accept-Language": "ja-JP",
    });

    const title = req.query.title ?? "";

    const date = req.query.date ?? "";

    const ogpinfo: OgpInfo = {
      title: title.toString(),
      date: date.toString(),
      icon: icon,
      style: style,
    };

    const markup = ReactDomServer.renderToStaticMarkup(
      <OgpImage {...ogpinfo} />
    );
    const html = `<!doctype html>${markup}`;

    await page.setContent(html);
    const image = await page.screenshot({ type: "png" });
    await browser.close();

    res.setHeader("Cache-Control", "s-maxage=5256000, stale-while-revalidate");
    res.setHeader("Content-Type", "image/png");

    res.end(image);
  } catch (error) {
    console.log("[Error]: ", error);
    res.status(500).send("Internal Server Error");
  }
};

export default OgpGen;
