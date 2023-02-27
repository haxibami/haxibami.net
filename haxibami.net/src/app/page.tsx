import type { Metadata } from "next";
import Link from "next/link";

import Footer from "components/Footer";
import Header from "components/PostHeader";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";
import { SITEDATA, HOST } from "lib/constant";

export const metadata: Metadata = {
  title: "haxibami",
  description: "haxibamiのウェブサイト",
  openGraph: {
    title: "haxibami",
    description: "haxibamiのウェブサイト",
    url: `https://${HOST}/`,
    type: "website",
    images: {
      url: `https://${HOST}/icon_ange_glasses_512.webp`,
      width: 512,
      height: 512,
    },
  },
  twitter: {
    card: "summary",
    title: "haxibami",
    description: "haxibamiのウェブサイト",
    images: `https://${HOST}/icon_ange_glasses_512.webp`,
    site: "@haxibami",
    siteId: "1077091437517238272",
    creator: "@haxibami",
    creatorId: "1077091437517238272",
  },
};

export default async function Home() {
  const file = await fetchPost("docs", "home");
  const { content } = await compiler(file);
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4">
      <Header posttype="blog" />
      <main className="flex grow flex-col divide-y divide-[color:var(--line)] pb-6">
        <div className="flex flex-col items-center">
          <div className="mt-2 flex flex-col gap-8 pt-72 font-redoctober">
            <div
              className="
              relative flex -rotate-[35deg] transform-gpu items-start
              before:absolute before:right-0 before:bottom-[calc(100%_+_15px)] before:-z-10 before:h-[200%] before:w-[50px] before:bg-[color:var(--avangard1)] before:content-['']
              after:absolute after:right-[60px] after:bottom-[calc(100%_+_15px)] after:-z-10 after:h-[150%] after:w-[50px] after:bg-[color:var(--avangard2)] after:content-['']"
            >
              <div
                className="
                relative flex flex-col items-end
                before:absolute before:right-[60%] before:bottom-[calc(100%_+_20px)] before:-z-10 before:h-0 before:w-0 before:rotate-[40deg] before:transform-gpu before:border-y-[25px] before:border-r-[60px] before:border-solid before:border-transparent before:border-r-[color:var(--avangard1)] before:content-['']
                after:absolute after:right-[72%] after:bottom-[calc(100%_+_52px)] after:-z-10 after:h-[20px] after:w-[20px] after:rounded-full after:bg-[color:var(--fg)] after:content-['']
            "
              >
                <h2 className="text-4xl leading-none">name:</h2>
                <h1 className="text-6xl leading-none">HAXIBAMI</h1>
              </div>
            </div>
            <div
              className="
              relative -rotate-[35deg] transform-gpu
              before:absolute before:right-16 before:top-4 before:-z-10 before:h-8 before:w-8 before:bg-[color:var(--fg)] before:content-['']
              after:absolute after:right-12 after:top-8 after:-z-10 after:h-8 after:w-8 after:bg-[color:var(--fg)] after:content-['']
          "
            />
            <div
              className="
              vertical relative mr-16 flex -rotate-[35deg] transform-gpu flex-col overflow-hidden 
              before:absolute before:right-[40%] before:top-0 before:-z-10 before:h-0 before:w-0 before:border-x-[20px] before:border-t-[90px] before:border-solid before:border-transparent before:border-t-[color:var(--avangard3)] before:content-['']
              after:absolute after:right-[40%] after:bottom-0 after:-z-10 after:h-0 after:w-0 after:border-x-[20px] after:border-t-[90px] after:border-solid after:border-transparent after:border-t-[color:var(--avangard1)] after:content-['']
          "
            >
              <h2 className="text-3xl leading-none">
                myth
                <br />
                finder,
                <br />
                et cetera.
              </h2>
            </div>
          </div>
        </div>
        <div>
          <article className="post">{content}</article>
        </div>
        <div className="grid grid-cols-1 gap-4 pt-8 text-sm sm:grid-cols-2">
          <Link
            href="/about"
            className="flex flex-col gap-4 border border-[color:var(--line)] p-6 shadow"
          >
            <h2 className="text-2xl">About</h2>
            <p>Profile, Contact, etc...</p>
          </Link>
          <Link
            href="/blog"
            className="flex flex-col gap-4 border border-[color:var(--line)] p-6 shadow"
          >
            <h2 className="text-2xl">Blog</h2>
            <p>{SITEDATA.blog.description}</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
