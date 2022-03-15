import type { AppProps } from "next/app";
import "../styles/global.scss";
import Context from "lib/store";
// TODO: use chakra ui
//import { ChakraProvider } from "@chakra-ui/react";
//import theme from "lib/theme";

import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  const initialState = { state: { metas: [] } };
  return (
    <Context.Provider value={initialState}>
      {/*<ChakraProvider theme={theme}>*/}
      <Component {...pageProps} />
      {/*</ChakraProvider>*/}
    </Context.Provider>
  );
}
export default MyApp;
