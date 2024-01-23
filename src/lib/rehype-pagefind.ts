import { visit } from "unist-util-visit";

import type { Root, Element } from "hast";
import type { Plugin } from "unified";

function shouldNotIndexed(node: Element) {
  return (
    // code block
    (node.tagName === "figure" &&
      Object.hasOwn(node.properties, "data-rehype-pretty-code-figure")) ||
    // link card
    (node.tagName === "a" && Object.hasOwn(node.properties, "dataLinkcard"))
  );
}

const rehypePagefind: Plugin<void[], Root> = () => {
  return (tree) => {
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
