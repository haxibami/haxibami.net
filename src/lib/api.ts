import { basename } from "path";

import fetchSiteMetadata from "fetch-site-metadata";
import sharp from "sharp";

import type { Metadata } from "fetch-site-metadata";

const siteMetadataCache = new Map<string, Metadata>();

const siteImgCache = new Map<string, string | undefined>();

const getSiteMetadata = async (url: string) => {
  const cached = siteMetadataCache.get(url);
  if (cached) {
    return cached;
  } else {
    const { description, image, title } = await fetchSiteMetadata(url, {
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
const getSiteImg = async (
  src: string,
  useOptimize: boolean,
  transform?: { width: number; height?: number },
) => {
  const cached = siteImgCache.get(src);
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
        .toFormat("webp")
        .toBuffer();
    }
    const base64 = img ? Buffer.from(img).toString("base64") : undefined;
    siteImgCache.set(src, base64);
    return base64;
  }
};

/**
 * @param href - url of the link
 * */
export const getLinkcard = async (href: string) => {
  const { description, image, title } = await getSiteMetadata(href);
  const ogImg = image?.src
    ? await getSiteImg(image.src, true, { width: 400 })
    : undefined;
  const ogData = ogImg ? `data:image/webp;base64,${ogImg}` : undefined;
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
