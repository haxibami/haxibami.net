import type { MetadataRoute } from "next";

import { HOST } from "lib/constant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/grad_essay/",
    },
    host: `https://${HOST}`,
    sitemap: `https://${HOST}/sitemap.xml`,
  };
}
