import { HTMLProcessingParser, jaModel } from "budoux";
import { parseHTML } from "linkedom";

import type { HTMLProcessingParser as HTMLProcessingParserType } from "budoux";

let cachedParser: HTMLProcessingParserType | null = null;

const { document } = parseHTML("<!doctype html><html></html>");

export function getBudouxParser() {
  if (!cachedParser) {
    const wbr = document.createElement("wbr");
    cachedParser = new HTMLProcessingParser(jaModel, {
      className: "budoux",
      separator: wbr,
    });
  }
  return cachedParser;
}

export const budouxProcess = (html: string) =>
  getBudouxParser().translateHTMLString(html);
