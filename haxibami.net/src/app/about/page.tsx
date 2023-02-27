import type { Metadata } from "next";
import Image from "next/image";

import Header from "components/PostHeader";
import Footer from "components/Footer";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";
import { HOST } from "lib/constant";

import icon from "/public/icon_ange_glasses_512.webp";

export const metadata: Metadata = {
  title: "私について",
  description: "プロフィール",
  openGraph: {
    title: "私について",
    description: "プロフィール",
    url: `https://${HOST}/about`,
    type: "profile",
    username: "haxibami",
    // TODO: add other profile entry
    images: {
      url: encodeURI(`https://${HOST}/api/ogp?title=私について`),
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "私について",
    description: "プロフィール",
    images: encodeURI(`https://${HOST}/api/ogp?title=私について`),
    site: "@haxibami",
    siteId: "1077091437517238272",
    creator: "@haxibami",
    creatorId: "1077091437517238272",
  },
};

export default async function About() {
  const file = await fetchPost("docs", "about");
  const { content } = await compiler(file);
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-4">
      <Header posttype="blog" />
      <main className="flex grow animate-fadeup flex-col divide-y divide-[color:var(--line)] py-8">
        <div className="my-8 flex flex-row flex-wrap justify-center gap-8">
          <div>
            <Image
              className="rounded-full object-cover shadow"
              width={150}
              height={150}
              src={icon}
              alt="icon"
              placeholder="blur"
              loading="eager"
            />
          </div>
          <span className="flex items-center justify-center">
            <h1>haxibami</h1>
          </span>
        </div>
        <article className="post">{content}</article>
      </main>
      <Footer />
    </div>
  );
}
