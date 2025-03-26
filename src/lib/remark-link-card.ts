import { SKIP, visit } from "unist-util-visit";

import { isBareExternalLink } from "./mdast-util-node-is";

import type { Root } from "mdast";

const remarkLinkcard = () => {
  return (tree: Root) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (
        !parent ||
        typeof index !== "number" ||
        node.children.length !== 1 ||
        !isBareExternalLink(node.children[0])
      ) {
        return;
      }

      node.children[0].data = {
        ...node.children[0].data,
        hProperties: {
          ...node.children[0].data?.hProperties,
          dataLinkcard: true,
        },
      };

      parent.children.splice(index, 1, node.children[0]);
      return [SKIP, index];
    });
  };
};

export default remarkLinkcard;
