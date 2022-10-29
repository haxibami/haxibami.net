import React from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Rubik } from "@next/font/google";

import Providers from "components/providers";

// If loading a variable font, you don't need to specify the font weight
const rubik = Rubik({ subsets: ["latin"] });

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={rubik.className}>
      <Providers>{children}</Providers>
    </div>
  );
}
