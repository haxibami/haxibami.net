---
slug: "linux-tools-2022"
title: "Linux便利ツール2022"
date: "20220411"
description: "Linuxでよりよい生活を送るためのツール群の紹介"
tags: ["tech", "linux"]
---

知っている。きみたちはナードだから、知り合いに Linux の良さを説いてはドン引きされていることだろう。「オタクくん、Linux なんか使ってるの？　笑笑」。だが安心してほしい ── ここに載っているのは Linux 便利ツール、それも普段遣いに適したユーティリティ群だ。インストールを済ませたら、デベロッパーに一礼し、祝杯をあげ、Windows / MacOS ユーザが指をくわえて眺めるさまを楽しむとしよう。

取り上げる内容は概ね以下のリストにあたる。随時更新する。

<https://github.com/stars/haxibami/lists/linux-tools>

## システム

### booster

<https://github.com/anatol/booster>

Go 製の高速な initramfs ジェネレータ。yaml で設定を書く。

```yaml title="/etc/booster.yaml"
modules_force_load: amdgpu
```

### bottom

<https://github.com/ClementTsang/bottom>

Rust 製のプロセス監視ツール。Bashtop や GoTop よりシンプルだが、必要十分。

![「topの逆で、bottom」というネーミング](/image/btm-ps.png)

### howdy / fprintd

<https://github.com/boltgolt/howdy>

<https://gitlab.freedesktop.org/libfprint/fprintd>

Linux でも Windows Hello。IR カメラか指紋リーダーさえ付いていれば、howdy / fprintd をセットアップすることでログイン時や sudo 実行時に生体認証が使える。

#### 注意点

