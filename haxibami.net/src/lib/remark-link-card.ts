import fetchSiteMetadata from "fetch-site-metadata";
import { visit } from "unist-util-visit";

import { isParent, isLink, isParagraph } from "./mdast-util-node-is";

import type { Link, Resource } from "mdast";
import type { H } from "mdast-util-to-hast";
import type { Plugin, Transformer } from "unified";
import type { Node, Parent } from "unist";

interface LinkCard extends Parent, Resource {
  type: "linkCard";
  meta: {
    url: string;
    title: string;
    description: string;
    og: string | undefined;
    icon: string | undefined;
  };
}

function isLinkCard(node: Node): node is LinkCard {
  if (!isParagraph(node)) {
    return false;
  }

  if (node.children.length !== 1) {
    return false;
  }

  const singleChild = node.children[0];

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
      og: data.image?.src?.startsWith("https") ? data.image?.src : undefined,
      icon: data.icon?.startsWith("https") ? data.icon : undefined,
    };
    return metaData;
  });
  return metas;
}

export const remarkLinkCard: Plugin = function linkCardTrans(): Transformer {
  return async (tree: Node) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, isLinkCard, visitor);
    await Promise.allSettled(promises.map((t) => t()));

    function visitor(
      node: Node,
      index: number | undefined,
      parent: Parent | undefined,
    ) {
      if (!isParagraph(node)) {
        return;
      }

      if (!isParent(parent)) {
        return;
      }

      if (parent.type === "listItem") {
        return;
      }

      const child = node.children[0] as Link;

      promises.push(async () => {
        const data = await fetchMeta(child.url);
        parent.children[index ?? 0] = {
          type: "linkCard",
          meta: data,
        } as LinkCard;
      });
    }
  };
};

export function linkCardHandler(_h: H, node: LinkCard) {
  return {
    type: "element" as const,
    tagName: "linkcard",
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
