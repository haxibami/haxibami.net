import articleIndexer from "./scripts/indexer.mjs";
import genFeed from "./scripts/feed.mjs";

let promises = [articleIndexer(), genFeed()];

(async () => {
  await Promise.all(promises);
})();
