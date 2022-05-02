// HTML parser on "Client" side. Never include backend code (including remark).

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import type { Options as RehypeReactOptions } from "rehype-react";
import React from "react";
import MyLink from "components/MyLink";
import type { MyLinkProps } from "components/MyLink";
import LinkWidget from "components/LinkWidget";
import type { LinkWidgetProps } from "components/LinkWidget";
import NextImage from "components/NextImage";
import type { NextImageProps } from "components/NextImage";

// Convert HTML to React Component
const RehypeReact = (html: string) => {
  const result = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        a: (props: MyLinkProps) => {
          return MyLink(props);
        },
        img: (props: NextImageProps) => {
          return NextImage(props);
        },
        extlink: (props: LinkWidgetProps) => {
          return LinkWidget(props);
        },
      },
    } as RehypeReactOptions)
    .processSync(html);
  return result.result;
};

export default RehypeReact;
