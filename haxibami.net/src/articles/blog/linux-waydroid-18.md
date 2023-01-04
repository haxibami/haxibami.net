---
slug: "linux-waydroid-18"
title: "Linux / Waydroid でAndroid 11を動かし、ウマ娘をプレイする"
date: "20220901"
description: "【令和最新版】Linuxでもウマ娘をプレイする方法"
tags: ["tech", "linux", "android"]
---

（2023/01/04 更新）
Waydroid 公式のイメージが LineageOS 18 / Android 11 系に更新されたため、以下の内容のうちビルドプロセスについては不要になった。

![結果](/image/waydroid_uma.png)

ちなみに私はウマ娘をプレイしたことがない。したがって、確認しているのはアプリの起動・オープニングムービーの表示までである。

## 背景

知られている通り、Android カーネルはほぼ Linux そのものである。これを逆手に取り、Linux カーネルで Android を動かそうと試みた賢い人々がおり、結果として以下のような形に結実した。

<https://waydro.id/>

<https://github.com/waydroid/waydroid/>

これまでも単なる Android エミュレータなら無数にあったが、Waydroid はエミュレーションという手法を慎重に避ける。代わりに`lxc`で立てたコンテナ内で Android を動かすアプローチを取っており、これに伴って以下のメリットがある。

- ネイティブハードウェアの活用による省リソース化
- ホストシステムとのシームレスな統合

さて、単に Waydroid を動作させるだけなら[公式の手順](https://docs.waydro.id/)を参照すればよいが、ここでは公式イメージ（Lineage 17 / Android 10）ではなく開発版イメージ（Lineage 18 / Android 11）をビルド・導入する手順を書く。なぜならウマ娘の動作には Android 11 のイメージが必要だから（後述）。

## 手順

### 実験環境

| key      | val                  |
| -------- | -------------------- |
| OS       | Arch Linux           |
| CPU      | Intel Core i7-11700K |
| RAM      | 32GB                 |
| GPU      | AMD RX6600XT         |
| Kernel   | 5.19.6-zen1-1-zen    |
| Waydroid | v1.3.0               |

通常の Android のビルド環境、および Waydroid 本体（イメージを除く）の導入は済んでいるものとする。

### 要求環境

- **250GB 以上の空き容量**
- 根気
- Linux 環境
- Wayland 環境
- それなりの速度のネットワーク
- （できれば）コア数の多い CPU

### 1. イメージ作成

親切なことにビルド手順についても[公式ドキュメント](https://docs.waydro.id/development/compile-waydroid-lineage-os-based-images)が整備されているが、2022 年 9 月時点では LineageOS 17 / Android 10 向けとなっているため、該当部分を修正している。

#### 依存パッケージのインストール

通常の Android（AOSP）のビルド環境に加えて、`meson`, `simg2img`等が必要になる。

```sh
# Arch Linux
sudo pacman -S --needed meson android-tools

# Ubuntu (20.04-)
sudo apt install meson android-sdk-libsparse-utils
```

このほかにも依存関係があるかもしれないので、ビルドがコケたら適宜インストールする。

#### 初期化・マニフェスト取得

```sh
mkdir lineage && cd lineage
repo init -u https://github.com/LineageOS/android.git -b lineage-18.1 --depth 1
repo sync build/make
wget -O - https://raw.githubusercontent.com/waydroid/android_vendor_waydroid/lineage-18.1/manifest_scripts/generate-manifest.sh | bash
```

#### ソースの同期

オプションで並列実行を指定しているが、それでもありえん時間がかかる。なんらかの理由により途中で失敗した場合は再実行する。

```sh
repo sync -c --no-tags -j$(nproc)
```

#### ビルド設定

`lunch`の引数は対象の CPU アーキテクチャに合わせる。

```sh
. ./build/envsetup.sh
lunch lineage_waydroid_x86_64-userdebug
```

#### ビルド実行

メモリが不足する場合コア数を調整する。

```sh
make systemimage -j$(nproc)
make vendorimage -j$(nproc)
```

#### イメージ形式の変換

```sh
simg2img out/target/product/waydroid_x86_64/system.img /your/target/path/system.img
simg2img out/target/product/waydroid_x86_64/vendor.img /your/target/path/vendor.img
```

できたイメージを適切な場所（たいていは`/usr/share/waydroid-extra/images`以下？）に移す。

#### コンテナ設定

```txt
# /etc/gbinder.d/anbox.conf

[General]
ApiLevel = 30
```

新しいバージョンでは Android 内部の変数を[読んでくれる](https://github.com/waydroid/waydroid/blob/a6747e250f10b55153035efd1cd15dda089e077b/tools/helpers/protocol.py)ので不要かもしれない。

#### 初期化

ここでいったん Waydroid 環境を初期化しておく。

```sh
sudo systemctl start waydroid-container.service
sudo waydroid init
```

### 2. GAPPS / ARM 対応

どちらかというと以下が本題である。

ここまでで`x86_64`のイメージが動作するようになったが、ウマ娘はじめたいていの娯楽アプリは ARM 向けにしか作られていないため、このままでは動作しない。そもそも Play Store すら入っていない。そこで OpenGAPPS と libhoudini を導入する。

- [OpenGAPPS](https://opengapps.org/)
  - カスタム ROM に Play Store を導入する際に使われるやつ。
- libhoudini
  - Intel が提供している x64-ARM 間の翻訳レイヤ。最近 [Windows Subsystem for Android](https://docs.microsoft.com/ja-jp/windows/android/wsa/) が登場したことで再び脚光を浴びた。
  - Android 11 以上にしか対応していない。わざわざイメージをビルドしたのはこれが理由。

導入にあたっては以下のスクリプトが助けになる。

<https://github.com/casualsnek/waydroid_script>

手前味噌ではあるが、以下のフォークでは Android 11 向けにいくつかの点を改善している。こちらを使うことを推奨する。

<https://github.com/haxibami/waydroid_script>

ここからは**流入者のリテラシーを保障する**ため踏み込んだ説明は避けるが、README のとおり

1. OpenGAPPS を導入し
2. libhoudini を導入し
3. Android ID を取得し、[Google のページ](https://www.google.com/android/uncertified/?pli=1)で登録する

手続きで、Play Store と ARM エミュレーションが動作する。うまくいくと冒頭のような感じになる。

ターミナルの右半分は GPU の使用状況、画面最上部のバーの桃色部分は CPU 使用率をそれぞれ示している。CPU 使用率はごく低く、GPU もハードウェアアクセラレーションが効いているのが確認できる。

## 結論

本当にすごい時代になった。が、ウマ娘をプレイしていないので特に思うところはない。

## 補遺

ここまで書くと万能のようだが、動かないアプリも一定数ある。Clash Royale、プリコネ RD などは手元で動作しなかった。さらにいえばブルーアーカイブはストアに表示すらされなかった。**透き通るような世界観**ってそういうことだったんですか？

原因として考えられること：

- 地域設定
  - 一応日本には設定した
- Vulkan が動かない
  - Waydroid v1.3.1 で仮サポートが[追加された](https://github.com/waydroid/waydroid/commit/43ab2b48853796f20715b1c883c3b4a7e6e95de2)が、虚無が表示されるなどの不具合がある
- root 化検知に引っかかっている
  - Waydroid は root 化された LineageOS を動かしているに等しいため、root 化検知が働いている可能性がある
