import { visit } from "unist-util-visit";

import {
  isFootnoteDefinition,
  isFootnoteReference,
} from "./mdast-util-node-is";

import type { InlineCode, Root, Text } from "mdast";
import type { Plugin } from "unified";
import type { Node } from "unist";

function isTextOrInlineCode(node: Node): node is Text | InlineCode {
  return node.type === "text" || node.type === "inlineCode";
}

const remarkFootnoteTitle: Plugin<[], Root> = () => {
  return (tree) => {
    const footnotes = {} as Record<string, string>;
    visit(tree, isFootnoteDefinition, (n) => {
      let content = "";
      visit(n, isTextOrInlineCode, (t: Text | InlineCode) => {
        content += t.value;
      });
      footnotes[n.identifier] = content;
    });
    visit(tree, isFootnoteReference, (n) => {
      if (!footnotes[n.identifier]) {
        return;
      }
      n.data = {
        ...n.data,
        hProperties: {
          ...n.data?.hProperties,
          title: footnotes[n.identifier],
        },
      };
    });
  };
};

export default remarkFootnoteTitle;
