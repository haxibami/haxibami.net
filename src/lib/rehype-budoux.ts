import { visit } from "unist-util-visit";
import { h } from "hastscript";
// import { toHtml } from "hast-util-to-html";
// import { fromHtml } from "hast-util-from-html";
// import { loadDefaultJapaneseParser } from "budoux";

import type { Element, Root } from "hast";
import type { Plugin } from "unified";

// const parser = loadDefaultJapaneseParser();

const targetTags = ["p", "li"];

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
    visit(tree, "element", (node) => {
      if (shouldTranslate(node)) {
        // Method 1: innerHTML
        node.children = [h("budoux-ja", node.children)];
        // Method 2: replace node
        // parent?.children.splice(index, 1, h("budoux-ja", [node]));
        // Method 3: replace node with completely parsed node
        // const newNode = fromHtml(
        //   parser
        //     .translateHTMLString(toHtml(node))
        //     .replace(/\u200b/g, "<wbr />"),
        //   {
        //     fragment: true,
        //   },
        // ).children[0];
        // newNode && parent?.children.splice(index, 1, newNode);
      }
    });
  };
};

export default rehypeBudoux;
