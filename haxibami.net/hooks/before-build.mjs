import articleIndexer from "./scripts/indexer.mjs";
import genRssFeed from "./scripts/feed.mjs";

let promises = [articleIndexer(), genRssFeed()];

(async () => {
  await Promise.all(promises);
})();
