import Image from "next/image";
// import Link from "next/link";

import Header from "components/PostHeader";
import Footer from "components/Footer";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";

import icon from "/public/icon_ange_glasses_512.webp";

export default async function About() {
  const file = await fetchPost("docs", "about");
  const { content, frontmatter } = await compiler(file);
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-4">
      <Header posttype="blog" />
      <main className="flex grow flex-col divide-y divide-[color:var(--line)] pb-8">
        <div className="my-8 flex flex-row flex-wrap justify-center gap-8">
          <div>
            <Image
              className="rounded-full object-cover"
              width={175}
              height={175}
              src={icon}
              alt="icon"
              placeholder="blur"
            />
          </div>
          <span className="flex items-center justify-center">
            <h1 className="text-5xl">{frontmatter?.title}</h1>
          </span>
        </div>
        <article className="post">{content}</article>
      </main>
      <Footer />
    </div>
  );
}
