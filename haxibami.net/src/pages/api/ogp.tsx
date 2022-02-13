import React from "react";
import chromium from "chrome-aws-lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactDomServer from "react-dom/server";

type OgpInfo = {
  title: string | string[];
  date: string | string[];
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
  html, body, #Wrapper {
    width: 100%;
    height: 100%;
    background: #1c1921;
    color: #d2ced9;
    font-family: 'Noto Sans JP', sans-serif;
  }

  #Wrapper {
    font-size: 225%;
    background: #1c1921;
    color: #d2ced9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  #Title {
    max-width: 90%;
    overflow-wrap: anywhere;
    overflow-y: hidden;
  }

  #Bottom {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px
  }
`;

function Content(ogpinfo: OgpInfo) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>
        <div id="Wrapper">
          <div id="Title">
            <h1>{ogpinfo.title}</h1>
          </div>
          <div id="Bottom">
            {/*<h2>{ogpinfo.date}</h2>*/}
            <span>
              <img
                src="https://haxibami.net/favicon.ico"
                alt="haxicon"
                width={200}
                height={200}
              />
              {/*<Image
                src="/favicon.ico"
                alt="haxicon"
                width={200}
                height={200}
              />*/}
            </span>
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
