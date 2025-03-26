/** @jsxImportSource react */
/** @jsxRuntime automatic */

import { getBudouxParser } from "@/lib/budoux";
import satori from "satori";
import sharp from "sharp";

const parser = getBudouxParser();

const [ibmPlexFontData, robotoFontData, iconBuffer] = await Promise.all([
  Bun.file("./src/assets/IBMPlexSansJP-Bold.woff").arrayBuffer(),

  Bun.file(
    "./node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff",
  ).arrayBuffer(),

  Bun.file("./src/assets/kripcat_720.jpg").arrayBuffer(),
]);

const icon = Buffer.from(iconBuffer).toString("base64");

const ogImage = async (text: string, date?: Date, emoji?: string) => {
  const svg = await satori(
    <div
      style={{
        fontFamily:
          "IBM Plex Sans JP, Roboto Mono, Noto Color Emoji, sans-serif",
        backgroundColor: "#1e1e20",
        color: "#e3e4e6",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#e3e4e6",
          color: "#202225",
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
            fontSize: "3.5rem",
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            lineHeight: "1.3",
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
          name: "Roboto Mono",
          data: robotoFontData,
          weight: 500,
          style: "normal",
        },
        {
          name: "IBM Plex Sans JP",
          data: ibmPlexFontData,
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
  const imgBuffer = sharp(Buffer.from(svg))
    .png({
      quality: 60,
    })
    .toBuffer();
  return imgBuffer;
};

export default ogImage;