howdy / fprintd による認証はパスワードを完全に代替するもの**ではない**。したがって、ログイン時にこれらを利用すると、パスワードによって暗号化されたキーリングは解錠されない（[参照](https://github.com/boltgolt/howdy/issues/39)）。これを避けたい場合、生体認証は sudo 用のみ設定することをおすすめする。

さらにリモートログインのことも考慮すると、sudo 時に一旦通常通りパスワードを訊ねて、入力が空文字列であった場合のみ生体認証へ移行するのが望ましい。この設定が以下。

```txt title="/etc/pam.d/sudo"
#%PAM-1.0

auth        sufficient      pam_unix.so try_first_pass likeauth nullok
auth        sufficient      pam_python.so /lib/security/howdy/pam.py
auth        sufficient      pam_fprintd.so
auth        include         system-auth
account     include         system-auth
session     include         system-auth
```

## デスクトップ・ディスプレイ

### lightdm-webkit2-theme-reactive

<https://github.com/gitneeraj/lightdm-webkit2-theme-reactive>

モダンな LightDM 用テーマ。[^1]

[^1]: 壁紙は[Pixiv - Ravioli](https://www.pixiv.net/artworks/89596288)より。[CC BY 4.0 ライセンス](https://creativecommons.org/licenses/by/4.0)

![Arch Linux-chan](/image/lightdm.png)

### ddccontrol

<https://github.com/ddccontrol/ddccontrol>

外部モニタの輝度・RGB 比を操作できるツール。下みたいな力技ができたりする。

```txt title="~/.config/sway/config"
# brightness controls (requires non-root access to i2c devices)
bindsym $mod+F5 exec ddccontrol -f -r 0x10 -W -5 dev:/dev/i2c-1 | grep Brightness | cut -d "/" -f 2 | tee $WOBSOCK
bindsym $mod+F6 exec ddccontrol -f -r 0x10 -W +5 dev:/dev/i2c-1 | grep Brightness | cut -d "/" -f 2 | tee $WOBSOCK
```

### Weylus

<https://github.com/H-M-H/Weylus>

ブラウザ経由で手書き描画を受け付ける面白いディスプレイサーバー（？）。筆圧も感知するようなので、タブレットが余っている人はおもちゃにできる。

## ファイル

### onedriver

<https://github.com/jstaf/onedriver>

Go 製の OneDrive クライアント。

### google-drive-ocamlfuse

<https://github.com/astrada/google-drive-ocamlfuse>

OCaml 製の Google Drive クライアント。これがなければ Linux ラップトップで大学生活を営むのは難しかったかもしれない。

小さなファイルの同期にややボトルネックがあるが、体感では Windows 版公式クライアントに劣らないパフォーマンスが出る。

![クラウドストレージたち](/image/gdrive-ocamlfuse.png)

## メディア

### yt-dlp

<https://github.com/yt-dlp/yt-dlp>

みんな大好き youtube-dl……の改良版。ブラウザの Cookie を利用した認証等が追加されている。

```sh
yt-dlp https://example.com/user/movie/view --cookies-from-browser chrome
```

### playerctl

<https://github.com/altdesktop/playerctl>

音声・映像の再生をコマンドラインから制御するツール。ターミナルから操作するだけでも便利だが、キーバインドを設定すると真価を発揮する。たとえば Sway の場合：

```txt title="~/.config/sway/config"
bindsym $mod+comma exec playerctl previous
bindsym $mod+period exec playerctl play-pause
bindsym $mod+slash exec playerctl next
bindsym $mod+shift+comma exec playerctl --player playerctld position -10
bindsym $mod+shift+slash exec playerctl --player playerctld position +10
```

この使用感に慣れてしまうと、もう二度とウィンドウを切り替えてマウスで再生ボタンを押す気にはならない。

そのほかの機能は以下の記事を参照。

<https://zenn.dev/fabon/articles/9c8d2d3a6b3fb1>

### PipeWire

<https://pipewire.org/>

> PipeWire is a project that aims to greatly improve handling of audio and video under Linux.

PipeWire は`pipewire-pulse`、`pipewire-alsa`、`pipewire-jack`で PulseAudio、ALSA、Jack をそれぞれ代替するほか、Wayland 環境では画面共有・録画（WebRTC、OBS）にも使用される[^2]。

[^2]: Tips: 現状、GNOME 以外の Wayland 環境ではちょっと工夫しないと Zoom アプリでの画面共有が行えないが、この PipeWire とブラウザ版 Zoom を利用することで制限を回避できる。ブラウザ版 Zoom の利用には[この拡張機能](https://addons.mozilla.org/ja/firefox/addon/zoom-redirector/)が有用。

### WirePlumber

<https://gitlab.freedesktop.org/pipewire/wireplumber>

Lua で設定を書ける PipeWire のセッションマネージャ。たとえばデバイスの表示名を変えるには：

```lua title="~/.config/wireplumber/main.lua.d/51-headset-in-rename.lua"
rule = {
  matches = {
    {
      { 'node.name', 'matches', 'alsa_input.pci-0000_00_1f.3.analog-stereo' },
    },
  },
  apply_properties = {
    ['node.nick'] = 'Headset_input',
  },
}

table.insert(alsa_monitor.rules, rule)
```

### EasyEffects

<https://github.com/wwmm/easyeffects>

PipeWire 向けのサウンドエフェクトツール。イコライザーとかいろいろ。

![イコライザー](/image/easyeffects.png)

systemd を使う場合、以下のように自動で起動できる。

```txt title="~/.config/systemd/user/easyeffects.service"
[Unit]
Description=easyeffects daemon
PartOf=graphical-session.target
After=graphical-session.target

[Service]
Environment="G_MESSAGES_DEBUG=easyeffects"
ExecStart=/usr/bin/easyeffects --gapplication-service
Restart=on-failure

[Install]
WantedBy=graphical-session.target
```

### AutoEq

<https://github.com/jaakkopasanen/AutoEq>

様々なヘッドホン・イヤホンの特性を測定し、機器ごとにもっともニュートラルな出力を与えるイコライザー設定を生成するプロジェクト。もっぱらリポジトリ内の`results`以下に蓄積された計測結果を利用するのが便利だ。前述の EasyEffects に`.txt`ファイルを読み込ませることで使える。

### noise-suppression-for-voice

<https://github.com/werman/noise-suppression-for-voice>

マイク用のノイズ抑制プラグイン。タイプ音・呼吸音などを除去してくれる。

```txt title="/etc/pipewire/filter-chain/source-rnnoise.conf"
context.modules = [
    { name = libpipewire-module-filter-chain
        args = {
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
                            "VAD Threshold (%)" 50.0
                        }
                    }
                ]
            }
            audio.position = [ FL FR ]
            capture.props = {
                node.name = "effect_input.rnnoise"
                node.passive = true
            }
            playback.props = {
                node.name = "effect_output.rnnoise"
                media.class = Audio/Source
            }
        }
    }
]
```

### wpctl

WirePlumber の操作系。現在の音量等の情報を取り出せる。

```sh
> wpctl get-volume @DEFAULT_SINK@

Volume: 0.50
```

## 入力関連

### mozc-ut

<https://aur.archlinux.org/packages/mozc-ut>

mozc の辞書強化版。パッケージ名からはわかりにくいが、中身は 2 代目の UT 辞書になっている。地名・人名・キャラクター・ネットスラングにめっぽう強く、Windows 版 Google 日本語入力の水準に近い。

### rofimoji

<https://github.com/fdw/rofimoji>

rofi / wofi 等のランチャーを利用する絵文字パレット。あらゆる入力欄で Twitter / Discord 相当の絵文字が使えるようになる。

### apple-emoji-linux

<https://github.com/samuelngs/apple-emoji-linux>

Apple スタイルの絵文字を Linux で使えるようにするパッケージ。

### libinput-gestures

<https://github.com/bulletmark/libinput-gestures>

`libinput`を拡張し、タッチパッドの三・四本指スワイプに任意のコマンドを割り当てられるようにするツール。ブラウザバックとか、ワークスペースの切り替えとか。主にノート PC で便利。

```txt title="~/.config/libinput-gestures.conf"
gesture: swipe right 3 ~/.config/libinput-gestures/gestures backward
gesture: swipe left 3 ~/.config/libinput-gestures/gestures forward
gesture: swipe right 4 swaymsg workspace prev
gesture: swipe left 4 swaymsg workspace next
```

```sh title="~/.config/libinput-gestures/gestures"
#!/bin/sh

case "$@" in
    forward )
        echo "Forward" >> /tmp/gestures.log
        swaymsg seat seat0 cursor press BTN_EXTRA
        swaymsg seat seat0 cursor release BTN_EXTRA
        ;;
    backward )
        echo "Backward" >> /tmp/gestures.log
        swaymsg seat seat0 cursor press BTN_SIDE
        swaymsg seat seat0 cursor release BTN_SIDE
        ;;
esac
```

## その他

### meteo-qt

<https://github.com/dglent/meteo-qt>

システムトレイに常駐し、天気予報を通知するアプリ。

![天気予報](/image/meteo-qt.png)
