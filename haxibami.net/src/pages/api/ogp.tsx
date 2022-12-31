import type { NextRequest } from "next/server";

import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 80)
      : "";
    const date = searchParams.has("date")
      ? `📅 ― ${searchParams.get("date")?.slice(0, 8)}`
      : "";

    // CJK font is so large that if placed locally it easily exceeds the 1MB Edge Function limit >_<
    const notoFontData = await fetch(
      "https://rawcdn.githack.com/haxibami/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Bold.woff"
    ).then((res) => res.arrayBuffer());

    const robotoFontData = await fetch(
      new URL("../../assets/RobotoMono-Medium.woff", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const pngIcon = new URL(
      "../../assets/icon_ange_glasses_192.png",
      import.meta.url
    ).toString();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
            fontFamily: "Noto Sans CJK JP",
            backgroundColor: "#120e12",
            color: "#f2f0e6",
          }}
        >
          <div tw="flex flex-col p-12 w-full h-full border-solid border-4 border-white rounded-xl">
            <div tw="flex flex-1 max-w-full items-center max-h-full">
              <h1 tw="text-6xl leading-tight max-w-full">
                <p tw="w-full justify-center">{title}</p>
              </h1>
            </div>
            <div tw="flex flex-row justify-between items-center w-full">
              <div tw="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pngIcon}
                  alt="haxicon"
                  width={100}
                  height={100}
                  tw="rounded-full mr-5"
                />
                <h2 tw="text-4xl mr-5">
                  <p
                    style={{
                      fontFamily: "Roboto Mono",
                    }}
                  >
                    haxibami.net
                  </p>
                </h2>
              </div>
              <div tw="flex">
                <h2 tw="text-4xl">
                  <p>{date}</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Noto Sans CJK JP",
            data: notoFontData,
            weight: 700,
            style: "normal",
          },
          {
            name: "Roboto Mono",
            data: robotoFontData,
            weight: 500,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

export default handler;
