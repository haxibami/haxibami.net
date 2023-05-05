import React from "react";

import "styles/global.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

import Providers from "components/providers";
import { HOST } from "lib/constant";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const redOctober = localFont({
  src: "./asset/RedOctober.woff2",
  variable: "--font-redoctober",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${HOST}`),
  creator: "haxibami",
  publisher: "haxibami",
  authors: [{ name: "haxibami", url: `https://${HOST}` }],
  generator: "Next.js",
  applicationName: "haxibami",
  openGraph: {
    siteName: "haxibami",
    locale: "ja_JP",
  },
  icons: {
    icon: {
      url: `/favicon.ico`,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": `/rss/feed.xml`,
      "application/atom+xml": `/rss/atom.xml`,
      "application/json": `/rss/feed.json`,
    },
  },
  twitter: {
    // TODO: this value somehow cannot be inherited
    site: "@haxibami",
    siteId: "1077091437517238272",
    creator: "@haxibami",
    creatorId: "1077091437517238272",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${montserrat.variable} ${redOctober.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
