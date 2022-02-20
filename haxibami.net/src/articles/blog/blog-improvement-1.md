---
slug: "blog-improvement-1"
title: "ブログ改良（1）"
date: "20220215"
tags: ["tech"]
---

### リファクタリング

#### 構造の整理

:broom:

できるだけページ要素をコンポーネント化して、SCSS の書き直しをやった。ディレクトリ・参照関係も多少綺麗にした。

```scss
article {
  width: 70vw;
  margin-top: calc(var.$line_width + 2.5rem);
  @include lib.colored_link;
  @include lib.article_paragraph;
  @include lib.table;
  @include lib.code_inline;
  @include lib.code_block;
  @include lib.katex;
  @include lib.quote;
  @include lib.list;
  @include lib.imagelimit;
  @include lib.article_headlines;
  @include lib.footnotes;
}
```

綺麗？ :thinking_face:

#### renovate-bot の導入

:robot_face:

https://github.com/renovatebot/renovate 。勝手に依存パッケージを更新してくれるらしい。

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base", ":timezone(Asia/Tokyo)"],
  "schedule": ["after 9am on monday", "before 12am on monday"],
  "dependencyDashboard": true,
  "packageRules": [
    {
      "groupName": "dependencies (minor update)",
      "matchDepTypes": ["dependencies"],
      "matchUpdateTypes": ["minor", "patch", "pin", "digest"],
      "automerge": true
    },
    {
      "groupName": "devDependencies",
      "matchDepTypes": ["devDependencies"],
      "automerge": true
    }
  ]
}
```

## 雑感

かなり何もできなかった。最近こういう日が多い。
