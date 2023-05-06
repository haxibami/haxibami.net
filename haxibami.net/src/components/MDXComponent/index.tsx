import LinkCard from "components/LinkCard";
import NextImage from "components/NextImage";
import NextLink from "components/NextLink";

import type { LinkCardProps } from "components/LinkCard";
import type { NextImageProps } from "components/NextImage";
import type { NextLinkProps } from "components/NextLink";
import type { MDXComponents } from "mdx/types";

type ProvidedComponents = MDXComponents & {
  a?: typeof NextLink;
  img?: typeof NextImage;
  linkcard?: typeof LinkCard;
};

const replaceComponents = {
  a: (props: NextLinkProps) => <NextLink {...props} />,
  img: (props: NextImageProps) => <NextImage {...props} />,
  linkcard: (props: LinkCardProps) => <LinkCard {...props} />,
} as ProvidedComponents;

export default replaceComponents;
