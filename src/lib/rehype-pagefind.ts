import { visit } from "unist-util-visit";

import type { Element, Root } from "hast";

function shouldNotIndexed(node: Element) {
  if (node.tagName === "a") {
    return Object.hasOwn(node.properties, "dataLinkcard");
  }
  return false;
}

const rehypePagefind = () => {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (shouldNotIndexed(node)) {
        node.properties = {
          ...node.properties,
          dataPagefindIgnore: true,
        };
      }
    });
  };
};

export default rehypePagefind;
