---
slug: "blog-renewal"
title: "Next.jsでブログをつくった"
date: "20220326"
description: "自作ブログの実装について"
tags: ["tech", "web", "nextjs", "react"]
---

（2022/03/03 追記）Next.js 13 / App Router 対応を[やった](/blog/posts/blog-next-13)

## はじめに

<https://github.com/haxibami/haxibami.net>

ブログを自作した。決め手は以下の四つ。

1. 適度な距離
1. メンテナンス性
1. 高速性・拡張性
1. 無広告

### 1. 適度な距離

あらゆるものが最適化されて提供される現代では、遅配や誤配の確率はとても低い。大きなプラットフォームはユーザーの buzz をすすんで後押しし、かれに向けて、かれのために、とパーソナライズに躍起だ。書き手と読み手の距離は透明に、コミュニケーションは確実に。だがそうではない形式も（かつては？）あった。ひょっとしたら誰かに拾われるかもしれない、あるいは Google のクローラにさえ拾われないかもしれない、そうした確率論的な雲のなかに自らの書いたものを打ち上げる。そして祈る。{古き良き日々}^(グッド・オールド・インターネッツ)は理想郷ではなかったにしても、あの誰かのものになる前の世界の、その歪な手触りを覚えておくための、個人サイトという距離感。

### 2. メンテナンス性

先人たちが示してきたとおり、この手の個人サイトは管理・移行が億劫になった時点で**エタる**。放置された「〇〇の部屋」、消えて還らない借りドメイン、むなしく刻む入室カウンターたちを眺めるたびに、せめて記事くらいは移行しやすい形式で扱いたいと思うようになった。そういうわけで Markdown（コンテンツ） + tsx（テンプレート）。この組み合わせならそう簡単には廃れないだろうし、いつか別サービス・別フレームワークに移るときにもそれほど困らない。

### 3. 高速性・拡張性

Next.js。個人サイトには若干過剰の感もあるものの、ページ遷移の気持ちよさと画像の最適化が魅力的。あと少々複雑なことをしようとしてもフレームワークの守備範囲をはみ出さないのは良い。

### 4. 広告や統計の排除

過剰な広告・統計に対して憎悪を抱いているため、このサイトには設置していない。唯一、ホスティング先である Vercel が行っているアナリティクスだけは確認している。[こちらの記事](/blog/posts/nextdns-install)も参照。

## 機能一覧と実装

以下はこのブログの機能・実装・使用ライブラリのギャラリー

### Markdown の処理

（2022/12/28 更新）

Markdown の処理系について。以前は `remark` + `rehype` の出力を `rehype-react` でレンダリングしていたが、`rehype-react`（厳密にいえばその依存先の `parse5`）のバンドルサイズがバカにならないため、`next-mdx-remote` に乗り換えた。

<https://github.com/hashicorp/next-mdx-remote>

これは他の処理系とは異なり、`getStaticProps`（`/pages`の場合）ないし`fetch` / `cache`（`/app`の場合）経由でコンテンツを取得し、コンパイルした JSX を返却する仕様になっている。また内部では`remark` / `rehype` / MDX 系の API が用いられており、これらの系列のプラグインが利用できる。

（2023/03/02 更新）

ちなみに：Next.js 13 の App Router（React Server Component）を使う場合、どのライブラリでも大差ないかもしれない（コンテンツが server component である限り、ページ内のクライアント JS は剥がされるため）

### 記事メタデータの取得

<https://github.com/remarkjs/remark-frontmatter>

<https://github.com/vfile/vfile-matter>

```md
---
slug: "blog-renewal"
title: "Next.jsでブログをつくった"
date: "20220326"
tags: ["tech", "web", "nextjs"]
---
```

### GitHub Flavored Markdown

<https://github.com/remarkjs/remark-gfm>

```md
| just a | table |
| ------ | ----- |
| 1      | 2     |
| 3      | 4     |

<https://www.haxibami.net>

- [x] トゥードゥー
- [ ] リストや、脚注[^1]

[^1]: 脚注など
```

| just a | table |
| ------ | ----- |
| 1      | 2     |
| 3      | 4     |

<https://www.haxibami.net>

- [x] トゥードゥー
- [ ] リストや、脚注[^1]

[^1]: 脚注など

### 絵文字

<https://github.com/remarkjs/remark-gemoji>

`:v:`が :v: に。

### 数式

<https://github.com/remarkjs/remark-math>

<https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex>

適当なところで KaTeX のスタイルシートを読み込む必要がある。

