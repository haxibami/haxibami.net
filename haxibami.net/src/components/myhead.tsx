import Head from "next/head";

export interface MetaProps {
  title: string;
  sitename: string;
  description: string;
  ogImageUrl: string;
  pageRelPath: string;
  pagetype: PageType;
  twcardtype: TwCardType;
}

// page type in twitter card: article / website
const PageType = {
  Article: "article",
  Website: "website",
} as const;

type PageType = typeof PageType[keyof typeof PageType];

// twitter card type: summary / summary_large_image
const TwCardType = {
  Summary: "summary",
  Summary_Large_Image: "summary_large_image",
} as const;

type TwCardType = typeof TwCardType[keyof typeof TwCardType];

export default function MyHead(props: MetaProps) {
  return (
    <Head>
      <title>
        {props.title} - {props.sitename}
      </title>
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
      <meta
        property="og:title"
        content={`${props.title} - ${props.sitename}`}
      />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={props.sitename} />
      <meta property="og:image" content={props.ogImageUrl} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
