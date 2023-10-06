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

// type of post
export const PostType = {
  Blog: "blog",
  Grad_Essay: "grad_essay",
} as const;

export type PostType = (typeof PostType)[keyof typeof PostType];

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
