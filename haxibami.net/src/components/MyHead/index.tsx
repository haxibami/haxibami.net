import Head from "next/head";
import React from "react";
import { PageMetaProps } from "lib/interface";

const MyHead: React.VFC<PageMetaProps> = (props) => {
  return (
    <Head>
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
    </Head>
  );
};

export default MyHead;
