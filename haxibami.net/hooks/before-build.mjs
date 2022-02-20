import articleIndexer from "./scripts/indexer.mjs";

let promises = [articleIndexer()];

(() => {
  Promise.all(promises).then(() => {
    process.exit();
  });
})();
