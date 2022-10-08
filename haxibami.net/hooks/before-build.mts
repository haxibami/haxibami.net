import genFeed from "./scripts/feed.mjs";
import articleIndexer from "./scripts/indexer.mjs";

const promises = [articleIndexer(), genFeed()];

(async () => {
  await Promise.all(promises);
})();
