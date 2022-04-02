import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="なまあたたかくておいしい"
          href="https://www.haxibami.net/rss/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="なまあたたかくておいしい"
          href="https://www.haxibami.net/rss/atom.xml"
        />
        <link
          rel="alternate"
          type="application/json"
          title="なまあたたかくておいしい"
          href="https://www.haxibami.net/rss/feed.json"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
