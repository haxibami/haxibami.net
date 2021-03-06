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

## システム

### booster

https://github.com/anatol/booster

Go製の高速なinitramfsジェネレータ。yamlで設定を書く。

```yaml
modules_force_load: amdgpu
```

### bottom

https://github.com/ClementTsang/bottom

Rust 製のプロセス監視ツール。Bashtop や GoTop よりシンプルだが、必要十分。

![「topの逆で、bottom」というネーミング](/image/btm-ps.png)

### howdy / fprintd

https://github.com/boltgolt/howdy

https://gitlab.freedesktop.org/libfprint/fprintd

LinuxでもWindows Hello。IRカメラか指紋リーダーさえ付いていれば、howdy / fprintdをセットアップすることでログイン時やsudo実行時に生体認証が使える。

#### 注意点

howdy / fprintdによる認証はパスワードを完全に代替するもの**ではない**。したがって、ログイン時にこれらを利用すると、パスワードによって暗号化されたキーリングは解錠されない（[参照](https://github.com/boltgolt/howdy/issues/39)）。これを避けたい場合、生体認証はsudo用のみ設定することをおすすめする。

さらにリモートログインのことも考慮すると、sudo時に一旦通常通りパスワードを訊ねて、入力が空文字列であった場合のみ生体認証へ移行するのが望ましい。この設定が以下。

```txt
#%PAM-1.0

# /etc/pam.d/sudo

auth        sufficient      pam_unix.so try_first_pass likeauth nullok
auth        sufficient      pam_python.so /lib/security/howdy/pam.py
auth        sufficient      pam_fprintd.so
auth        include         system-auth
account     include         system-auth
session     include         system-auth
```

## デスクトップ・ディスプレイ

### lightdm-webkit2-theme-reactive

https://github.com/gitneeraj/lightdm-webkit2-theme-reactive

モダンな LightDM 用テーマ。[^1]

[^1]: 壁紙は[Pixiv - Ravioli](https://www.pixiv.net/artworks/89596288)より。[CC BY 4.0 ライセンス](https://creativecommons.org/licenses/by/4.0)

![Arch Linux-chan](/image/lightdm.png)

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

ブラウザ経由で手書き描画を受け付ける面白いディスプレイサーバー（？）。筆圧も感知するようなので、タブレットが余っている人はおもちゃにできる。

## ファイル

### onedriver

https://github.com/jstaf/onedriver

Go製のOneDriveクライアント。

### google-drive-ocamlfuse

https://github.com/astrada/google-drive-ocamlfuse

OCaml製のGoogle Driveクライアント。これがなければLinuxラップトップで大学生活を営むのは難しかったかもしれない。

小さなファイルの同期にややボトルネックがあるが、体感ではWindows版公式クライアントに劣らないパフォーマンスが出る。

![クラウドストレージたち](/image/gdrive-ocamlfuse.png)

## メディア

### yt-dlp

https://github.com/yt-dlp/yt-dlp

みんな大好き youtube-dl……の改良版。ブラウザの Cookie を利用した認証等が追加されている。

```sh
yt-dlp https://example.com/user/movie/view --cookies-from-browser chrome
```

### playerctl

https://github.com/altdesktop/playerctl

音声・映像の再生をコマンドラインから制御するツール。ターミナルから操作するだけでも便利だが、キーバインドを設定すると真価を発揮する。たとえば Sway の場合：

```txt
# ~/.config/sway/config

bindsym $mod+comma exec playerctl previous
bindsym $mod+period exec playerctl play-pause
bindsym $mod+slash exec playerctl next
bindsym $mod+shift+comma exec playerctl --player playerctld position -10
bindsym $mod+shift+slash exec playerctl --player playerctld position +10
```

この使用感に慣れてしまうと、もう二度とウィンドウを切り替えてマウスで再生ボタンを押す気にはならない。

そのほかの機能は以下の記事を参照。

https://zenn.dev/fabon/articles/9c8d2d3a6b3fb1


### PipeWire

https://pipewire.org/

> PipeWire is a project that aims to greatly improve handling of audio and video under Linux.

PipeWire は`pipewire-pulse`、`pipewire-alsa`、`pipewire-jack`で PulseAudio、ALSA、Jack をそれぞれ代替するほか、Wayland 環境では画面共有・録画（WebRTC、OBS）にも使用される[^2]。

[^2]: Tips: 現状、Wayland 環境の Zoom 公式アプリでは一部のデスクトップ環境を除いて画面共有が行えないが、この PipeWire とブラウザ版 Zoom を利用することで制限を回避できる。ブラウザ版 Zoom の利用には[この拡張機能](https://addons.mozilla.org/ja/firefox/addon/zoom-redirector/)が有用。

### WirePlumber

https://gitlab.freedesktop.org/pipewire/wireplumber

Lua で設定を書けるPipeWireのセッションマネージャ。たとえばデバイスのノード名を変えるには：

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

PipeWire 向けのサウンドエフェクトツール。イコライザーとかいろいろ。

![イコライザー](/image/easyeffects.png)

~~systemd を使う場合、以下のように自動で起動できる。~~

罠で、うまく起動しないことが多い。良いアプローチを模索中。

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

様々なヘッドホン・イヤホンの特性を測定し、機器ごとにもっともニュートラルな出力を与えるイコライザー設定を生成するためのプロジェクト。自前で測定もできるが、もっぱらリポジトリ内の`results`以下に蓄積された主要な機器の設定を利用するのが便利だ。前述の EasyEffects に`.txt`ファイルを読み込ませることで使える。

### noise-suppression-for-voice

https://github.com/werman/noise-suppression-for-voice

マイク用のノイズ抑制プラグイン。タイプ音・呼吸音などを除去してくれる。

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

本来はPulseAudio 向けのコマンドラインミキサーだが、`pipewire-pulse`に対しても使える。現在の音量やサウンドデバイスの一覧を簡潔な形で取り出すのに便利。

```sh
> pamixer --get-volume

90
```

## 入力関連

### mozc-ut

https://aur.archlinux.org/packages/mozc-ut

mozc の辞書強化版。パッケージ名からはわかりにくいが、中身は 2 代目の UT 辞書になっている。地名・人名・キャラクター・ネットスラングにめっぽう強く、Windows版Google 日本語入力の水準に近い。

### Emote

https://github.com/tom-james-watson/Emote

GTK を利用した絵文字パレット。あらゆる入力欄で Twitter / Discord 相当の絵文字が使えるようになる。

![emote](/image/emote.png)

### apple-emoji-linux

https://github.com/samuelngs/apple-emoji-linux

Apple スタイルの絵文字を Linux で使えるようにするパッケージ。なお、

> The code provided is for educational purposes only.

### libinput-gestures

https://github.com/bulletmark/libinput-gestures

タッチパッドの三・四本指スワイプに任意のコマンドを割り当てられるlibinputの拡張ツール。ブラウザバックとか、ワークスペースの切り替えとか。

```txt
# ~/.config/libinput-gestures.conf

gesture: swipe right 3 ~/.config/libinput-gestures/gestures backward
gesture: swipe left 3 ~/.config/libinput-gestures/gestures forward
gesture: swipe right 4 swaymsg workspace prev
gesture: swipe left 4 swaymsg workspace next
```

```sh
#!/bin/sh

# ~/.config/libinput-gestures/gestures

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

```txt
# ~/.config/sway/config

exec libinput-gestures-setup start
```

## その他

### meteo-qt

https://github.com/dglent/meteo-qt

システムトレイに常駐し、天気予報を通知するアプリ。

![天気予報](/image/meteo-qt.png)
