import { mkdir } from "node:fs/promises";
import path from "node:path";

import fetchSiteMetadata from "fetch-site-metadata";
import sharp from "sharp";

import type { Metadata } from "fetch-site-metadata";
import type { FormatEnum } from "sharp";

const embedPath = "/.cache/embed";
const format: keyof FormatEnum = "avif";

const publicDir = path.join(process.cwd(), "public", embedPath);
const distDir = path.join(process.cwd(), "dist", embedPath);
const metadataCache = new Map<string, Metadata>();

await mkdir(publicDir, {
  recursive: true,
});

const glob = new Bun.Glob(`*.${format}`);
const imageList = await Array.fromAsync(glob.scan(publicDir));

const imageCache = new Map<string, string | undefined>(
  imageList.map((image) => [image, `${embedPath}/${image}`]),
);

async function getMetadata(url: string) {
  const cachedMetadata = metadataCache.get(url);
  if (cachedMetadata) {
    return cachedMetadata;
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
}

async function getImage(src: string | undefined) {
  if (!src) {
    return undefined;
  }
  const fileName = `${Bun.hash(src)}.${format}`;
  const cachedImage = imageCache.get(fileName);
  if (cachedImage) {
    return cachedImage;
  }
  const image = await fetch(src, {
    cache: "force-cache",
  }).then((res) => res.arrayBuffer());
  if (!image) {
    return undefined;
  }
  const imagePath = `${embedPath}/${fileName}`;
  const publicPath = path.join(publicDir, `${fileName}`);
  await sharp(Buffer.from(image))
    .resize(400)
    .toFormat(format, {
      quality: 25,
    })
    .toFile(publicPath);
  await mkdir(distDir, {
    recursive: true,
  });
  Bun.write(path.join(distDir, `${fileName}`), Bun.file(publicPath));
  imageCache.set(fileName, imagePath);
  return imagePath;
}

/**
 * @param href - url of the link
 * */
export const getLinkcard = async (href: string) => {
  const { description, image: remoteImage, title } = await getMetadata(href);
  const embedImage = await getImage(remoteImage?.src);
  return {
    description,
    image: {
      src: embedImage,
    },
    title,
  };
};
