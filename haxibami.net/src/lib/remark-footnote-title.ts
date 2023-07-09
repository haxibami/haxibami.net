import { visit } from "unist-util-visit";

import type {
  FootnoteDefinition,
  FootnoteReference,
  Text,
  InlineCode,
} from "mdast";
import type { Plugin, Transformer } from "unified";
import type { Node } from "unist";

function isTextOrInlineCode(node: Node): node is Text | InlineCode {
  return node.type === "text" || node.type === "inlineCode";
}

const remarkFootnoteTitle: Plugin = function addFootnoteTitle(): Transformer {
  return (tree: Node) => {
    const footnotes = {} as Record<string, string>;
    visit(tree, "footnoteDefinition", (n: FootnoteDefinition) => {
      let content = "";
      visit(n, isTextOrInlineCode, (t: Text | InlineCode) => {
        content += t.value;
      });
      footnotes[n.identifier] = content;
    });
    visit(tree, "footnoteReference", (n: FootnoteReference) => {
      if (!footnotes[n.identifier]) {
        return;
      }
      n.data = { hProperties: { title: footnotes[n.identifier] } };
    });
  };
};

export default remarkFootnoteTitle;
