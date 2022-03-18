import React from "react";
import Image from "next/image";
import Styles from "./style.module.scss";
import Link from "next/link";

export type NextImageProps = {
  src: string;
  alt?: string;
};

const NextImage: React.FC<NextImageProps> = ({ src, alt }) => (
  <div className={Styles.ImgBox}>
    <Image
      className={Styles.Img}
      src={src}
      alt={alt || src}
      layout="fill"
      objectFit="contain"
    />
  </div>
);

export default NextImage;
