import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css"
        />
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
