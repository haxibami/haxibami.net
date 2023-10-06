import { basename } from "path";

import fetchSiteMetadata from "fetch-site-metadata";
import sharp from "sharp";

import type { Metadata } from "fetch-site-metadata";

// async function loadSharp() {
//   // eslint-disable-next-line @typescript-eslint/consistent-type-imports
//   let sharpImport: typeof import("sharp");
//   try {
//     sharpImport = (await import("sharp")).default;
//   } catch (e) {
//     console.error("Failed to load sharp", e);
//   }
//
//   // @ts-expect-error TS2454
//   return sharpImport;
// }
//
// export const sharp = await loadSharp();

const cache = new Map<string, Metadata>();

const imgCache = new Map<string, string | undefined>();

const getCardinfo = async (href: string) => {
  const cached = cache.get(href);
  if (cached) {
    return cached;
  } else {
    const { description, image, title } = await fetchSiteMetadata(href, {
      suppressAdditionalRequest: true,
    }).catch(() => ({
      description: "Page not found",
      image: {
        src: undefined,
      },
      title: "Not Found",
    }));
    return { description, image, title };
  }
};

// return base64
const getImg = async (
  src: string,
  useOptimize: boolean,
  transform?: { width: number; height: number },
) => {
  const cached = imgCache.get(src);
  if (cached) {
    return cached;
  } else {
    let img: Buffer | ArrayBuffer | undefined;
    img = await fetch(src).then((res) =>
      res.ok ? res.arrayBuffer() : undefined,
    );
    if (img && useOptimize) {
      img = await sharp(img)
        .resize(transform?.width, transform?.height)
        .webp()
        .toBuffer();
    }
    const base64 = img ? Buffer.from(img).toString("base64") : undefined;
    imgCache.set(src, base64);
    return base64;
  }
};

/**
 * @param href - url of the link
 * */
export const getCard = async (href: string) => {
  const { description, image, title } = await getCardinfo(href);
  const ogImg = image?.src
    ? await getImg(image.src, true, { width: 400, height: 210 })
    : undefined;
  const ogData = ogImg ? `data:;base64,${ogImg}` : undefined;
  return {
    description,
    image: {
      src: ogData,
    },
    title,
  };
};

interface ImageImportResults {
  [key: string]: {
    default: ImageMetadata;
  };
}

let publicImgsCache = new Map<string, ImageMetadata>();

const importPublicImgs = async () => {
  if (publicImgsCache.size > 0) {
    return publicImgsCache;
  } else {
    const imageImports: ImageImportResults = import.meta.glob(
      "../assets/image/*",
      {
        eager: true,
      },
    );
    const imgs = new Map<string, ImageMetadata>(
      Object.entries(imageImports).map(([key, value]) => [
        basename(key),
        value.default,
      ]),
    );
    publicImgsCache = imgs;
    return imgs;
  }
};

/**
 * @param src - image path, absolute to "/src/assets/"
 * @returns ImageMetadata
 * */
export const getPublicImg = async (src: string) => {
  const name = basename(src);
  const imgs = await importPublicImgs();
  return imgs.get(name);
};
