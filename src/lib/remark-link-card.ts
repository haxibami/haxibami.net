import { visit } from "unist-util-visit";

import { isParent, isBareLink } from "./mdast-util-node-is";

import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Parent } from "unist";

const remarkLinkcard: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, isBareLink, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) {
        return;
      }

      if (parent.type === "listItem") {
        return;
      }

      const child = node.children[0];

      if (!child.url.startsWith("http")) {
        return;
      }

      child.data = {
        ...child.data,
        hProperties: {
          ...child.data?.hProperties,
          dataLinkcard: true,
        },
      };
    });
  };
};

export default remarkLinkcard;
