---
slug: "blog-next-13"
title: "ブログをNext.js 13に移行した"
date: "20230303"
description: "React Server Component / app directory に対応"
tags: ["tech", "web", "nextjs", "react"]
---

## はじめに

:tada: Next.js 13.2 がリリースされ、app directory (beta) での React Server Component（以下 RSC）が実用できそうな感じになってきたため、このサイトも移行した。Metadata API、Route Handler 等も同時に導入した。

<https://github.com/haxibami/haxibami.net>

## やったこと

（一般的な設定については[ドキュメント](https://beta.nextjs.org/docs)等を参照）

### next.config.js

```js title="next.config.mjs" {5-11}
/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      "playwright",
      "svgo",
      "plaiceholder",
      "@plaiceholder/next",
      "fetch-site-metadata",
    ],
    scrollRestoration: true,
    appDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["asciinema.org", "raw.githubusercontent.com"],
  },
};
```

`experimental.serverComponentsExternalPackages`という項目がけっこう重要。Markdown の処理に node 依存のライブラリを使用している場合、該当ライブラリをここに列挙する必要がある。

<https://beta.nextjs.org/docs/api-reference/next-config#servercomponentsexternalpackages>

あと関係ないが `next.config.js` はドシドシ ESM（`.mjs`）で書こう。

### Markdown / MDX の処理

[公式ブログ](https://nextjs.org/blog/next-13-2)を見る限り、`@next/mdx`、`next-mdx-remote`、`contentlayer`の三者は現時点（2023/03/03）で RSC で利用できる。

<https://github.com/hashicorp/next-mdx-remote>

<https://contentlayer.dev>

`next-mdx-remote/rsc`を使ったところ、入出力の仕様が微妙に変更されていた。`compileMDX` で JSX を直接吐かせるか、`<MDXRemote>`コンポーネントに Markdown / MDX を食わせるか選べる（おそらくどちらでも出力に差はない）。

そのほか、frontmatter に型を付けられるようになった。

```ts title="lib/compiler.ts" {41-47}
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkJaruby from "remark-jaruby";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";

import MDXComponent from "components/MDXComponent";
import rehypeImageOpt from "lib/rehype-image-opt";
import { remarkLinkCard, extLinkHandler } from "lib/remark-link-card";
import remarkMermaid from "lib/remark-mermaid";

import type { Options } from "rehype-pretty-code";

const rpcOptions: Partial<Options> = {
  theme: {
    light: "poimandres",
  },
  keepBackground: true,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

const compiler = async (source: string) => {
  const result: Promise<{
    content: JSX.Element;
    frontmatter: {
      slug: string;
      title: string;
      date: string;
      description: string;
      tags: string[];
    };
  }> = compileMDX({
    source,
    components: MDXComponent,
    options: {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkGemoji,
          remarkMath,
          remarkJaruby,
          remarkLinkCard,
          remarkUnwrapImages,
          [
            remarkMermaid,
            {
              wrap: true,
              className: ["mermaid"],
            },
          ],
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeKatex,
          [rehypePrettyCode, rpcOptions],
          rehypeImageOpt,
          rehypeRaw,
        ],
        remarkRehypeOptions: {
          handlers: {
            extlink: extLinkHandler,
          },
        },
        format: "md",
      },
      parseFrontmatter: true,
    },
  });
  return result;
};

export default compiler;
```

### Route Handler による OG 画像生成

Next.js 13.2 で API Routes を代替する Route Handler が登場したため、ついに[OG 画像生成](/blog/posts/blog-renewal#og-画像の生成)で使っていた `pages` ディレクトリを完全に廃止[^1] できるようになった。

[^1]: 厳密には `404.js` がまだ残っているが、こちらで書かなくても処理されるのでディレクトリ自体は削除可能

<https://beta.nextjs.org/docs/routing/route-handlers>

```tsx title="app/api/ogp/route.tsx"
import type { NextRequest } from "next/server";

import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 80)
      : "";
    const date = searchParams.has("date")
      ? `📅 ― ${searchParams.get("date")?.slice(0, 8)}`
      : "";

    // CJK font is so large that if placed locally it easily exceeds the 1MB Edge Function limit >_<
    const notoFontData = await fetch(
      "https://rawcdn.githack.com/haxibami/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Bold.woff"
    ).then((res) => res.arrayBuffer());

    const robotoFontData = await fetch(
      new URL("../../../assets/RobotoMono-Medium.woff", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const pngIcon = new URL(
      "../../../assets/icon_ange_glasses_192.png",
      import.meta.url
    ).toString();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
            fontFamily: "Noto Sans CJK JP",
            backgroundColor: "#120e12",
            color: "#f2f0e6",
          }}
        >
          <div tw="flex flex-col p-12 w-full h-full border-solid border-4 border-white rounded-xl">
            <div tw="flex flex-1 max-w-full items-center max-h-full">
              <h1 tw="text-6xl leading-tight max-w-full">
                <p tw="w-full justify-center">{title}</p>
              </h1>
            </div>
            <div tw="flex flex-row justify-between items-center w-full">
              <div tw="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pngIcon}
                  alt="haxicon"
                  width={100}
                  height={100}
                  tw="rounded-full mr-5"
                />
                <h2 tw="text-4xl mr-5">
                  <p
                    style={{
                      fontFamily: "Roboto Mono",
                    }}
                  >
                    haxibami.net
                  </p>
                </h2>
              </div>
              <div tw="flex">
                <h2 tw="text-4xl">
                  <p>{date}</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Noto Sans CJK JP",
            data: notoFontData,
            weight: 700,
            style: "normal",
          },
          {
            name: "Roboto Mono",
            data: robotoFontData,
            weight: 500,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
```

### Metadata API

同じく Next.js 13.2 で登場。ドキュメント通りにやるだけ

```tsx title="app/page.tsx"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "haxibami",
  description: "haxibamiのウェブサイト",
  openGraph: {
    title: "haxibami",
    description: "haxibamiのウェブサイト",
    url: `https://www.haxibami.net/`,
    type: "website",
    images: {
      url: `https://www.haxibami.net/icon_ange_glasses_512.webp`,
      width: 512,
      height: 512,
    },
  },
  twitter: {
    card: "summary",
    title: "haxibami",
    description: "haxibamiのウェブサイト",
    images: `https://www.haxibami.net/icon_ange_glasses_512.webp`,
    site: "@haxibami",
    siteId: "1077091437517238272",
    creator: "@haxibami",
    creatorId: "1077091437517238272",
  },
};
```

## 所感

完全な静的サイトゆえ、実のところそれほど変化はない。バンドルサイズは多少小さくなった。

![ビルド結果](/image/bundlesize_next13.png)
