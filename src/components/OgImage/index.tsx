/** @jsxImportSource react */
/** @jsxRuntime automatic */

import { loadDefaultJapaneseParser } from "budoux";
import satori from "satori";
import sharp from "sharp";

const parser = loadDefaultJapaneseParser();

const ogImage = async (text: string, date?: Date, emoji?: string) => {
  const [
    notoFontData,
    robotoFontData,
    sfProFontData,
    sfProDisplayFontData,
    iconBuffer,
  ] = await Promise.all([
    Bun.file("./src/assets/NotoSansCJKjp-Bold.woff").arrayBuffer(),

    Bun.file(
      "./node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff",
    ).arrayBuffer(),

    Bun.file("./src/assets/SFProJP_semibold.woff").arrayBuffer(),

    Bun.file("./src/assets/sf-pro-display_semibold.woff").arrayBuffer(),

    Bun.file("./src/assets/kripcat_720.jpg").arrayBuffer(),
  ]);

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
        backgroundColor: "#1e1e20",
        color: "#e7e7ea",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#e7e7ea",
          color: "#1e1e20",
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
        <div
          style={{
            marginTop: 0,
            fontSize: "4rem",
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            lineHeight: "1.2",
          }}
        >
          {parser.parse(text).map((word) => (
            <span key={word} style={{ display: "block" }}>
              {word}
            </span>
          ))}
        </div>
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
          return `data:image/svg+xml;base64,${Buffer.from(emojiSvg).toString(
            "base64",
          )}`;
        }
        return "";
      },
    },
  );
  const imgBuffer = await sharp(Buffer.from(svg))
    .toFormat("png", {
      quality: 60,
    })
    .toBuffer();
  return imgBuffer;
};

export default ogImage;
