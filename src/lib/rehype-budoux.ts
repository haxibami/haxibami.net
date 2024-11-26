import { HTMLProcessingParser, jaModel } from "budoux";
import { win } from "budoux/dist/win";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";

import type { Element, Root } from "hast";
import type { Plugin } from "unified";

const targetTags = ["p", "li"];

const wbr = win.document.createElement("wbr");
const parser = new HTMLProcessingParser(jaModel, {
  className: "budoux",
  separator: wbr,
});

function shouldTranslate(node: Element) {
  return (
    targetTags.includes(node.tagName) &&
    !node.children.some(
      (child) => child.type === "element" && targetTags.includes(child.tagName),
    )
  );
}

const rehypeBudoux: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (typeof index !== "number") return;
      if (shouldTranslate(node)) {
        // Method 1: Runtime translation
        // node.children = [h("budoux-ja", node.children)];
        // Method 2: Build-time translation
        const newNode = fromHtml(parser.translateHTMLString(toHtml(node)), {
          fragment: true,
        }).children[0];
        newNode && parent?.children.splice(index, 1, newNode);
      }
    });
  };
};

export default rehypeBudoux;
