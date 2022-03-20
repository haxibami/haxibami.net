---
slug: "blog-renewal"
title: "Next.jsでブログをつくった"
date: "20220320"
tags: ["tech", "web", "nextjs"]
---

[系統樹](/)が生えているだけだったポートフォリオサイトに、ブログを追加した。

## 目次

## 基盤

もう自由で個人的で良質なインターネットなどない、ということを認めなければならない。そんなものは幻影に過ぎなかったと言えば簡単だが、その幻影を見ることさえ年々困難になりつつある。

いろいろなものを思い浮かべてみよう：

- Twitter がサジェストするツイート
- Yahoo!ニュースのコメント欄
- いかがでしたか？　量産サイト
- 大量の広告

ここで私が攻撃しようとしているのは、質の低さ自体**ではない**。質の悪いインターネットコンテンツ自体ははるか前（それこそ私が生まれる以前！）から存在しているし、たいていはフィルタリングでどうにかなってきた。問題はむしろそれらが接続され、一体となり、フィルタ可能な密度を超えてやってくることだ。

世界が真に遅延なく一体化する、これが私には恐ろしい。もっと分割された市場、もっと通約不能な体系の併存、それが私の望む世界像であって、一体になって襲いかかってくる凡庸さなど耐えられる気がしないのだ。私自身が凡庸であるにしても、それは個人的な凡庸さであってほしいし、どこかの片隅で毎月一通くらいの手紙で繋がるものであってほしい。

だからハイパーリンク時代（これも古い用語かもしれないが）の接続は、何を繋ぐかではなく何を繋がないかだ。Google ではなく Brave へ。アップタイムではなくダウンタイムへ。外部サービスではなく個人ブログへ。現状、私がプラットフォームに求めるのは以下だ。

1. 自由
1. 管理しやすい
1. 高速
1. 見やすい
1. カスタマイズ可能
1. 広告が（鬱陶しく）ない

