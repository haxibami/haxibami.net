import * as path from "path";
import { fileURLToPath } from "url";

import analyze from "@next/bundle-analyzer";

const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  //   experimental: {
  //     appDir: true,
  //   },
  swcMinify: true,
  sassOptions: {
    includePaths: [
      path.join(path.dirname(fileURLToPath(import.meta.url)), "styles"),
    ],
  },
  images: {
    domains: ["asciinema.org", "raw.githubusercontent.com"],
  },
};

export default withBundleAnalyzer(nextConfig);
