import type { Plugin, Transformer } from "unified";
import type { Node, Parent } from "unist";
import type { VFileCompatible } from "vfile";
import { visit } from "unist-util-visit";
import type { Paragraph, Link, Literal } from "mdast";
import { isParent, isLink, isParagraph } from "./mdast-util-node-is";
import type { H } from "mdast-util-to-hast";
import getMetadata from "metadata-scraper";

interface ExtLink extends Literal {
  type: "extlink";
  url: string;
  meta: LinkWidgetMeta;
}

interface LinkWidgetMeta {
  url: string;
  title: string;
  description: string;
  image: string;
  icon: string;
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
  if (!(isLink(singleChild) && singleChild.children[0].type == "text")) {
    return false;
  }

  return true;
}

function fetchMeta(url: string) {
  const metas = getMetadata(url).then((data) => {
    const metaData: LinkWidgetMeta = {
      url: url,
      title: data.title ?? "",
      description: data.description ?? "",
      image: data.image ?? "",
      icon: data.icon ?? "",
    };
    return metaData;
  });
  return metas;
}

export const remarkLinkWidget: Plugin = function extLinkTrans(): Transformer {
  return async (tree: Node, _file: VFileCompatible) => {
    const promises: any[] = [];
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
          url: child.url,
          meta: data,
        } as ExtLink;
      });
    }
  };
};

export function extLinkHandler(_h: H, node: ExtLink) {
  return {
    type: "element",
    tagName: "extlink",
    children: [{ type: "text", value: JSON.stringify(node.meta) }],
  };
}
