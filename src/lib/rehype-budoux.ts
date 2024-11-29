import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { SKIP, visit } from "unist-util-visit";
import { budouxProcess } from "./budoux";

import type { Element, ElementContent, Root } from "hast";
import type { Plugin } from "unified";

const defaultTargetTagNames = ["p", "li", "h1", "h2", "h3", "h4", "h5", "h6"];

function isElement(node: Element | ElementContent): node is Element {
  return node.type === "element";
}

function isTargetNode(
  node: Element | ElementContent,
  targetTagNames: string[],
): node is Element {
  return isElement(node) ? targetTagNames.includes(node.tagName) : false;
}

interface RehypeBudouxOptions {
  /**
   * The list of tag names to be processed by Budoux.
   * @default ["p", "li", "h1", "h2", "h3", "h4", "h5", "h6"]
   */
  targetTagNames?: string[];
}

const rehypeBudoux: Plugin<[RehypeBudouxOptions?], Root> = ({
  targetTagNames = defaultTargetTagNames,
} = {}) => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (typeof index !== "number" || !isTargetNode(node, targetTagNames)) {
        return;
      }
      const newNode = fromHtml(budouxProcess(toHtml(node)), {
        fragment: true,
      }).children[0];
      newNode && parent?.children.splice(index, 1, newNode);
      return SKIP;
    });
  };
};

export default rehypeBudoux;