```md
$$
( \sum_{k=1}^{n} a_k b_k )^2 \leq ( \sum_{k=1}^{n} {a_k}^2 ) ( \sum_{k=1}^{n} {b_k}^2 )
$$
```

$$
( \sum_{k=1}^{n} a_k b_k )^2 \leq ( \sum_{k=1}^{n} {a_k}^2 ) ( \sum_{k=1}^{n} {b_k}^2 )
$$

```md
$e^{i\pi} + 1 = 0$ :arrow_left: インライン数式
```

$e^{i\pi} + 1 = 0$ :arrow_left: インライン数式

### ルビ

古い既存のパッケージ（`remark-ruby`）をフォークして、別パッケージ（`remark-jaruby`）を実装。

<https://github.com/haxibami/remark-jaruby>

```md
> 昨日午後、{†聖剣†}^(エクスカリバー)を振り回す{全裸中年男性}^(無敵の人)が出現し……
```

> 昨日午後、{†聖剣†}^(エクスカリバー)を振り回す{全裸中年男性}^(無敵の人)が出現し……

### ページ内リンク

<https://github.com/rehypejs/rehype-slug>

<https://github.com/rehypejs/rehype-autolink-headings>

```md
:arrow_right: [はじめに](#はじめに) に飛べるよ
```

