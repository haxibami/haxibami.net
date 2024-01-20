import { visit } from "unist-util-visit";

import {
  isMdxJsxFlowElementHast,
  isMdxJsxAttribute,
} from "./hast-util-node-is";

import type { Root } from "hast";
import type { Plugin } from "unified";

const rehypeMarkImageParent: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, isMdxJsxFlowElementHast, (node, index, parent) => {
      if (
        !parent ||
        parent?.type !== "element" ||
        parent.tagName !== "p" ||
        node.name !== "astro-image" ||
        index !== 0
      ) {
        return;
      }

      parent.tagName = "figure";
      parent.properties = {
        ...parent.properties,
        "data-image-parent": true,
        "data-image-alt": node.attributes
          .find((attr) => isMdxJsxAttribute(attr) && attr.name === "alt")
          ?.value?.toString(),
      };
    });
  };
};

export default rehypeMarkImageParent;
