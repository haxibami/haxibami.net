import genSitemap from "./scripts/sitemap.mjs";

const promises = [genSitemap()];

(async () => {
  await Promise.all(promises);
})();
