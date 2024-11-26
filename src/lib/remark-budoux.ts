import { visit } from "unist-util-visit";

import type { ListItem, Paragraph, Root } from "mdast";
import type { Plugin } from "unified";
import type { Node } from "unist";

function shouldMarked(node: Node): node is Paragraph | ListItem {
  return node.type === "paragraph" || node.type === "listItem";
}

const remarkBudoux: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, shouldMarked, (node: Paragraph | ListItem) => {
      if (node.children.some(shouldMarked)) return;
      node.data = {
        ...node.data,
        hProperties: {
          dataBudoux: "true",
        },
      };
    });
  };
};

export default remarkBudoux;
