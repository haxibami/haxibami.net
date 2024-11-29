import { HTMLProcessingParser, jaModel } from "budoux";
import type { HTMLProcessingParser as HTMLProcessingParserType } from "budoux";
import { win } from "budoux/dist/win";

let cachedParser: HTMLProcessingParserType | null = null;

export function getBudouxParser() {
  if (!cachedParser) {
    const wbr = win.document.createElement("wbr");
    cachedParser = new HTMLProcessingParser(jaModel, {
      className: "budoux",
      separator: wbr,
    });
  }
  return cachedParser;
}

export const budouxProcess = (html: string) =>
  getBudouxParser().translateHTMLString(html);
