import type { AppProps } from "next/app";

import "../styles/global.scss";
// TODO: use chakra ui
//import { ChakraProvider } from "@chakra-ui/react";
//import theme from "lib/theme";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from "next-themes";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    /*<ChakraProvider theme={theme}>*/
    <ThemeProvider defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
    /*</ChakraProvider>*/
  );
}
export default MyApp;
