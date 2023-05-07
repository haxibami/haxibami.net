import React from "react";

import Image from "next/image";
import Link from "next/link";

export type NextImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  blurDataURL?: string;
};

const NextImage: React.FC<NextImageProps> = (props) => {
  const { src, alt, aspectRatio, blurDataURL } = props;
  return alt !== "asciicast" ? (
    <figure className="my-8 flex flex-col gap-4">
      <Link href={src} scroll={false}>
        <div
          className="relative mx-auto flex"
          style={{ aspectRatio: aspectRatio, maxHeight: "50vh" }}
        >
          <Image
            className="object-contain"
            src={src}
            alt={alt || src}
            fill={true}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </Link>
      <figcaption className="text-center text-[color:var(--secondary)]">
        {alt}
      </figcaption>
    </figure>
  ) : (
    <div className="relative flex">
      <Image className="object-contain" src={src} alt={alt} fill={true} />
    </div>
  );
};

export default NextImage;
