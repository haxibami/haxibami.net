import fetchSiteMetadata from "fetch-site-metadata";

import type { Metadata } from "fetch-site-metadata";

const metadataCache = new Map<string, Metadata>();

export async function getMetadata(url: string) {
  const cachedMetadata = metadataCache.get(url);
  if (cachedMetadata) {
    return cachedMetadata;
  }
  return fetchSiteMetadata(url, {
    suppressAdditionalRequest: true,
  })
    .then((metadata) => {
      metadataCache.set(url, metadata);
      return metadata;
    })
    .catch(() => ({
      title: "Not Found",
      description: "Page not found",
      image: null,
    }));
}
