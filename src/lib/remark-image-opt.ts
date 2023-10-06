import fs from "fs/promises";
import path from "path";

import { getPlaiceholder } from "plaiceholder";
import { visit } from "unist-util-visit";

import type { Image } from "mdast";
import type { Transformer } from "unified";
import type { Node } from "unist";

const rehypeImageOpt = function imageOpt(): Transformer {
  return async (tree: Node) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, "image", (node: Image) => {
      const src = node.url;

      const getImage = async (src: string) => {
        if (src.includes("assets")) {
          return {
            img: {
              src,
              height: 1080,
              width: 1920,
              orientation: 0,
              format: undefined,
            },
            base64: "",
          };
        }
        const buffer = !src.startsWith("http")
          ? await fs.readFile(path.join("./public", src))
          : await fetch(src).then(async (res) =>
              Buffer.from(await res.arrayBuffer()),
            );

        const {
          metadata: { height, width, orientation, format },
          ...plaiceholder
        } = await getPlaiceholder(buffer);

        return {
          ...plaiceholder,
          img: { src, height, width, orientation, format },
        };
      };

      promises.push(async () => {
        const { img, base64 } = await getImage(src);
        node.data = {
          hProperties: {
            src: src,
            width: img.width,
            height: img.height,
            orientation: img.orientation,
            format: img.format,
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