書くということにあたっては、[この記事](https://sumirehibiya.com/notes/building-a-blog-with-nextjs)が指摘するようなサービスごとのコミュニティの存在というのも見逃せない。投稿ひとつに必要以上の団体性がまとわりつく、これが常に望ましいとは思われない。場合によって事実はもっと個人的であるべきなのだ。完全な孤独、というのではなく、むしろ{飽きるほどの接続}^(ハイパーリンク)を前提にしたうえで、あえて切断に至る方向を向くような分権性。有り体に言えば逆張りオタク。

こうなってくると、自作した方が良い。

以前、別のサイトを作っていたときは Gatsby.js を使っていた。高速ではあったが、すべてを自らのプラグインとして抱え込もうとするシステムに少しずつ違和感も募った。他方、同じ SSG でも Zola や Hugo はシンプルだが、柔軟性では JS/React 系に及ばない。けっきょく 2022 年現在、Next.js に落ち着く。

### フレームワーク

Next.js + TypeScript + Sass (SCSS, CSS modules)。

TypeScript は未だによくわからないが、型チェックには何度も助けられた。Neovim で coc.nvim を使って書いていると、coc-tsserver のおかげで書いた瞬間からエラーに気づけるのでかなり良い。CSS modules と SCSS は出会ったときにいたく感動して以来ずっと使っているが、{追い風}^(Tailwind)が吹いている感じではなさそうだ。

### ホスティング・ビルド

素直に Vercel に投げた。またの名を囲い込まれともいう。ただし Vercel 側のビルド回数を消費したくないので、ビルド前のテスト・デプロイは GitHub Actions にしてある（[vercel-action](github.com/amondnet/vercel-action/)）。ガンガン CI を回して Microsoft を破産させよう！

## 機能

### Markdown まわり

われわれには先人の記憶というものがあり、すなわちこの手のサイトは記事管理が億劫になった時点で**エタる**。放置された「なんたらの部屋」、消えて還らない借りドメイン、むなしく刻む入室カウンターを眺めるたびに、せめて記事くらいは慣れたファイル形式で楽に引き継ぎたいと思うようになった。そういうわけで Markdown（内容管理） + tsx（テンプレートエンジン）。Markdown ならそう簡単には廃れないだろうし、いつか別サービスにも投げ込める。いまはヘッドレス CMS とかいうのもあるらしい（全然知らない）が、個人レベルでは Git Repo ひとつで管理できたほうがやっぱり楽だ。

Next.js から Markdown を扱う方法は[公式](https://nextjs.org/blog/markdown)でも取り上げられている。具体的には`remark`や`rehype`関連のパッケージを使うのだが、この remark と rehype がすごい。ともに unified というインターフェースの傘下にあって、このもとで`mdast`（Markdown の構文木）や`hast`（HTML の構文木）を相互変換したり、特定の要素に対してカスタム処理を実行できる。関連プラグインも充実しており、やりたいことが既存のプロジェクトの組み合わせで実現できてしまう。

ただその豊かさゆえに選択肢が多く、同じことを実装する方法が何通りもある。たとえば今回のように Markdown から Next.js の ページを生成するだけでも、以下から選択することになる。

- `unified`上で実行するもの
  - `remark-parse` + `remark-rehype` + `rehype-stringify`
  - `remark-parse` + `remark-rehype` + `rehype-react`
- そうでないもの（上の処理が複合されたプラグイン）
  - `remark` + `remark-html`
  - `react-remark`
  - `react-markdown`

自分は柔軟にプラグインを組み合わせ、React コンポーネントとも融和させたかったため、上から二番目を採った（後述するが、`rehype-react`がかなり魅力的だ）。

#### Frontmatter

Frontmatter に記事のメタデータを記載し、`grey-matter`で取り出した（これは unified の処理ではない）。

https://github.com/jonschlinkert/gray-matter

```md
---
slug: "blog-renewal"
title: "Next.jsでブログをつくった"
date: "20220320"
tags: ["tech", "web", "nextjs"]
---

## hoge...
```

#### GitHub Flavored Markdown

`remark-gfm`で対応。

https://github.com/remarkjs/remark-gfm

```md
| 表を     | 作る       |
| -------- | ---------- |
| たとえば | このように |
| 要素を   | 増やす     |

https://www.haxibami.net

みたいな生のリンクも置けるし

- こうやって
  - リストが書ける。さらに、[^1]

[^1]: 脚注も使える
```

| 表を     | 作る       |
| -------- | ---------- |
| たとえば | このように |
| 要素を   | 増やす     |

https://www.haxibami.net

みたいな生のリンクも置けるし

- こうやって
  - リストが書ける。さらに、[^1]

[^1]: 脚注も使える

#### 絵文字表示

`remark-gemoji`で変換。

https://github.com/remarkjs/remark-gemoji

`:v:`が :v: に。

#### 数式表示

`remark-math`と`rehype-katex`を噛ませる。

https://github.com/remarkjs/remark-math

https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex

```md
> $$
> ( \sum_{k=1}^{n} a_k b_k )^2 \leq ( \sum_{k=1}^{n} {a_k}^2 ) ( \sum_{k=1}^{n} {b_k}^2 )
> $$
```

> $$
> ( \sum_{k=1}^{n} a_k b_k )^2 \leq ( \sum_{k=1}^{n} {a_k}^2 ) ( \sum_{k=1}^{n} {b_k}^2 )
> $$

$e^{i\pi} + 1 = 0$ のようなインライン数式もいける。フォントは置かずともよいが、CSS の挿入は必要。

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

既に[remark-ruby](https://github.com/laysent/remark-ruby)というパッケージがルビを実装しているが、メンテナンスがされておらず依存関係と API が古くなっていたため、別パッケージ（`remark-jaruby`）を実装した。

https://github.com/haxibami/remark-jaruby

元のパッケージ自体が`remark-parse`の中身である[micromark](https://github.com/micromark/micromark)に介入して処理を行っていたので、パーサ部分（[micromark-extension-jaruby](https://github.com/haxibami/micromark-extension-jaruby)）、構文木操作部分（[mdast-util-jaruby](https://github.com/haxibami/mdast-util-jaruby)）の拡張機能に分割し、これらを`remark-jaruby`から参照している。

書式は元のものを踏襲した。

```md
> 昨日午後、{†聖剣†}^(エクスカリバー)を振り回す{全裸中年男性}^(無敵の人)が出現し……
```

> 昨日午後、{†聖剣†}^(エクスカリバー)を振り回す{全裸中年男性}^(無敵の人)が出現し……

#### ウィジェット（リンクカード）

リンクを貼ったときに、モコッとしたウィジェットが出るあれ。その表示**する**側。

https://zenn.dev/tomi/articles/2021-03-22-blog-card

実装は :point_up_2: を全面的に参考にした。細かい部分は違っているが、Markdown 内のリンクからメタ情報を取得して、リンクを適当な React コンポーネントに置き換えている点は同じだ。

##### 内部

汎用性・機能性を踏まえ、自分は unified のプラグインとして実装する手法を採った。まず、変換したい対象（空行に挟まれた裸のリンク）に対し`extlink`という mdast ノード、及び同名の HTML タグを割り当てた。具体的には、

1. Paragraph かつ
1. 子要素が一つかつ
1. 子要素がリンクである

ものを`<extlink>`に置き換えている。

置き換えと同時に、プラグイン内でメタ情報の取得も行った。:point_down: を使用して`meta`タグに記載の title、description、OGP 画像・アイコンのリンクを`fetch`し、`<extlink>`の子要素として挟む。

https://github.com/BetaHuhn/metadata-scraper#readme

```html
<extlink>{meta: {...}}</extlink>
```

（これ以外に方法が思いつかず、オブジェクトを強引に`JSON.stringify`したものを挟んでいるが、他に良いやり方があったら教えてほしい）

最後に`rehype-react`。このプラグインの`components`オプションでは、入力された HTML の任意のタグを任意の React コンポーネントに変換できる。これで`extlink`タグの子要素（つまり取得したメタ情報）を`props`として自作のコンポーネントに渡してやればよい。[^2]

[^2]: なお、`rehype-react`の処理と`remark-rehype`周辺の処理を同じファイルにまとめてはいけない。[getStaticProps をめぐる事情](https://zenn.dev/wattanx/scraps/da4690390d8e3d)でビルドがコケる。

```ts
// lib/rehype-react.ts
// HTML parser on "Client" side. Never include backend code (including remark).

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import type { Options as RehypeReactOptions } from "rehype-react";
import React from "react";
import MyLink from "components/MyLink";
import type { MyLinkProps } from "components/MyLink";
import LinkWidget from "components/LinkWidget";
import type { LinkWidgetProps } from "components/LinkWidget";
import NextImage from "components/NextImage";
import type { NextImageProps } from "components/NextImage";

// Convert HTML to React Component
export const HtmlToReact = (html: string) => {
  const result = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        a: (props: MyLinkProps) => {
          return MyLink(props);
        },
        img: (props: NextImageProps) => {
          return NextImage(props);
        },
        extlink: (props: LinkWidgetProps) => {
          return LinkWidget(props);
        },
      },
    } as RehypeReactOptions)
    .processSync(html);
  return result.result;
};
```

```tsx
// components/LinkWidget/index.tsx
import type { LinkWidgetMeta } from "lib/interface";
import Styles from "./style.module.scss";

export interface LinkWidgetProps {
  children: string;
}

const LinkWidget: React.VFC<LinkWidgetProps> = (props) => {
  const { children } = props;
  const meta: LinkWidgetMeta = JSON.parse(children);
  return (
    <div className={Styles.Wrapper}>
      <a href={meta.url}>
        <div className={Styles.Widget}>
          <div className={Styles.Main}>
            <div className={Styles.Title}>{meta.title}</div>
            <div className={Styles.Description}>{meta.description}</div>
            <div className={Styles.Host}>
              <img src={meta.icon} height={15} width={15} alt="icon" />
              {meta.url.indexOf("/", 8) != -1
                ? meta.url.slice(8, meta.url.indexOf("/", 8))
                : meta.url.slice(8)}
            </div>
          </div>
          <div className={Styles.Image}>
            <img src={meta.image} height={105} width={200} alt="image" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default LinkWidget;
```

unified プラグインの書き方は

https://zenn.dev/januswel/articles/745787422d425b01e0c1

を参考にした。なお、内部で`fetch`を行っている都合上、作成したプラグインは非同期プラグインとなることに留意。具体的には unified で`processSync`が[使えなくなる](https://github.com/unifiedjs/unified#processorprocesssyncfilevalue)。

#### ページ内リンク・目次

`rehype-slug`、`rehype-autolink-headings`、`remark-toc`で実現。

https://github.com/rehypejs/rehype-slug

https://github.com/rehypejs/rehype-autolink-headings

https://github.com/remarkjs/remark-toc

#### 内容プレビュー

[トップ](https://haxibami.net/blog)の記事タイルには内容のプレビューを表示している。このために生の Markdown を流し込むのも気が引けたので、なんとかして plaintext 形式に変換できないかと考えていたら、`strip-markdown`というのがあった。これで`<h1>`, `<blockquote>`等を除去し、冒頭 200 字を抽出している。

https://github.com/remarkjs/strip-markdown

#### シンタックスハイライト

最初は[prism.js](https://prismjs.com)を使っていたが、使えるカラースキームがあまりに少なかったため[shiki](https://shiki.matsu.io)に変更した。公式サイトにある通り、こちらは VSCode のカラースキームファイルが流用できる。せっかくなので自作の[urara-vscode](https://github.com/haxibami/urara-vscode)を使用してみた。

https://github.com/shikijs/shiki

以上を合わせたメソッドチェーンが以下。[^3]

[^3]: 変なファイル処理が入っているのは、shiki がテーマファイルを読み込むにあたって**自分のインストールされた位置**（メインプロジェクトの`node_modules`以下）からの相対パスか、ファイルシステムの絶対パスかのいずれかしか受け付けないため。

```ts
// lib/parser.ts
// Markdown parser on "Server" side. Never include frontend code (including rehype-react).

import { join } from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import remarkJaruby from "remark-jaruby";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import type { Options as RemarkRehypeOptions } from "remark-rehype";
import rehypeKatex from "rehype-katex";
import * as shiki from "shiki";
import rehypeShiki from "@leafac/rehype-shiki";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import stripMarkdown from "strip-markdown";
import remarkStringify from "remark-stringify";
import { remarkLinkWidget, extLinkHandler } from "./remark-link-widget";

// Get shiki theme file (`src/styles/shiki/${themename}.json`) full path
const getThemePath = (themename: string) =>
  join(process.cwd(), "src/styles/shiki", `${themename}.json`);

// Convert Markdown to HTML
export const MdToHtml = async (md: string) => {
  const myShikiTheme = await shiki.loadTheme(getThemePath("urara-color-theme"));
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkMath)
    .use(remarkJaruby)
    .use(remarkLinkWidget)
    .use(remarkUnwrapImages)
    .use(remarkToc, {
      heading: "目次",
      tight: true,
    })
    .use(remarkRehype, {
      handlers: {
        extlink: extLinkHandler,
      },
    } as RemarkRehypeOptions)
    .use(rehypeKatex)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: myShikiTheme }),
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
    })
    .use(rehypeStringify)
    .process(md);

  return result.toString();
};

// Convert Markdown to plaintext: for preview in top pages
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

以上の処理で、はてブや Qiita、Zenn あたりと似た書き心地になった。

### ダークモード

外部ライブラリを使用。

https://github.com/pacocoursey/next-themes

### 動的 OGP 画像の自動生成

[先程](#ページ内リンク目次)に続き、今度は表示**される**側。Vercel のサーバレス関数機能を使って

1. ヘッドレス Chromium を起動
2. クエリパラメータに応じた内容の React コンポーネントを生成
3. `renderToStaticMarkup`で静的 HTML 化
4. 表示してスクリーンショットを撮影

する手順で実現した。

使うつもりだった`playwright-aws-lambda`がなぜか手元で動かなかったので、[chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda)と [puppeteer](https://github.com/puppeteer/puppeteer) を使った。

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

表示用のコンポーネント・スタイリングは手元で書けるぶん、デザインの自由度は高い。

問題は Vercel の容量制限（50MB）だ。`chrome-aws-lambda`のインストールだけでほぼ上限に達するうえ、向こうの環境（AWS Lambda 相当）には日本語フォントが入っていないので、その手配も必要になる。幸い今回は Web フォントでどうにかなった。

![普通にオーバーしてるのに動いてる](/image/lambda-fn.png)

Vercel のログは容量オーバーを告げているが、なぜか動いている。優しいな〜

### サイトマップ生成

[next-sitemap](https://github.com/iamvishnusankar/next-sitemap)を使ったところ、`<lastmod>`がすべて最終ビルド時を示していて発狂しかけた。この挙動はある意味正しく、なぜなら自分が触れていないページでもビルドするたびに**静的アセットの slug 名が変わってしまう**ためである。仕方がないので[このへん](https://www.mk-engineer.com/posts/nextjs-before-build)を参考にしつつ自分で書いた。`package.json`の`prebuild`と`postbuild`を活用し、

1. ビルド前に`share/index.json`に記事のインデックスを作成
1. ビルド後にインデックスに基づいて`sitemap.xml`と`robots.txt`を生成

するようにしてある。

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

  const robots = `# *
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

### フィード対応

`Feed`というライブラリを使った。上と同じ要領で`/rss`以下に RSS、Atom、JSON Feed 用のファイル三種を吐かせる。

```js
// hooks/scripts/feed.mjs
import fs from "fs";
import { Feed } from "feed";
import { readYaml, getAllPosts, MdToHtml, dateConverter } from "./lib.mjs";

// variables
const HOST = "https://www.haxibami.net";

const meta = readYaml("meta.yaml");

const genRssFeed = () => {
  const author = {
    name: "haxibami",
    email: "contact@haxibami.net",
    link: HOST,
  };

  const date = new Date();
  const feed = new Feed({
    title: meta.siteinfo.blog.title,
    description: meta.siteinfo.blog.description,
    id: HOST,
    link: HOST,
    language: "ja",
    image: `${HOST}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${HOST}/rss/feed.xml`,
      json: `${HOST}/rss/feed.json`,
      atom: `${HOST}/rss/atom.xml`,
    },
    author: author,
  });

  const allBlogs = getAllPosts(["slug", "title", "date", "content"], "blog");

  allBlogs.forEach((post) => {
    const url = `${HOST}/blog/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      description: `<p>${MdToHtml(post.content).substring(0, 300)}</p>`,
      id: url,
      link: url,
      date: new Date(dateConverter(post.date)),
    });
  });

  fs.mkdirSync("public/rss", { recursive: true });
  fs.writeFileSync("public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("public/rss/feed.json", feed.json1());
};

export default genRssFeed;
```

## 感想

Next.js の抽象化と、unified はじめ充実した外部処理系のおかげでかなり簡単に動いた。デベロッパーに五体投地しつつ、改修をやっていく。

## TODO

- [x] ルビの実装（2022/03/06）
- [x] フィード（RSS, Atom）対応（2022/03/10）
- [x] 外部リンクのカード化（2022/03/15）
- [x] ダークモードのサポート（2022/03/22）
- [ ] Mermaid のサポート
- [ ] Twitter コンテンツの静的埋め込み
