import * as playwright from "playwright-aws-lambda";
import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactDomServer from "react-dom/server";
import path from "path";
import fs from "fs";
import OgpImage, { OgpInfo } from "components/OgpImage";

// full path resolve
const baseFullPath = path.resolve("./");

// image paths
const faviconPath = path.join(baseFullPath, "public/favicon.ico");
const favicon: string = fs.readFileSync(faviconPath, "base64");

// style paths
const stylePath = path.join(baseFullPath, "src/styles/ogp.css");
const style = fs.readFileSync(stylePath, "utf-8");

const OgpGen = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const playwrightArgs = {
      production: {
        args: playwright.getChromiumArgs(true),
      },
      development: {
        executablePath: "/opt/google/chrome/google-chrome",
        headless: true,
        args: playwright.getChromiumArgs(false),
      },
      test: {},
    }[process.env.NODE_ENV];

    const viewport = { width: 1200, height: 630 };

    await playwright.loadFont(
      "https://raw.githubusercontent.com/haxibami/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Bold.woff2"
    );

    await playwright.loadFont(
      "https://raw.githubusercontent.com/googlefonts/RobotoMono/main/fonts/ttf/RobotoMono-Medium.ttf"
    );

    const browser = await playwright.launchChromium(playwrightArgs);
    const page = await browser.newPage({ viewport: viewport });

    const longtitle =
      typeof req.query.title !== "undefined" ? req.query.title.toString() : "";

    const date =
      typeof req.query.date !== "undefined" ? req.query.date.toString() : "";

    const ogpinfo: OgpInfo = {
      title: longtitle,
      date: date,
      icon: favicon,
      style: style,
    };

    const markup = ReactDomServer.renderToStaticMarkup(
      <OgpImage {...ogpinfo} />
    );
    const html = `<!doctype html>${markup}`;

    await page.setContent(html, { waitUntil: "networkidle" });
    const image = await page.screenshot({ type: "png" });
    await browser.close();

    res.setHeader("Cache-Control", "s-maxage=5256000, stale-while-revalidate");
    res.setHeader("Content-Type", "image/png");

    res.end(image);
  } catch (error) {
    console.error("[Error]: ", error);
    res.status(404).json({ message: "cannot render og-image" });
  }
};

export default OgpGen;
