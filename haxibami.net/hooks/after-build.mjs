import sitemap from "./scripts/sitemap.mjs";

let promises = [sitemap()];

(() => {
  Promise.all(promises).then(() => {
    process.exit();
  });
})();
