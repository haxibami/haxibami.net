import sitemap from "./scripts/sitemap.mjs";

let promises = [sitemap()];

(async () => {
  await Promise.all(promises);
})();
