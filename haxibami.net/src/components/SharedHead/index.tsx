import { SITEDATA, HOST } from "lib/constant";

import type { PageMetaData } from "lib/interface";

export default function SharedHead(props: PageMetaData) {
  return (
    <>
      <meta name="viewport" content="width=device-width" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={SITEDATA.blog.title}
        href={`https://${HOST}/rss/feed.xml`}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title={SITEDATA.blog.title}
        href={`https://${HOST}/rss/atom.xml`}
      />
      <link
        rel="alternate"
        type="application/json"
        title={SITEDATA.blog.title}
        href={`https://${HOST}/rss/feed.json`}
      />
      <title>{props.title}</title>
      <meta name="description" content={props.description} lang="ja" />
      <meta name="twitter:site" content="@haxibami" />
      <meta name="twitter:creator" content="@haxibami" />
      <meta name="twitter:image" content={props.ogImageUrl} />
      <meta name="twitter:card" content={props.twcardtype} />
      <meta
        property="og:url"
        content={`https://haxibami.net/${props.pageRelPath}`}
      />
      <meta property="og:type" content={props.pagetype} />
      <meta property="og:title" content={`${props.title}`} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={props.sitename} />
      <meta property="og:image" content={props.ogImageUrl} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
