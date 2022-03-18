import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import type { Options as RehypeReactOptions } from "rehype-react";
import React from "react";
import MyLink from "components/MyLink";
import LinkWidget from "components/LinkWidget";
import type { LinkWidgetProps } from "components/LinkWidget";
import NextImage from "components/NextImage";
import type { NextImageProps } from "components/NextImage";

// Convert HTML to React Component
export const HtmlToReact = (html: string) => {
  const result = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        a: ({ children, href }) => {
          href ??= "/404";
          return MyLink({ children, href });
        },
        img: ({ src, alt }: NextImageProps) => {
          return NextImage({ src, alt });
        },
        extlink: ({ children }: LinkWidgetProps) => {
          return LinkWidget({ children });
        },
      },
    } as RehypeReactOptions)
    .processSync(html);
  return result.result;
};
