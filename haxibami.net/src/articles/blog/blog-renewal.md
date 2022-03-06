---
slug: "blog-renewal"
title: "Next.jsでブログをつくった"
date: "20220220"
tags: ["tech", "web", "nextjs"]
---

以前から haxibami.net 自体は公開していたが、[謎の木](https://www.haxibami.net)が生えているだけの自己紹介サイトでしかなかった。今回は`/blog`以下にブログ機能を付けたので、その話。

## 基盤

### フレームワーク

Next.js + TypeScript + Sass (SCSS, CSS modules)。

TypeScript はまったくもってよくわからないが、型チェックに何度も助けられた。Neovim で coc.nvim を使って書いていると、coc-tsserver のおかげで書いた瞬間からエラーに気づけるのでかなり体験が良い。CSS modules と SCSS は出会ったときにいたく感動して以来ずっと使っているが、{追い風}^(Tailwind)が吹いている感じではないので、いずれ別のものに乗り換えるかもしれない。

### ホスティング・ビルド

素直に Vercel に投げた。またの名を囲い込まれともいう。ただし Vercel 側のビルド回数を消費したくないので、ビルド前のテストは GitHub Actions にしてある。ガンガン CI を回して Microsoft を破産させよう！

## 機能

### Markdown まわり

われわれには先人の記憶というものがあり、すなわちこの手のサイトは記事管理が億劫になった時点で**エタる**。放置された「なんたらの部屋」、消えて還らない借りドメイン、むなしく刻む入室カウンターを眺めるたびに、せめて記事くらいは慣れたファイル形式で楽に引き継ぎたいと思うようになった。そういうわけで Markdown（内容管理） + tsx（テンプレートエンジン）。Markdown ならそう簡単には廃れないだろうし、そのまま別サービスにも投げ込める。いまはヘッドレス CMS とかいうのもあるらしい（全然知らない）が、個人レベルでは Git Repo ひとつで管理できたほうがやっぱり楽だ。

Next.js から Markdown を扱う方法は[公式](https://nextjs.org/blog/markdown)でも取り上げられている。具体的には`remark`や`rehype`関連のパッケージを使うのだが、この remark と rehype がすごい。ともに unified というインターフェースの傘下にあって、このもとで`mdast`（Markdown の構文木）や`hast`（HTML の構文木）を相互変換したり、特定の要素に対してカスタム処理を実行できる。関連プラグインも充実しており、やりたいことが既存のプロジェクトの組み合わせで実現できてしまう。以下、使用したツールと実現できた機能を書いておく。

#### Frontmatter

[grey-matter](https://github.com/jonschlinkert/gray-matter)で取り出した。これは unified の処理ではない。

```md
---
slug: "blog-renewal"
title: "Next.jsでブログをつくった"
date: "20220214"
tags: ["tech", "web", "nextjs"]
---

## hoge...
```

#### GitHub Flavored Markdown

[`remark-gfm`](https://github.com/remarkjs/remark-gfm)で対応。

```md
| 表を     | 作る       |
| -------- | ---------- |
| たとえば | このように |
| 要素を   | 増やす     |

https://www.haxibami.net みたいな生のリンクも置けるし

- こうやって
  - リストが書ける。さらに、[^1]

[^1]: 脚注も使える
```

| 表を     | 作る       |
| -------- | ---------- |
| たとえば | このように |
| 要素を   | 増やす     |

https://www.haxibami.net みたいな生のリンクも置けるし

- こうやって
  - リストが書ける。さらに、[^1]

[^1]: 脚注も使える

#### 絵文字表示

[`remark-emoji`](https://github.com/rhysd/remark-emoji)で変換。

```md
:v:
```

が、

:v:

になる。

#### 数式表示

[`remark-math`](https://github.com/remarkjs/remark-math)と[`rehype-katex`](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)を噛ませる。

```md
$$
( \sum_{k=1}^{n} a_k b_k )^2 \leq ( \sum_{k=1}^{n} {a_k}^2 ) ( \sum_{k=1}^{n} {b_k}^2 )
$$
```

$$
( \sum_{k=1}^{n} a_k b_k )^2 \leq ( \sum_{k=1}^{n} {a_k}^2 ) ( \sum_{k=1}^{n} {b_k}^2 )
$$

$e^{i\pi} + 1 = 0$ のようなインライン数式もいける。手動でフォントを設置する必要はないが、KaTeX 用 CSS の挿入が必要。`pages/_document.tsx`で読み込んでいる。

```tsx
// pages/_document.tsx

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

#### ルビ

既に[remark-ruby](https://github.com/laysent/remark-ruby)というパッケージがルビを実装しているが、メンテナンスがされておらず依存関係と API が古くなっていた（主に`remark-parse`まわり）。そのため別パッケージ（[remark-jaruby](https://github.com/haxibami/remark-jaruby)）を実装した。

元のパッケージ自体が`remark-parse`の中身である[micromark](https://github.com/micromark/micromark)に介入して処理を行っていたので、パーサ部分（[micromark-extension-jaruby](https://github.com/haxibami/micromark-extension-jaruby)）、構文木操作部分（[mdast-util-jaruby](https://github.com/haxibami/mdast-util-jaruby)）の拡張機能に分割し、これらを`remark-jaruby`から参照している。

書式は元のパッケージのものを踏襲した。

```md
昨日午後、{†聖剣†}^(エクスカリバー)を振り回す{全裸中年男性}^(無敵の人)が出現し……
```

昨日午後、{†聖剣†}^(エクスカリバー)を振り回す{全裸中年男性}^(無敵の人)が出現し……

#### 内容プレビュー

お気づきかはわからないが、[トップ](https://haxibami.net/blog)の記事タイルには内容のプレビューを表示している。このために生の Markdown を流し込むのも気が引けたので、なんとかして plaintext 形式に変換できないかと考えていたら、[`strip-markdown`](https://github.com/remarkjs/strip-markdown)というのがあった。これで見出し・引用等を除いた冒頭 200 字を抽出している。

#### シンタックスハイライト

最初は[prism.js](https://prismjs.com)を`babel-plugin-prismjs`から使っていたが、使えるカラースキームがあまりに少なかったため[shiki](https://shiki.matsu.io)に変更した。公式サイトにある通りこちらは VSCode のカラースキームファイルが流用できる。せっかくなので自作の[urara-vscode](https://github.com/haxibami/urara-vscode)を使用してみた。

以上を合わせたメソッドチェーンが以下。

```ts
// lib/parser.ts

import { join } from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import remarkMath from "remark-math";
import remarkJaruby from "remark-jaruby";
import rehypeKatex from "rehype-katex";
import * as shiki from "shiki";
import rehypeShiki from "@leafac/rehype-shiki";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import stripMarkdown from "strip-markdown";
import remarkStringify from "remark-stringify";

// Get shiki theme file (`src/styles/shiki/${themename}.json`) full path
const getThemePath = (themename: string) =>
  join(process.cwd(), "src/styles/shiki", `${themename}.json`);

// Convert Markdown to HTML
export const MdToHtml = async (md: string) => {
  const myShikiTheme = await shiki.loadTheme(getThemePath("urara-color-theme"));
  const result = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(emoji)
    .use(remarkMath)
    .use(remarkJaruby)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: myShikiTheme }),
    })
    .use(rehypeStringify)
    .processSync(md);

  return result.toString();
};

// Convert Markdown to plaintext
export const MdStrip = async (md: string) => {
  const result = unified()
    .use(remarkParse)
    .use(stripMarkdown, {
      remove: ["heading", "list", "blockquote", "code", "image"],
    })
    .use(remarkStringify)
    .processSync(md);

  return result.toString();
};
```

変なファイル処理が入っているのは、shiki がテーマファイルを読み込むにあたって**自分のインストールされた位置**（メインプロジェクトの`node_modules`以下）からの相対パスか、ファイルシステムの絶対パスかのいずれかしか受け付けないため。

#### 引用

デフォルトで`<blockquote>`タグに変換されるため、手動でスタイリングした。

```md
> 星屑落ちて 華は散っても  
> キラめく舞台に 生まれて変わる  
> 新たな私は 未知なる運命  
> 新たな私は まだ見ぬ戯曲  
> 愛城華恋は 舞台に一人  
> 愛城華恋は 次の舞台へ
```

> 星屑落ちて 華は散っても  
> キラめく舞台に 生まれて変わる  
> 新たな私は 未知なる運命  
> 新たな私は まだ見ぬ戯曲  
> 愛城華恋は 舞台に一人  
> 愛城華恋は 次の舞台へ

[わかります](https://cinema.revuestarlight.com)。:giraffe_face:

以上の処理で、はてブや Qiita、Zenn あたりと似た書き心地になった。

### 動的 OGP 画像の自動生成

ページをシェアしたときにただのベタ貼りリンクにならず、モコッとタイルが生えてくるあれ。自分は Vercel のサーバレス関数機能を使って

1. ヘッドレス Chromium を起動
2. クエリパラメータ（記事タイトル・更新日）に応じた React コンポーネントを生成
3. `renderToStaticMarkup`で静的 HTML に変換
4. スクリーンショットを撮影

する手順で実現した。

私の環境ではなぜか`playwright-aws-lambda`が動かなかったので、[`chrome-aws-lambda`](https://github.com/alixaxel/chrome-aws-lambda)と puppeteer を使った。

```tsx
// pages/api/ogp.tsx

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

  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");

  res.setHeader("Content-Type", "image/png");

  res.end(image);
};

export default OgpGen;
```

表示用のコンポーネントとスタイリングは別ファイルに分割した。自力で書いたぶん、デザインの自由度は高い。

```tsx
// components/OgpImage/OgpImage.tsx

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
```

```css
/* styles/ogp.css, compiled from styles/ogp.scss */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap");
@font-face {
  font-family: "Noto Sans CJK JP";
  font-style: normal;
  font-weight: bold;
  src: url("https://raw.githubusercontent.com/haxibami/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Bold.woff2")
    format("woff2");
}
* {
  margin: 0;
  padding: 0;
  font-display: swap;
}

html,
body {
  width: 100%;
  height: 100%;
  background: #292433;
  font-family: "Noto Sans CJK JP", "Noto Sans JP", sans-serif;
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
  box-shadow: 10px 10px 20px #1c192166, -10px -10px 20px #1c192166;
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
  align-items: center;
  gap: 20px;
}
#Wrapper #Name img {
  border-radius: 50%;
}
#Wrapper #Date {
  grid-area: Date;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: "Roboto Mono", monospace;
}