:arrow_right: [はじめに](#はじめに) に飛べるよ

### Mermaid Diagram

（2023/05/07 更新）

[rehype-mermaidjs](https://github.com/remcohaszing/rehype-mermaidjs)を使った。通常の Mermaid の実装ではクライアント側で JS が実行されるが、このプラグインを使うとビルド時にヘッドレス Chromium で[^2] あらかじめ SVG が描画され、静的にドキュメントに埋め込まれる。so SSG-ish！

[^2]: こんなことのためにわざわざヘッドレスブラウザを使うのもアレだが、mermaid は node 上で動く DOM ライブラリ（JSDOM や happy-dom 等）には対応していない[ようなので](https://github.com/mermaid-js/mermaid/issues/559)、やむを得ずこうなっている。

````md
```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

```mermaid
stateDiagram-v2
    state fork_state <<fork>>
      [*] --> fork_state
      fork_state --> State2
      fork_state --> State3

      state join_state <<join>>
      State2 --> join_state
      State3 --> join_state
      join_state --> State4
      State4 --> [*]
```

```mermaid
pie
"Dogs" : 386
"Cats" : 85
"Rats" : 15
```
````

```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

```mermaid
stateDiagram-v2
    state fork_state <<fork>>
      [*] --> fork_state
      fork_state --> State2
      fork_state --> State3

      state join_state <<join>>
      State2 --> join_state
      State3 --> join_state
      join_state --> State4
      State4 --> [*]
```

```mermaid
pie
"Dogs" : 386
"Cats" : 85
"Rats" : 15
```

### シンタックスハイライト

`rehype-pretty-code`を利用した。このプラグインの内部では[shiki](https://shiki.matsu.io)が使われているため、スタイル適用がすべてビルド時に行われる（= **追加 CSS が不要**）、**VSCode のカラースキームが使える**、などの利点がある。

<https://github.com/atomiks/rehype-pretty-code>

### リンクカード

:arrow_down: こういうもこっとしたカード。

<https://zenn.dev/tomi/articles/2021-03-22-blog-card>

<https://zenn.dev/januswel/articles/745787422d425b01e0c1>

上の記事を参考に、unified の Transformer プラグインを自作して[実装した](https://github.com/haxibami/haxibami.net/blob/2db87a4118c63b211ec10f6f7e0ec3b093513468/haxibami.net/src/lib/remark-link-card.ts)。おおむね、

1. 文書中に単独で貼られたリンクノードを検出
2. リンク先にアクセスしてメタデータ（`title`、`description`、`og image`）を取得
3. これらの情報をノードの属性に付加し、独自の要素（ex. `<linkcard>`）に置き換え
4. 独自要素を、MDX の処理系側で自作コンポーネントに置換

する処理を行っている。

ちなみに、ノードに付加した属性は（独自のものであっても）props として変換先のコンポーネントに渡せる。`next-mdx-remote`だと以下のようになる。

```tsx title="src/components/MDXComponent/index.tsx" /props/
import LinkCard from "components/LinkCard";
import NextImage from "components/NextImage";
import NextLink from "components/NextLink";

import type { LinkCardProps } from "components/LinkCard";
import type { NextImageProps } from "components/NextImage";
import type { NextLinkProps } from "components/NextLink";
import type { MDXComponents } from "mdx/types";

type ProvidedComponents = MDXComponents & {
  a: typeof NextLink;
  img: typeof NextImage;
  extlink: typeof LinkCard;
};

const replaceComponents = {
  a: (props: NextLinkProps) => <NextLink {...props} />,
  img: (props: NextImageProps) => <NextImage {...props} />,
  extlink: (props: LinkCardProps) => <LinkCard {...props} />,
} as ProvidedComponents;

export default replaceComponents;
```

```ts title="src/lib/compiler.ts"
import MDXComponent from "components/MDXComponent";

const result = compileMDX({
  source,
  components: MDXComponent,
});
```

### 画像処理

Markdown 内の画像を`next/image`に置き換える remark プラグインを書いた。置換に加え、画像のサイズ取得・プレースホルダー生成（参考：[公式ドキュメント](https://nextjs.org/docs/api-reference/next/image#placeholder)）も行っている。

```ts title="src/lib/remark-image-opt.ts"
import { getPlaiceholder } from "plaiceholder";
import { visit } from "unist-util-visit";

import type { Image } from "mdast";
import type { Plugin, Transformer } from "unified";
import type { Node } from "unist";

const rehypeImageOpt: Plugin<[void]> = function imageOpt(): Transformer {
  return async (tree: Node) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, "image", (node: Image) => {
      const src = node.url;

      promises.push(async () => {
        const blur = await getPlaiceholder(src);
        node.data = {
          hProperties: {
            src: blur.img.src,
            width: blur.img.width,
            height: blur.img.height,
            aspectRatio: `${blur.img.width} / ${blur.img.height}`,
            blurDataURL: blur.base64,
          },
        };
      });
    });
    await Promise.allSettled(promises.map((t) => t()));
  };
};

export default rehypeImageOpt;
```

### ダークモード

外部ライブラリを使用。

<https://github.com/pacocoursey/next-themes>

### OG 画像の生成

（2022/05/07 更新）

[別記事](/blog/posts/blog-next-13#route-handler-による-og-画像生成)を参照。

### サイトマップ生成

（2023/05/07 更新）

[別記事](/blog/posts/blog-next-13#metadata-api)を参照。

### フィード対応

`Feed`というライブラリを使って形式を整え、上と同じ要領でビルド時に RSS、Atom、JSON Feed 用のファイルを吐かせている。

<https://github.com/jpmonette/feed>

```ts title="hooks/scripts/feed.mts"
import fs from "fs";

import { Feed } from "feed";

import { dateConverter } from "./lib/build.js";
import { SITEDATA } from "./lib/constant.js";
import { getPostsData } from "./lib/fs.js";

// variables
const HOST = "https://www.haxibami.net";

// generate feed
const feedGenerator = async () => {
  const author = {
    name: "haxibami",
    email: "contact@haxibami.net",
    link: HOST,
  };

  const date = new Date();
  const feed = new Feed({
    title: SITEDATA.blog.title,
    description: SITEDATA.blog.description,
    id: HOST,
    link: HOST,
    language: "ja",
    image: `${HOST}/kripcat.jpg`,
    favicon: `${HOST}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${HOST}/rss/feed.xml`,
      json: `${HOST}/rss/feed.json`,
      atom: `${HOST}/rss/atom.xml`,
    },
    author: author,
  });

  const blogs = await getPostsData("articles/blog");

  blogs.forEach((post) => {
    const url = `${HOST}/blog/posts/${post.data?.slug}`;
    feed.addItem({
      title: `${post.data?.title}`,
      description: `${post.preview}`,
      id: url,
      link: url,
      guid: url,
      date: new Date(dateConverter(post.data?.date)),
      category: post.data?.tags
        ? post.data?.tags.map((tag) => ({
            name: tag,
          }))
        : [],
      enclosure: {
        url: encodeURI(
          `${HOST}/api/ogp?title=${post.data?.title}&date=${post.data?.date}.png`,
        ),
        length: 0,
        type: "image/png",
      },
    });
  });

  fs.mkdirSync("public/rss", { recursive: true });
  await Promise.all([
    fs.promises.writeFile(
      "public/rss/feed.xml",
      feed.rss2().replace(/&/g, "&amp;"),
    ),
    fs.promises.writeFile("public/rss/atom.xml", feed.atom1()),
    fs.promises.writeFile("public/rss/feed.json", feed.json1()),
  ]);
};

const GenFeed = () => {
  return new Promise<void>((resolve) => {
    feedGenerator();
    resolve();
  });
};

export default GenFeed;
```

## 感想

最高！はてなブログや Qiita、Zenn あたりと張り合える書き心地かもしれない。
