import type { Plugin, Transformer } from "unified";
import type { Node, Parent } from "unist";
import type { VFileCompatible } from "vfile";
import { visit } from "unist-util-visit";
import type { Paragraph, Link, Literal } from "mdast";
import { isParent, isLink, isParagraph } from "./mdast-util-node-is";
import type { H } from "mdast-util-to-hast";

interface ExtLink extends Literal {
  type: "extlink";
  url: string;
}

const URL_PREFIX = "https://";

function isExtLink(node: unknown): node is Paragraph {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;

  if (children.length != 1) {
    return false;
  }

  const singleChild = children[0];
  if (!(isLink(singleChild) && singleChild.url.startsWith(URL_PREFIX))) {
    return false;
  }

  return true;
}

function visitor(node: Paragraph, index: number, parent: Parent | undefined) {
  if (!isParent(parent)) {
    return;
  }

  const child = node.children[0] as Link;

  parent.children[index] = {
    type: "extlink",
    url: child.url,
  } as ExtLink;
}

export const remarkLinkWidget: Plugin = function extLinkTrans(): Transformer {
  return (tree: Node, _file: VFileCompatible) => {
    visit(tree, isExtLink, visitor);
  };
};

export function extLinkHandler(_h: H, node: ExtLink) {
  return {
    type: "element",
    tagName: "extlink",
    properties: {
      className: ["extlink"],
    },
    children: [{ type: "text", value: node.url }],
  };
}
