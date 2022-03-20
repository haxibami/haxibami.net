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
  return (
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
  );
};

export default NextImage;
