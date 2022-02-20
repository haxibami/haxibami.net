import articleIndexer from "./scripts/indexer.mjs";

let promises = [articleIndexer()];

(async () => {
  await Promise.all(promises);
})();
