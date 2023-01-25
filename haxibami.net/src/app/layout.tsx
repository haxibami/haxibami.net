import React from "react";

import "styles/global.css";
import { Rubik } from "@next/font/google";
import localFont from "@next/font/local";

import Providers from "components/providers";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

const redOctober = localFont({
  src: "./asset/RedOctober.woff2",
  variable: "--font-redoctober",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${rubik.variable} ${redOctober.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
