import { getPlaiceholder } from "plaiceholder";
import { visit } from "unist-util-visit";

import type { Image } from "mdast";
import type { Plugin, Transformer } from "unified";
import type { Node } from "unist";

const rehypeImageOpt: Plugin<[void]> = function imageOpt(): Transformer {
  return async (tree: Node) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, "image", (node: Image) => {
      const src = node.url;

      promises.push(async () => {
        const blur = await getPlaiceholder(src);
        node.data = {
          hProperties: {
            src: blur.img.src,
            width: blur.img.width,
            height: blur.img.height,
            aspectRatio: `${blur.img.width} / ${blur.img.height}`,
            blurDataURL: blur.base64,
          },
        };
      });
    });
    await Promise.all(promises.map((t) => t()));
  };
};

export default rehypeImageOpt;
