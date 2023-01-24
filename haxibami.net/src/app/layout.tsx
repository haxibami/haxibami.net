import React from "react";

import "../styles/global.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Rubik } from "@next/font/google";
import localFont from "@next/font/local";

import Providers from "components/providers";

const rubik = Rubik({ subsets: ["latin"] });

const redOctober = localFont({
  src: "./asset/RedOctober.woff2",
  variable: "--red-october",
});

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${rubik.className} ${redOctober.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
