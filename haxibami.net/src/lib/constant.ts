import type { MenuTab } from "./interface";

export const SITEDATA = {
  blog: {
    title: "神話募集中",
    description: "なまあたたかくておいしい",
  },
  grad_essay: {
    title: "卒業文集",
    description: "記憶",
  },
};

export const HOST = "www.haxibami.net";

export const FEEDLY_URL =
  "https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fwww.haxibami.net%2Frss%2Ffeed.xml";

export const APIHOST = {
  production: "https://www.haxibami.net",
  development: "http://localhost:3000",
  test: "https://www.haxibami.net",
}[process.env.NODE_ENV];

export const COUNT_PER_PAGE = 5;

export const postMenuTabs: MenuTab[] = [
  {
    name: "Posts",
    link: "",
    focus: true,
  },
  {
    name: "Tags",
    link: "tags",
    focus: false,
  },
];

export const tagsMenuTabs: MenuTab[] = [
  {
    name: "Posts",
    link: "",
    focus: false,
  },
  {
    name: "Tags",
    link: "tags",
    focus: true,
  },
];
