import { HTMLProcessingParser, jaModel } from "budoux";
import { win } from "budoux/dist/win";

const wbr = win.document.createElement("wbr");
export const budouxParser = new HTMLProcessingParser(jaModel, {
  className: "budoux",
  separator: wbr,
});
