import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";
import { budouxParser } from "./budoux";

import type { Element, ElementContent, Root } from "hast";
import type { Plugin } from "unified";

const targetTags = ["p", "li"];

function isElement(node: Element | ElementContent): node is Element {
  return node.type === "element";
}

function isTargetNode(node: Element | ElementContent) {
  return isElement(node) ? targetTags.includes(node.tagName) : false;
}

const rehypeBudoux: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        typeof index !== "number" ||
        !isTargetNode(node) ||
        node.children.some(isTargetNode)
      )
        return;
      const newNode = fromHtml(budouxParser.translateHTMLString(toHtml(node)), {
        fragment: true,
      }).children[0];
      newNode && parent?.children.splice(index, 1, newNode);
    });
  };
};

export default rehypeBudoux;