/*# sourceMappingURL=ogp.css.map */
```

問題は Vercel の実行時間制限（5 秒）と容量制限（50MB）だ。実行時間はともかく、向こうの環境（AWS Lambda 相当）には日本語フォントが入っていないので、そのインストールも必要になる。今回は Web フォントでどうにかした。

![普通にオーバーしてるのに動いてる](/image/lambda-fn.png)

Vercel のログによれば容量はややオーバーしているのになぜか動いている。優しいな〜

### サイトマップ生成

[next-sitemap](https://github.com/iamvishnusankar/next-sitemap)を使ったところ、`sitemap-0.xml`の`<lastmod>`がすべて最終ビルド時を示していて発狂しかかった。この挙動はある意味正しく、なぜかといえば自分が手を触れていないページでもビルドするたびに**静的アセットの slug 名が変わってしまう**ためである。仕方がないので[このへん](https://www.mk-engineer.com/posts/nextjs-before-build)を参考にしつつ自分で書いた。`package.json`の`prebuild`と`postbuild`を活用し、ビルド前に記事のインデックスを作成、ビルド後にインデックスに基づいて`sitemap.xml`と`robots.txt`を生成するようにしてある。

```js
// hooks/scripts/sitemap.mjs

import fs from "fs";
import prettier from "prettier";
import { globby } from "globby";

