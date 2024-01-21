import { visit } from "unist-util-visit";

import type { Root } from "hast";
import type { Plugin } from "unified";

// add data-pagefind-ignore to all code blocks so they are ignored by pagefind
const rehypePagefind: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "code") {
        node.properties = {
          ...node.properties,
          "data-pagefind-ignore": true,
        };
      }
    });
  };
};

export default rehypePagefind;
