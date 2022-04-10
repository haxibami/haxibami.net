---
slug: "linux-tools-2022"
title: "Linux便利ツール2022"
date: "20220411"
tags: ["tech", "linux"]
---

知っている。きみたちはナードだから、知り合いに Linux の良さを説いてはドン引きされていることだろう。オタクくん、Linux なんか使ってるの？笑笑。だが安心してほしい ── ここに載っているのは Linux ツール、それも普段遣い向けの最高のユーティリティ群だ。インストールを済ませたら、デベロッパーに一礼し、祝杯をあげ、Windows / MacOS ユーザが指をくわえて眺めるさまを楽しむとしよう。

取り上げる内容は概ね以下のリストにあたる。随時更新する。

https://github.com/stars/haxibami/lists/linux-tools

## 目次

## セッション管理

### lightdm-webkit2-theme-reactive

https://github.com/gitneeraj/lightdm-webkit2-theme-reactive

モダンな LightDM 用テーマ。[^1]

[^1]: 壁紙は[Pixiv - Ravioli](https://www.pixiv.net/artworks/89596288)より。[CC BY 4.0 ライセンス](https://creativecommons.org/licenses/by/4.0)

![Arch Linux-chan](/image/lightdm.png)

## CLI / TUI ツール

### bottom

https://github.com/ClementTsang/bottom

Rust 製のプロセス監視ツール。Bashtop や GoTop よりシンプルだが、現在も継続的にメンテされている。

![Bottom](/image/btm-ps.png)

### yt-dlp

https://github.com/yt-dlp/yt-dlp

みんな大好き youtube-dl……の改良版。ブラウザの Cookie を利用した認証等が追加されている。

```sh
yt-dlp https://example.com/user/movie/view --cookies-from-browser chrome
```

### playerctl

https://github.com/altdesktop/playerctl

音声・映像の再生をコマンドラインから制御できるツール。主要なブラウザ、Spotify、mpv や VLC 等の動画プレイヤーに対応し、デーモン（`playerctld`）として常駐させることも可能。ターミナルから操作するだけでも強力だが、真価を発揮するのはキーバインドを設定したときだ。たとえば Sway の場合、以下の設定で前の曲、再生/停止、次の曲、10 秒前/後にそれぞれキーを割り当てられる。

```txt
# ~/.config/sway/config

bindsym $mod+comma exec playerctl previous
bindsym $mod+period exec playerctl play-pause
bindsym $mod+slash exec playerctl next
bindsym $mod+shift+comma exec playerctl --player playerctld position -10
bindsym $mod+shift+slash exec playerctl --player playerctld position +10
```

この使用感に慣れてしまうと、もう二度とウィンドウを切り替えてマウスで再生ボタンを押そうなどとは思わない。

そのほかの機能は以下の記事が詳しい。

https://zenn.dev/fabon/articles/9c8d2d3a6b3fb1

## メディア関連

### PipeWire

https://pipewire.org/

PipeWire は音声と映像を扱うモダンなマルチメディア・フレームワークだ。`pipewire-pulse`、`pipewire-alsa`、`pipewire-jack`で PulseAudio、ALSA、Jack をそれぞれ代替するほか、Wayland 環境ではブラウザ（WebRTC）での画面共有、OBS での画面録画に使用される。

現状、Wayland 環境の Zoom アプリでは一部のデスクトップ環境を除いて画面共有が行えない仕様だが、この PipeWire とブラウザ版 Zoom を利用することで制限を回避できるという事情もある。[^2]

[^2]: なお、ブラウザ版 Zoom の利用には[この拡張機能](https://addons.mozilla.org/ja/firefox/addon/zoom-redirector/)が有用。

### WirePlumber

https://gitlab.freedesktop.org/pipewire/wireplumber

Lua で柔軟に設定を書ける、PipeWire 向けのセッションマネージャ。たとえばデバイスのノード名を変えるには：

```lua
-- ~/.config/wireplumber/main.lua.d/51-headset-out-rename.lua

rule = {
  matches = {
    {
      { "node.name", "matches", "alsa_output.pci-0000_00_1f.3.analog-stereo" },
    },
  },
  apply_properties = {
    ["node.name"] = "Headset_output",
  },
}

table.insert(alsa_monitor.rules,rule)
```

### EasyEffects

https://github.com/wwmm/easyeffects

PipeWire 向けのサウンドエフェクトツール。

![イコライザー](/image/easyeffects.png)

systemd を使う場合、以下のように自動で起動できる。

```txt
# ~/.config/systemd/user/easyeffects.service

[Unit]
Description = EasyEffects daemon
Requires = pipewire-pulse.service
After = pipewire-pulse.service

[Service]
ExecStart = /usr/bin/easyeffects --gapplication-service
Restart = always
RestartSec = 5
TimeoutStopSec = 15

[Install]
WantedBy = default.target
```

### AutoEq

https://github.com/jaakkopasanen/AutoEq

様々なヘッドホン・イヤホンの特性を測定し、機器ごとにもっともニュートラルな出力を与えるイコライザー設定を生成するためのプロジェクト。自前で測定もできるが、もっぱら`results`以下に蓄積された主要な機器のプリセットを利用するのが便利だ。前述の EasyEffects にプリセットの`.txt`ファイルを読み込ませることで使える。

### noise-suppression-for-voice

https://github.com/werman/noise-suppression-for-voice

マイク向けのノイズ抑制プラグイン。タイプ音・呼吸音などを除去してくれる。

```txt
# /etc/pipewire/filter-chain/source-rnnoise.conf

...
context.modules = [
    ...
    { name = libpipewire-module-filter-chain
        args = {
            node.name        = "effect_input.rnnoise"
            node.description = "Noise Canceling source"
            media.name       = "Noise Canceling source"
            filter.graph = {
                nodes = [
                    {
                        type   = ladspa
                        name   = rnnoise
                        plugin = /usr/lib/ladspa/librnnoise_ladspa.so
                        label  = noise_suppressor_stereo
                        control = {
                            "VAD Threshold (%)" 40.0
                        }
                    }
                ]
            }
            capture.props = {
                node.passive = true
            }
            playback.props = {
                media.class = Audio/Source
            }
        }
    }
]
...
```

```txt
# /etc/pipewire/pipewire.conf
...
context.exec = [
    { path = "/usr/bin/pipewire" args = "-c /usr/share/pipewire/filter-chain/source-rnnoise.conf" }
]
...
```

### pamixer

https://github.com/cdemoulins/pamixer

PulseAudio 向けのコマンドラインミキサーだが、`pipewire-pulse`に対しても使える。音量やデバイス一覧を簡潔に取り出すのに便利。

```sh
> pamixer --get-volume

90
```

## 入力関連

### mozc-ut

https://aur.archlinux.org/packages/mozc-ut

mozc の辞書強化版。パッケージ名からはわかりにくいが、中身は 2 代目の UT 辞書になっている。地名・人名・キャラクター・ネットスラングにめっぽう強く、（プロプライエタリ版）Google 日本語入力の水準に近い。

### Emote

https://github.com/tom-james-watson/Emote

GTK を利用した絵文字パレット。あらゆる入力欄で Twitter / Discord 相当の絵文字が使えるようになる。

![emote](/image/emote.png)

### apple-emoji-linux

https://github.com/samuelngs/apple-emoji-linux

Apple スタイルの絵文字を Linux で使えるようにするパッケージ。なお、

> The code provided is for educational purposes only.

## ディスプレイ関連

### ddccontrol

https://github.com/ddccontrol/ddccontrol

外部モニタの輝度・RGB 比を操作できるツール。下みたいな力技ができたりする。

```txt
# ~/.config/sway/config

# brightness controls (requires non-root access to i2c devices)
bindsym $mod+F5 exec ddccontrol -f -r 0x10 -W -5 dev:/dev/i2c-1 | grep Brightness | cut -d "/" -f 2 | tee $WOBSOCK
bindsym $mod+F6 exec ddccontrol -f -r 0x10 -W +5 dev:/dev/i2c-1 | grep Brightness | cut -d "/" -f 2 | tee $WOBSOCK
```

### Weylus

https://github.com/H-M-H/Weylus

ブラウザ経由で手書き描画を受け付ける面白いディスプレイサーバー（？）。タブレットが余っている人は遊んでみると面白い。

## その他

### meteo-qt

https://github.com/dglent/meteo-qt

システムトレイに常駐し、天気予報を通知するアプリ。

![天気予報](/image/meteo-qt.png)
