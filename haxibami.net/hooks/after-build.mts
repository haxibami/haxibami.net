import sitemap from "./scripts/sitemap.mjs";

const promises = [sitemap()];

(async () => {
  await Promise.all(promises);
})();
