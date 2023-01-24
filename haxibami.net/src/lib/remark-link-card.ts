import fetchSiteMetadata from "fetch-site-metadata";
import { visit } from "unist-util-visit";

import { isParent, isLink, isParagraph } from "./mdast-util-node-is";

import type { Paragraph, Link, Literal } from "mdast";
import type { H } from "mdast-util-to-hast";
import type { Plugin, Transformer } from "unified";
import type { Node, Parent } from "unist";
import type { VFileCompatible } from "vfile";

interface ExtLink extends Literal {
  type: "extlink";
  meta: {
    url: string;
    title: string;
    description: string;
    og: string | undefined;
    icon: string | undefined;
  };
}

function isExtLink(node: unknown): node is Paragraph {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;

  if (children.length != 1) {
    return false;
  }

  const singleChild = children[0];
  if (
    !(
      isLink(singleChild) &&
      singleChild.children[0].type == "text" &&
      singleChild.url.startsWith("http")
    )
  ) {
    return false;
  }

  return true;
}

function fetchMeta(url: string) {
  const metas = fetchSiteMetadata(url).then((data) => {
    const metaData = {
      url: url,
      title: data.title ?? "(No title)",
      description: data.description ?? "",
      og: data.image?.src,
      icon: data.icon,
    };
    return metaData;
  });
  return metas;
}

export const remarkLinkCard: Plugin = function extLinkTrans(): Transformer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (tree: Node, _file: VFileCompatible) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, isExtLink, visitor);
    await Promise.all(promises.map((t) => t()));

    function visitor(
      node: Paragraph,
      index: number,
      parent: Parent | undefined
    ) {
      if (!isParent(parent)) {
        return;
      }

      if (parent.type === "listItem") {
        return;
      }

      const child = node.children[0] as Link;

      promises.push(async () => {
        const data = await fetchMeta(child.url);
        parent.children[index] = {
          type: "extlink",
          meta: data,
        } as ExtLink;
      });
    }
  };
};

export function extLinkHandler(_h: H, node: ExtLink) {
  return {
    type: "element" as const,
    tagName: "extlink",
    properties: {
      url: node.meta.url,
      title: node.meta.title,
      description: node.meta.description,
      og: node.meta.og,
      icon: node.meta.icon,
    },
    children: [],
  };
}
