---
slug: "blog-renewal"
title: "Next.jsでブログをつくった"
date: "20220214"
tags: ["tech", "web", "nextjs"]
---

無心で投稿できる空間がほしくて。

## まえがき

以前から haxibami.net 自体は公開していたが、謎のオブジェクトが生えているだけの自己紹介サイトでしかなかった。今回は`/blog`以下にブログ機能を付けたので、その話。

## 基盤

### フレームワーク

Next.js + TypeScript + Sass (SCSS, CSS modules)。いつもお世話になっている。

TypeScript は到底理解したとはいえないけれども、型チェックに何度も助けられた。嬉しいのは、Neovim で coc.nvim を使って書いていると、coc-tsserver のおかげで書いた瞬間からエラーに気づけることか。おかげでコンパイルエラーにかかることがほぼない。

CSS modules と SCSS は出会ったときにいたく感動して以来ずっと使っている。ただ、追い風が吹いているという感じの技術ではないので、いずれ別の基盤に乗り換えるかもしれない。

### ホスティング・ビルド

ホスティングは素直に Vercel に投げた。いかにも当世風の使い心地の良さで、思いっきり囲い込まれにいきたくもなる。ただし Vercel 側のビルド回数を消費したくないので、ビルドは GitHub Actions にしてある。

## 機能

### Markdown まわり

われわれには先人の記憶というものがあり、すなわちこの手のサイトは記事管理が億劫になった瞬間に破滅を迎える。放置された過去の「〇〇の部屋」、消えて還らない借り物のドメイン、むなしく刻む入室カウンターたちを眺めるたびに、慣れたファイル形式で何もかも楽に扱いたい、サービスを変えても引き継ぎたい、と思うようになった。そういうわけで Markdown（内容管理） + tsx（テンプレートエンジン）という構成だ。Markdown ならそう簡単には廃れないだろうし、さまざまなサービスの間を渡り歩ける。いまはヘッドレス CMS とかいうのもあるらしい（全然知らない）が、個人レベルでは Git Repo ひとつでまるっと管理できたほうがやっぱり楽だ。

Next.js から Markdown を扱う方法は[公式](https://nextjs.org/blog/markdown)でも取り上げられており、わりと簡単に実現できる。具体的には`remark`や`rehype`関連のパッケージを使うのだが、この remark と rehype がすごい。ともに unified という共通のインターフェースの傘下にあって、このもとで`mdast`（Markdown の構文木）や`hast`（HTML の構文木）を相互変換したり、特定の要素に対して望んだ処理を実行できる。おかげさまで関連プラグインも充実しており、やりたいことが既存のプロジェクトの組み合わせで実現できてしまったりする。今回もまさにそうで、以下に実現できた機能を書いておく。

#### GitHub Flavored Markdown

[`remark-gfm`](https://github.com/remarkjs/remark-gfm)で対応。

```md
| 表を     | 作れる     |
| -------- | ---------- |
| たとえば | このように |
| 要素を   | 増やす     |

https://haxibami.net みたいに生のリンクも置けるし

- こうやって
  - リストできる。さらに、[^1]

[^1]: 脚注も使える
```

| 表を     | 作れる     |
| -------- | ---------- |
| たとえば | このように |
| 要素を   | 増やす     |

https://haxibami.net みたいに生のリンクも置けるし

- こうやって
  - リストできる。さらに、[^1]

[^1]: 脚注も使える

#### 絵文字表示

[`remark-emoji`](https://github.com/rhysd/remark-emoji)で変換。

```md
:v: が……
```

:v: に！

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

インライン数式もいける。 $e^{i\pi} + 1 = 0$ みたいに。

手動でフォントを設置する必要はないようだが、KaTeX 用 CSS の挿入が必要。`pages/_document.tsx`あたりでやるとよさそう？

```tsx
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

#### 内容プレビュー

大したことではないが、[トップ](https://haxibami.net/blog)の記事タイルには内容のプレビューを表示している。このために生の Markdown を流し込むのも気が引けたので、なんとかして plaintext 形式に変換できないかと考えていたら、[`strip-markdown`](https://github.com/remarkjs/strip-markdown)というのがあった。これで見出し・引用等を除いて抽出している。

#### シンタックスハイライト

最初は[prism.js](https://prismjs.com)を`babel-plugin-prismjs`から使っていた。問題なく動いてくれてはいたのだが、デフォルトで使えるカラースキームがあまりに少なかったため、[shiki](https://shiki.matsu.io)に変更した。こちらは公式サイトの例にある通り、なんと VSCode のカラースキームファイルが流用できる。そういうわけで自作の[urara-vscode](https://github.com/haxibami/urara-vscode)から設定を引っ張ってきた。

以上を合わせたメソッドチェーンがこんな感じ。

```ts
import { join } from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import remarkMath from "remark-math";
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

変なファイル処理が入っているのは、shiki がテーマファイルを読み込むにあたって、**自分のインストールされた位置**（メインプロジェクトの`node_modules`以下）からの相対パスか、ファイルシステムの絶対パスかのいずれかしか受け付けないため。

#### 引用

デフォルトで`<blockquote>`タグに変換されるため、これは手動でスタイリングした。

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

以上の処理で、はてブや Qiita、Zenn あたりと似た書き心地になった。次は SEO(?)だ。

### 動的 OGP 画像の自動生成

見たことはあると思う。ページをシェアしたときにただのベタ貼りリンクにならず、モコッとタイルが生えてくるあれだ。もちろん静的画像でも設定はできるが、記事ごとに違っているほうがかっこいい（主観）ので実装したいと思っていた。

いろいろ方法はあるようだが、自分は Vercel のサーバレス関数機能を使って

1. ヘッドレス Chromium（puppeteer）を起動し
2. クエリパラメータに応じた HTML を表示させて
3. スクリーンショットを撮る

手法で実現した。

このやり方だと、流し込む HTML は自由なので自分でデザインを決められるという利点がある。問題点は無料プランゆえの実行時間制限（5 秒）と容量制限（50MB）だ。実行時間はともかく、向こうの環境（AWS Lambda）には日本語フォントが入っていないので、そのインストールも必要になる。そうなると容量がかなり厳しいところだが、今回は Web フォントでどうにかした。

```tsx
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
```

まあ見ての通りである。合ってんのかな :thinking_face::question:

Chromium については、AWS Lambda 向けに最適化された[`chrome-aws-lambda`](https://github.com/alixaxel/chrome-aws-lambda)というバイナリを見つけたので、ありがたく使わせてもらった。これ自体が内部で puppeteer をロードしているため、`puppeteer-core`はあえて依存関係に加えなくともよさそうだ。

容量が足りてるのが奇跡としか思えないが、とにかくこれで実現できた:v:

## 感想

こんなに簡単に動くとは思わなかった。要は Next.js と unified と諸々がすごいということなので、リファクタリングをしつつ、Developer のみなさんに五体投地しようと思う。
