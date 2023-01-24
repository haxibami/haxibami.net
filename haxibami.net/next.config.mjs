import * as path from "path";
import { fileURLToPath } from "url";

import analyze from "@next/bundle-analyzer";
import { withPlaiceholder } from "@plaiceholder/next";

const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      "playwright",
      "svgo",
      "plaiceholder",
      "@plaiceholder/next",
      "fetch-site-metadata",
    ],
    // scrollRestoration: true,
    appDir: true,
  },
  swcMinify: true,
  sassOptions: {
    includePaths: [
      path.join(path.dirname(fileURLToPath(import.meta.url)), "styles"),
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["asciinema.org", "raw.githubusercontent.com"],
  },
};

export default withBundleAnalyzer(withPlaiceholder(nextConfig));
