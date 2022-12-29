import genFeed from "./scripts/feed.mjs";
import postsIndexer from "./scripts/indexer.mjs";
// import cachePostData from "./scripts/postdata.mjs";

const promises = [genFeed(), postsIndexer()];

(async () => {
  await Promise.all(promises);
})();
