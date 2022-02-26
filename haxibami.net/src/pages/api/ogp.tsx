import React from "react";
import chromium from "chrome-aws-lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactDomServer from "react-dom/server";
import path from "path";
import fs from "fs";
import OgpImage, { OgpInfo } from "components/OgpImage/OgpImage";

// full path resolve
const baseFullPath = path.resolve("./");

// image paths
const faviconPath = path.join(baseFullPath, "public/favicon.ico");
const favicon: string = fs.readFileSync(faviconPath, "base64");

// style paths
const stylePath = path.join(baseFullPath, "src/styles/ogp.css");
const style = fs.readFileSync(stylePath, "utf-8");

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

  const markup = ReactDomServer.renderToStaticMarkup(<OgpImage {...ogpinfo} />);
  const html = `<!doctype html>${markup}`;

  await page.setContent(html, { waitUntil: "networkidle2" });

  const image = await page.screenshot({ type: "png" });
  await browser.close();

  res.setHeader("Cache-Control", "s-maxage=5256000, stale-while-revalidate");

  res.setHeader("Content-Type", "image/png");

  res.end(image);
};

export default OgpGen;
