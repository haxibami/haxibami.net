import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import type { ImageMetadata } from "astro";

import fetchSiteMetadata from "fetch-site-metadata";
import sharp from "sharp";

import type { Metadata } from "fetch-site-metadata";

const siteMetadataMap = new Map<string, Metadata>();
fs.mkdirSync(path.join(process.cwd(), "./public/.cache/embed"), {
  recursive: true,
});

const siteImgCache = fs
  .readdirSync(path.join(process.cwd(), "./public/.cache/embed"))
  .filter((img) => img.endsWith(".avif"));

const siteImgMap = new Map<string, string | undefined>(
  siteImgCache.map((img) => [
    path.basename(img, ".avif"),
    `/.cache/embed/${img}`,
  ]),
);

const getSiteMetadata = async (url: string) => {
  const cached = siteMetadataMap.get(url);
  if (cached) {
    return cached;
  }
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
};

// fetch image, resize to 400px, convert to avif, save to /public/.cache/embed,
// copy to /dist/.cache/embed, and return /.cache/embed/<hash>.<ext>
const getSiteImg = async (src: string) => {
  const srcHash = crypto.createHash("sha256").update(src).digest("hex");
  const cached = siteImgMap.get(srcHash);
  if (cached) {
    return cached;
  }
  const img = await fetch(src).then((res) => res.arrayBuffer());
  if (!img) {
    return undefined;
  }
  const imgFile = `/.cache/embed/${srcHash}.avif`;
  const imgPath = path.join(process.cwd(), `./public${imgFile}`);
  await sharp(Buffer.from(img))
    .resize(400)
    .toFormat("avif", {
      quality: 30,
    })
    .toFile(imgPath);
  fs.mkdirSync(path.join(process.cwd(), "./dist/.cache/embed"), {
    recursive: true,
  });
  fs.copyFileSync(imgPath, path.join(process.cwd(), `./dist${imgFile}`));
  siteImgMap.set(srcHash, imgFile);
  return imgFile;
};

/**
 * @param href - url of the link
 * */
export const getLinkcard = async (href: string) => {
  const { description, image, title } = await getSiteMetadata(href);
  const ogImg = image?.src ? await getSiteImg(image.src) : undefined;
  return {
    description,
    image: {
      src: ogImg,
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
  }
  const imageImports: ImageImportResults = import.meta.glob(
    "../assets/image/*",
    {
      eager: true,
    },
  );
  const imgs = new Map<string, ImageMetadata>(
    Object.entries(imageImports).map(([key, value]) => [
      path.basename(key),
      value.default,
    ]),
  );
  publicImgsCache = imgs;
  return imgs;
};

/**
 * @param src - image path, absolute to "/src/assets/"
 * @returns ImageMetadata
 * */
export const getPublicImg = async (src: string) => {
  const name = path.basename(src);
  const imgs = await importPublicImgs();
  return imgs.get(name);
};
