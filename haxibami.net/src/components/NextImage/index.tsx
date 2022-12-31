import React from "react";

import Image from "next/image";
import Link from "next/link";

import Styles from "./style.module.scss";

export type NextImageProps = {
  src: string;
  alt?: string;
  // width: number;
  // height: number;
  aspectRatio: string;
  blurDataURL: string;
};

const NextImage: React.FC<NextImageProps> = (props) => {
  const { src, alt, aspectRatio, blurDataURL } = props;
  return alt !== "asciicast" ? (
    <figure className={Styles.Figure}>
      <Link href={src} scroll={false}>
        <div className={Styles.ImgBox} style={{ aspectRatio: aspectRatio }}>
          <Image
            className={Styles.Img}
            src={src}
            alt={alt || src}
            fill={true}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </Link>
      <figcaption>{alt}</figcaption>
    </figure>
  ) : (
    <div className={Styles.ImgBox}>
      <Image className={Styles.Img} src={src} alt={alt} fill={true} />
    </div>
  );
};

export default NextImage;
