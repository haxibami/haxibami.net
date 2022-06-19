// HTML parser on "Client" side. Never include backend code (including remark).

import React from "react";

import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";

import LinkWidget from "components/LinkWidget";
import MyLink from "components/MyLink";
import NextImage from "components/NextImage";

import type { LinkWidgetProps } from "components/LinkWidget";
import type { MyLinkProps } from "components/MyLink";
import type { NextImageProps } from "components/NextImage";
import type { Options as RehypeReactOptions } from "rehype-react";



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
