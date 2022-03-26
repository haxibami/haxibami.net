import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
          integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
          crossOrigin="anonymous"
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
