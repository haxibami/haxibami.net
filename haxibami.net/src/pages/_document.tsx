import { Html, Head, Main, NextScript } from "next/document";

import { SITEDATA, HOST } from "lib/constant";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={SITEDATA.blog.title}
          href={`https://${HOST}/rss/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={SITEDATA.blog.title}
          href={`https://${HOST}/rss/atom.xml`}
        />
        <link
          rel="alternate"
          type="application/json"
          title={SITEDATA.blog.title}
          href={`https://${HOST}/rss/feed.json`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
