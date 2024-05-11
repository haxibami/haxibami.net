import { visit } from "unist-util-visit";

import type { Root } from "hast";
import type { Plugin } from "unified";

const rehypeMarkImageParent: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (!Object.hasOwn(node.properties, "dataImageParent")) {
        return;
      }

      node.tagName = "figure";
    });
  };
};

export default rehypeMarkImageParent;
