import { getPlaiceholder } from "plaiceholder";
import { visit } from "unist-util-visit";

import type { Element } from "hast";
import type { Node } from "unist";
import type { VFileCompatible } from "vfile";

export default function rehypeImageOpt() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (tree: Node, _file: VFileCompatible) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "img" &&
        node.properties &&
        node.properties.src &&
        typeof node.properties.src === "string"
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const src = node.properties.src;

        promises.push(async () => {
          if (node.properties) {
            const blur = await getPlaiceholder(src);
            node.properties.src = blur.img.src;
            node.properties.width = blur.img.width;
            node.properties.height = blur.img.height;
            node.properties.aspectRatio = `${blur.img.width} / ${blur.img.height}`;
            node.properties.blurDataURL = blur.base64;
          }
        });
      }
    });
    await Promise.all(promises.map((t) => t()));
  };
}
