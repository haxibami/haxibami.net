export const SITEDATA = {
  blog: {
    title: "神話募集中",
    description: "祈り・技術・加速",
  },
  grad_essay: {
    title: "卒業文集",
    description: "記憶",
  },
};

export const HOST = "www.haxibami.net";

export const RSS_URL = "https://www.haxibami.net/rss/feed.xml";

export const APIHOST = {
  production: "https://www.haxibami.net",
  development: "http://localhost:3000",
  test: "https://www.haxibami.net",
}[process.env.NODE_ENV];

export const COUNT_PER_PAGE = 7;
