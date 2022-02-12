---
slug: "blog-renewal"
title: "ブログをつくった"
date: "20220209"
tags: ["tech", "web", "nextjs"]
---

無心で投稿できる空間がほしくて。

## 基盤

いつも通り、Next.js + TypeScript + scss (module CSS)。

## 機能

### Markdown での記事管理

remark-gfm で GFM 対応、remark-emoji で絵文字対応。

### GFM

```md
- こうやって
  - リストできるし[^1]

[^1]: 脚注も使える
```

- こうやって
  - リストできるし[^1]

[^1]: 脚注も使える

### 引用

> 星屑落ちて 華は散っても  
> キラめく舞台に 生まれて変わる  
> 新たな私は 未知なる運命  
> 新たな私は まだ見ぬ戯曲  
> 愛城華恋は 舞台に一人  
> 愛城華恋は 次の舞台へ

### シンタックスハイライト

無難に[prism.js](https://prismjs.com)を使った。`prismjs`と`babel-plugin-prismjs`を入れて、`.babelrc`に対象言語を指定するのが簡便でいい。

```json
{
  "presets": ["next/babel"],
  "plugins": [
    ["inline-react-svg"],
    [
      "prismjs",
      {
        "languages": [
          "javascript",
          "bash",
          "c",
          "cpp",
          "css",
          "markup",
          "bash",
          "diff",
          "docker",
          "git",
          "go",
          "json",
          "markdown",
          "php",
          "python",
          "jsx",
          "toml",
          "tsx",
          "regex",
          "ruby",
          "rust",
          "typescript",
          "vim",
          "yaml"
        ],
        "plugins": [],
        "css": true
      }
    ]
  ]
}
```

ただ[urara.vim](https://github.com/haxibami/urara.vim)ベースのカスタムテーマが使いたかったので、別途 css を import して対応した。