// variables
const HOST = "https://www.haxibami.net";
const XMLFILE = "sitemap.xml";

// Article index file
const indexFile = fs.readFileSync("src/share/index.json", "utf-8");
const index = JSON.parse(indexFile);

// formatted xml
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

const sitemapGenerator = async () => {
  const solidPaths = await globby(
    ["src/pages/*.tsx", "src/pages/blog/*.tsx", "src/pages/grad_essay/*.tsx"],
    { ignore: ["src/pages/_*.tsx", "src/pages/404.tsx"] }
  );

  const solidInfos = solidPaths.map((filePath) => {
    const solidInfo = {
      relpath: filePath
        .replace("src/pages/", "")
        .replace(".tsx", "")
        .replace("index", ""),
      lastmod: new Date().toISOString(),
    };
    return solidInfo;
  });

  const allBlogs = index.articles.blog;
  const allGrads = index.articles.grad_essay;

  const dateConverter = (date) => {
    return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
  };

  const blogInfos = allBlogs.map((item) => {
    const blogInfo = {
      relpath: `blog/posts/${item.slug}`,
      lastmod: dateConverter(item.date),
    };
    return blogInfo;
  });

  const gradInfos = allGrads.map((item) => {
    const gradInfo = {
      relpath: `grad_essay/posts/${item.slug}`,
      lastmod: dateConverter(item.date),
    };
    return gradInfo;
  });

  const sitemapInfos = solidInfos.concat(blogInfos, gradInfos);

  const pagesSitemap = `

  ${sitemapInfos
    .map((info) => {
      return `
        <url>
          <loc>${HOST}/${info.relpath}</loc>
          <lastmod>${info.lastmod}</lastmod>
        </url>
      `;
    })
    .join("")}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${pagesSitemap}
    </urlset>
  `;

  const robots = `
      # *
      User-agent: *
      Allow: /

      # Host
      Host: https://www.haxibami.net

      # Sitemaps
      Sitemap: https://www.haxibami.net/sitemap.xml
  `;

  fs.writeFileSync(`public/${XMLFILE}`, formatted(generatedSitemap));
  fs.writeFileSync("public/robots.txt", robots);
};

export default () => {
  return new Promise(async (resolve) => {
    sitemapGenerator();
    resolve();
  });
};
```

```json
// package.json

{
  "scripts": {
    "prebuild": "node hooks/before-build.mjs",
    "build": "next build",
    "postbuild": "node hooks/after-build.mjs"
  }
}
```

本当は TypeScript で書きたかったが、ES Modules 対応は Version 4.6 以降に延期された[らしい](https://zenn.dev/aumy/scraps/06e8d775b047f2)。安定版に降りて広まってきたら書き直すかもしれない。

## 感想

けっこう簡単に動いた。Next.js と unified のデベロッパーに五体投地しつつ、改修をやっていく。

## TODO

- [x] ルビの実装（2022/03/06）
- [ ] 外部リンクのカード化
- [ ] Mermaid のサポート
