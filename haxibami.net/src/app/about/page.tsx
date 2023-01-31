import Image from "next/image";

import Header from "components/PostHeader";
import Footer from "components/Footer";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";

import icon from "/public/icon_ange_glasses_512.webp";

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
