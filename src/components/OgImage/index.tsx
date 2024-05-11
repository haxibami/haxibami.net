/** @jsxImportSource react */
/** @jsxRuntime automatic */

import { readFileSync } from "node:fs";

import satori from "satori";
import sharp from "sharp";

const ogImage = async (text: string, date?: Date, emoji?: string) => {
  const notoFontData = readFileSync("./src/assets/NotoSansCJKjp-Bold.woff");

  const robotoFontData = readFileSync(
    "./node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff",
  );

  //   const sfProFontData = await fetch(
  //     "https://www.apple.com/wss/fonts/SF-Pro-JP/v1/SFProJP_semibold.woff",
  //     {
  //       headers: {
  //         "User-Agent":
  //           "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
  //         Referer: "https://www.apple.com/wss/fonts",
  //       },
  //       cache: "force-cache",
  //     },
  //   ).then((res) => res.arrayBuffer());

  const sfProFontData = readFileSync("./src/assets/SFProJP_semibold.woff");

  //   const sfProDisplayFontData = await fetch(
  //     "https://www.apple.com/wss/fonts/SF-Pro-Display/v3/sf-pro-display_semibold.woff",
  //     {
  //       headers: {
  //         "User-Agent":
  //           "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
  //         Referer: "https://www.apple.com/wss/fonts",
  //       },
  //       cache: "force-cache",
  //     },
  //   ).then((res) => res.arrayBuffer());

  const sfProDisplayFontData = readFileSync(
    "./src/assets/sf-pro-display_semibold.woff",
  );

  const iconBuffer = readFileSync("./src/assets/kripcat_720.jpg");

  const icon = btoa(
    new Uint8Array(iconBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );

  const svg = await satori(
    <div
      style={{
        fontFamily:
          "SF Pro Display, SF Pro JP, Noto Sans CJK JP, Roboto Mono, Noto Color Emoji, sans-serif",
        backgroundColor: "#120e12",
        color: "#f2f0e6",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          color: "#120e12",
          display: "flex",
          flexDirection: "column",
          width: "30%",
          padding: "2.5rem",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: "17rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {emoji ?? "📝"}
          </h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          maxHeight: "100%",
          padding: "3rem",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            fontSize: "4rem",
            width: "100%",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "1.2",
          }}
        >
          {text}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <h2
              style={{
                fontFamily: "Roboto Mono",
                fontSize: "2.5rem",
              }}
            >
              <p>{date && `${date.toISOString().split("T")[0]}`}</p>
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={`data:image/jpeg;base64,${icon}`}
              alt="haxicon"
              width={100}
              height={100}
              style={{
                borderRadius: "9999px",
                marginRight: "1.25rem",
              }}
            />
            <h2
              style={{
                marginRight: "1.25rem",
                fontFamily: "Roboto Mono",
                fontSize: "2.5rem",
              }}
            >
              {"haxibami"}
            </h2>
          </div>
        </div>
      </div>
    </div>,
    {
      // debug: true,
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "SF Pro JP",
          data: sfProFontData,
          weight: 600,
          style: "normal",
        },
        {
          name: "SF Pro Display",
          data: sfProDisplayFontData,
          weight: 600,
          style: "normal",
        },
        {
          name: "Roboto Mono",
          data: robotoFontData,
          weight: 500,
          style: "normal",
        },
        {
          name: "Noto Sans CJK JP",
          data: notoFontData,
          weight: 700,
          style: "normal",
        },
      ],
      loadAdditionalAsset: async (code: string, segment: string) => {
        if (code === "emoji") {
          const emojiSvg = await fetch(
            `https://rawcdn.githack.com/googlefonts/noto-emoji/main/svg/emoji_u${segment
              .codePointAt(0)
              ?.toString(16)}.svg`,
            {
              cache: "force-cache",
            },
          ).then((res) => res.text());
          // convert svg to png since sharp doesn't support svg in svg
          return `data:image/png;base64,${await sharp(Buffer.from(emojiSvg), {
            density: 300,
          })
            .toFormat("png")
            .toBuffer()
            .then((buf) => buf.toString("base64"))}`;
        }
        return "";
      },
    },
  );
  const imgBuffer = await sharp(Buffer.from(svg))
    .toFormat("png", {
      quality: 75,
    })
    .toBuffer();
  return imgBuffer;
};

export default ogImage;
