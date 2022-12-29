import LinkWidget from "components/LinkWidget";
import MyLink from "components/MyLink";
import NextImage from "components/NextImage";

import type { LinkWidgetProps } from "components/LinkWidget";
import type { MyLinkProps } from "components/MyLink";
import type { NextImageProps } from "components/NextImage";
import type { MDXComponents } from "mdx/types";

type ProvidedComponents = MDXComponents & {
  a?: typeof MyLink;
  img?: typeof NextImage;
  extlink?: typeof LinkWidget;
};

const components = {
  a: (props: MyLinkProps) => <MyLink {...props} />,
  img: (props: NextImageProps) => <NextImage {...props} />,
  extlink: (props: LinkWidgetProps) => <LinkWidget {...props} />,
} as ProvidedComponents;

export default components;
