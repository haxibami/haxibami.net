import type { MenuTab } from "./interface";

export const ogpHost = {
  production: "https://www.haxibami.net",
  development: "http://localhost:3000",
  test: "https://www.haxibami.net",
}[process.env.NODE_ENV];

export const COUNT_PER_PAGE = 5;

export const postMenuTabs: MenuTab[] = [
  {
    name: "Articles",
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
    name: "Articles",
    link: "",
    focus: false,
  },
  {
    name: "Tags",
    link: "tags",
    focus: true,
  },
];
