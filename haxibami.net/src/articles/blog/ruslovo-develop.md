---
slug: "ruslovo-develop"
title: "はじめてのRust: CLIツール"
date: "20220215"
tags: ["tech", "rust", "russian"]
---

## きっかけ

ロシア語を勉強する学生が必ずといっていいほどお世話になるものがひとつあり、[東外大のロシア語辞書](http://cblle.tufs.ac.jp/dic/ru/)がそれだ。このインターネット時代、そのへんを探せばオンライン単語帳くらいごまんとありそうなものだが、ロシア語に関してはあんまりない。というかこれしか有用なのがない。ゆえに誰もが（たぶん）使っている。紙の辞書？　研究社露和辞典をどうぞ。[^1]

[^1]: 定価 8580 円（2022/02/11 調べ）

さてこの辞書、学外で使わせていただいているという立場上本来なら文句をつけるのも許されないわけだが、不満がないわけではない。ちょっとアクセスしてもらえばわかるだろう。検索のためにいちいちマウス操作が必要とか、ゼロ年代インターネットっぽい要素配置とか、SSL 未対応とか（これはもうどうしようもない）、そして終いには最下部に煌めく "2005" の文字。マジで？

端的に言えばユーザー体験がよろしくない。かといって高度な GUI が必要なたぐいのものでもない。私としては、ささっとコマンドラインから検索できて、結果が綺麗に表示されればそれで構わない。ちょうどなにか CLI ツールを作りたいと思っていたこともあり、これを題材にできないか考えてみた。

しかし API が公開されているわけもなく、いい感じに問い合わせてデータを引っ張ってくることもできない。そこで URL を見てみた。単語 "русский" を検索した結果ページの URL が以下だ。

```txt
http://cblle.tufs.ac.jp/dic/ru/v_search_list.php?serchTxt=%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9&searchWayID=4&serch_button=%E3%80%80%E6%A4%9C%E7%B4%A2%E3%80%80
```

全然 PHP のことは知らないが、PHP でなんかやってるな〜という印象をうける。エンコーディングを戻して最低限の要素を並べると下のようになる。

```txt
http://cblle.tufs.ac.jp/dic/ru/v_search_list.php?serchTxt=русский&searchWayID=4
```

明らかにクエリパラメータが丸出しで、もうちょっとした API みたいなもんである。少なくとも検索したい単語と検索方法から URL を生成して問い合わせれば、望んだ単語の検索結果は取得できそうだ。

問題は取得した HTML をどうやってコマンドラインに表示するかだ。こういうのは JavaScript でゴニョゴニョするのが（技術の蓄積から見ても）最適そうだが、なんとなく癪でそうしなかった。かといって Python で書くのはさらにまずい。そもそも向こうのサーバでデータベースをクエリして生成された成果物である HTML を、こっちでもう一度パースする無駄な手間が入っている時点で、なんかもうオーバーヘッドがすごそうである。もっとこう、高速な言語で（露骨な議論誘導）……

あっ、**Rust**!

そういうわけで、リモートの HTML を取得、パースして出力するごく初歩的な Rust ツールを作ってみようと思い立った。~~断じて`cargo build` で並列コンパイルが走るのが気持ちいいからではない。断じて。~~

## 中身

Repo は以下。

https://github.com/haxibami/ruslovo-tufs

以下のクレートが優秀すぎたため、もとから少ない手間がさらに減ってしまった。

### ureq

https://github.com/algesten/ureq

軽量の[reqwest](https://github.com/seanmonstar/reqwest)オルタナティヴ。

### clap

https://github.com/clap-rs/clap

コマンドライン引数のパーサ。簡単に引数が取得できて、 `--help` やらの出力設定も勝手に行われる。ややオーバーキル感がある。

### tl

https://github.com/y21/tl

HTML のパーサ。何と比べればいいのかよくわからないが、少なくとも今回の処理で速度上の問題を感じることはない程度には高速だった。

### tabled

https://github.com/zhiburt/tabled

struct をいい感じに整形して出力してくれるクレート。

## 成果

![Preview](https://raw.githubusercontent.com/haxibami/ruslovo-tufs/master/preview.png)

:v: いえーい

## 感想

Cargo すげ〜以外の感想がない。エコシステムが充実しているので、ライブラリを引っ張ってくる手間が下がり、初心者にも参入しやすい。ちょっとなにか作るにはかなり便利かもしれない。

## おまけ: コード

まだ理解しきれていないし、おそらく褒められた書き方ではない。:thinking: で見てほしい。

```rust
use clap::Parser;
use regex::Regex;
use tabled::{MaxWidth, Modify, Row, Style, Table, Tabled};

#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    /// 検索したい単語
    word: String,

    /// 検索モード。前方一致（1）、後方一致（2）、完全一致（3）、あいまい（4）
    #[clap(short, long, default_value_t = 4)]
    searchway: u8,
}

#[derive(Tabled)]
struct WordSet {
    id: String,
    word: String,
    class: String,
    meaning: String,
}

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

fn main() -> Result<()> {
    // Generate search URL
    let args = Args::parse();
    let url_prefix = "http://cblle.tufs.ac.jp/dic/ru/v_search_list.php?serchTxt=";
    let url_suffix = "&searchWayID=";
    let url = format!(
        "{}{}{}{}",
        url_prefix, args.word, url_suffix, args.searchway
    );

    // Get HTML
    let body = match page_get(&url) {
        Ok(page) => page,
        Err(why) => {
            panic!("{:?}", why)
        }
    };

    // Parse HTML (for <form> block, which include word list)
    let dom = tl::parse(&body, tl::ParserOptions::default()).expect("HTML string too long");
    let parser = dom.parser();
    let form = dom
        .query_selector("form")
        .expect("cannot find form block")
        .nth(2)
        .expect("cannot find 2nd form block")
        .get(parser)
        .expect("cannot parse block")
        .inner_html(parser);

    // Parse HTML (for <p> elements, each of which include single word)
    let innerdom = tl::parse(&form, tl::ParserOptions::default()).expect("HTML string too long");
    let innerparser = innerdom.parser();
    let wordlist = innerdom.query_selector("p").expect("cannot find wordlist");

    // Regex
    let nbsp = Regex::new(r"(&nbsp;)+").unwrap(); // "&nbsp;"
    let brac_close = Regex::new(r"\]").unwrap(); // "]"
    let extra_delim = Regex::new(r"\],\[").unwrap(); // "],["

    let mut wordsets: Vec<WordSet> = Vec::new();

    // Wordlist
    for line in wordlist {
        // Parse wordlist
        let line_parsed = line
            .get(innerparser)
            .expect("cannot parse line")
            .inner_text(innerparser);
        let delimadded = nbsp.replace_all(&line_parsed, ",");
        let delimadded_brac = brac_close.replace_all(&delimadded, "],");
        let delimrmed = extra_delim.replace(&delimadded_brac, "][");

        let mut splited: Vec<&str> = delimrmed.split(",").collect();

        if splited.len() < 4 {
            for _i in splited.len()..4 {
                splited.push("");
            }
        }

        let newword = WordSet {
            id: splited[0].to_string(),
            word: splited[1].to_string(),
            class: splited[2].to_string(),
            meaning: splited[3].to_string(),
        };

        wordsets.push(newword);
    }

    let table = Table::new(wordsets)
        .with(Style::PSEUDO) // use pseudo-table style
        .with(Modify::new(Row(1..)).with(MaxWidth::truncating(20, "..."))); // limit each row's width to 10

    println!("{}", table);

    Ok(())
}

fn page_get(url: &str) -> Result<String> {
    let resp = ureq::get(url).call();
    match resp {
        Ok(page) => match page.into_string() {
            Ok(input) => return Ok(input),
            Err(why) => return Err(Box::new(why)),
        },
        Err(why) => return Err(Box::new(why)),
    };
}
```
