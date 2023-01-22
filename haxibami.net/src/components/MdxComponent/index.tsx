import LinkCard from "components/LinkCard";
import MyLink from "components/MyLink";
import NextImage from "components/NextImage";

import type { LinkCardProps } from "components/LinkCard";
import type { MyLinkProps } from "components/MyLink";
import type { NextImageProps } from "components/NextImage";
import type { MDXComponents } from "mdx/types";

type ProvidedComponents = MDXComponents & {
  a?: typeof MyLink;
  img?: typeof NextImage;
  extlink?: typeof LinkCard;
};

const components = {
  a: (props: MyLinkProps) => <MyLink {...props} />,
  img: (props: NextImageProps) => <NextImage {...props} />,
  extlink: (props: LinkCardProps) => <LinkCard {...props} />,
} as ProvidedComponents;

export default components;
