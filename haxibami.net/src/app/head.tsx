import SharedHead from "components/SharedHead";
import { HOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

export default function Head() {
  const pageMetaData: PageMetaData = {
    title: "haxibami",
    sitename: `${HOST}`,
    description: "haxibamiのホームページ",
    ogImageUrl: `https://${HOST}/icon_ange_glasses_512.webp`,
    pageRelPath: "",
    pagetype: "website",
    twcardtype: "summary",
  };
  return <SharedHead {...pageMetaData} />;
}
