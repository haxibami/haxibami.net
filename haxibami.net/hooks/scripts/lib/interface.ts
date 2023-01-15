import type { MDXRemoteSerializeResult } from "next-mdx-remote";

// type of post item

export interface PostMeta {
  slug: string;
  title: string;
  date?: string;
  description: string;
  tags?: string[];
}

export interface PostData {
  preview: string;
  data: PostMeta | undefined;
}

export interface DocItem {
  slug: string;
  title: string;
  content: string;
}

// type of post
export const PostType = {
  Blog: "blog",
  Grad_Essay: "grad_essay",
} as const;

export type PostType = (typeof PostType)[keyof typeof PostType];

// site info stored in src/share/meta.yml
export interface SiteData {
  siteinfo: Record<string, Record<string, string>>;
}

// page type in twitter card: article / website
const PageType = {
  Article: "article",
  Website: "website",
} as const;

type PageType = (typeof PageType)[keyof typeof PageType];

// twitter card: summary / summary_large_image
const TwCardType = {
  Summary: "summary",
  Summary_Large_Image: "summary_large_image",
} as const;

type TwCardType = (typeof TwCardType)[keyof typeof TwCardType];

export interface PageMetaData {
  title: string;
  sitename: string;
  description: string;
  ogImageUrl: string;
  pageRelPath: string;
  pagetype: PageType;
  twcardtype: TwCardType;
}

// item in blog menu tab
export interface MenuTab {
  name: string;
  link: string;
  focus: boolean;
}

export interface MarkdownRenderingResult {
  html: MDXRemoteSerializeResult;
}
