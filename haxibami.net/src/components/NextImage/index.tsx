
import React from "react";

import Image from "next/image";
import Link from "next/link";


import Styles from "./style.module.scss";

export type NextImageProps = {
  src: string;
  alt?: string;
};

const NextImage: React.FC<NextImageProps> = (props) => {
  const { src, alt } = props;
  return alt !== "asciicast" ? (
    <figure className={Styles.Figure}>
      <div className={Styles.ImgBox}>
        <Link href={src} scroll={false}>
          <a>
            <Image
              className={Styles.Img}
              src={src}
              alt={alt || src}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <figcaption>{alt}</figcaption>
    </figure>
  ) : (
    <div className={Styles.ImgBox}>
      <Image
        className={Styles.Img}
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default NextImage;
