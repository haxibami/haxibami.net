import fs from "fs/promises";
import path from "path";

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

      const getImage = async (src: string) => {
        const buffer = await fs.readFile(path.join("./public", src));

        const {
          metadata: { height, width },
          ...plaiceholder
        } = await getPlaiceholder(buffer);

        return {
          ...plaiceholder,
          img: { src, height, width },
        };
      };

      promises.push(async () => {
        const { img, base64 } = await getImage(src);
        node.data = {
          hProperties: {
            src: src,
            width: img.width,
            height: img.height,
            aspectRatio: `${img.width} / ${img.height}`,
            blurDataURL: base64,
          },
        };
      });
    });
    await Promise.allSettled(promises.map((t) => t()));
  };
};

export default rehypeImageOpt;
