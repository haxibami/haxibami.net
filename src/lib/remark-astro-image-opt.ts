import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";
import { visit } from "unist-util-visit";

import type { Image, Parent, Root } from "mdast";
import type { Plugin } from "unified";

interface RemarkAstroImageOptOptions {
  /**
   * The directory where the images are stored, relative to `src` directory.
   * @default "./assets/image"
   * */
  imgDir: string;
  /**
   * The size of the placeholder image.
   * @default 8
   * */
  size: number;
  /**
   * The format of the placeholder image.
   * @default "webp"
   * */
  blurFormat: keyof sharp.FormatEnum;
  /**
   * The widths of the placeholder image.
   * @default: [240, 540, 720] (+ original width)
   * */
  widths: number[];
  /**
   * The sizes of the placeholder image.
   * See {@link https://developer.mozilla.org/docs/Web/HTML/Element/img#sizes}
   * @default: "(max-width: 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px" (+, original width)
   * */
  sizes: string;
}

const remarkAstroImageOpt: Plugin<[RemarkAstroImageOptOptions?], Root> = (
  {
    imgDir = "./assets/image",
    size = 8,
    blurFormat = "webp",
    widths = [240, 540, 720],
    sizes = "(max-width: 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px",
  } = {} as RemarkAstroImageOptOptions,
) => {
  return async (tree) => {
    const imgAndParentPairs: { node: Image; parent: Parent }[] = [];

    visit(tree, "image", (node, index, parent) => {
      if (
        parent?.type !== "paragraph" ||
        index !== 0 ||
        node.url.startsWith("http")
      ) {
        return;
      }
      imgAndParentPairs.push({ node, parent });
    });

    await Promise.all(
      imgAndParentPairs.map(async ({ node, parent }) => {
        const basename = path.basename(node.url);
        const buffer = fs.readFileSync(
          path.join(process.cwd(), "./src", imgDir, basename),
        );

        const metadataPromise = sharp(buffer)
          .metadata()
          .then((data) => {
            if (!data.width || !data.height) {
              throw new Error(`Failed to get image metadata: ${node.url}`);
            }
            return {
              width: data.width,
              height: data.height,
              aspectRatio: `${data.width} / ${data.height}`,
            };
          });

        // thanks to plaiceholder
        const base64Promise = sharp(buffer)
          .resize(size, size, { fit: "inside" })
          .toFormat(blurFormat, { quality: 60 })
          .modulate({
            brightness: 1,
            saturation: 1.2,
          })
          .normalise()
          .toBuffer()
          .then(
            (data) =>
              `data:image/${blurFormat};base64,${data.toString("base64")}`,
          );

        const [{ width, aspectRatio }, base64] = await Promise.all([
          metadataPromise,
          base64Promise,
        ]);

        // data attributes for <img> (automatically passed to <Image> component)
        node.data = {
          ...node.data,
          hProperties: {
            ...node.data?.hProperties,
            widths: [...widths, width],
            sizes: `${sizes}, ${width}px`,
            format: "avif",
          },
        };

        // data attributes added to image's parent <p>, which will later be transformed to <figure>
        // in rehype-astro-image-figure
        parent.data = {
          ...parent.data,
          hProperties: {
            ...parent.data?.hProperties,
            dataImageParent: true,
            dataImageAlt: node.alt,
            dataImageAspectRatio: aspectRatio,
            dataImageBlurUrl: `url("${base64}")`,
          },
        };
      }),
    );
  };
};

export default remarkAstroImageOpt;
