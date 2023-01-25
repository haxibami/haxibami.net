// import Image from "next/image";
// import Link from "next/link";

import Footer from "components/Footer";
// import * as Svg from "components/Svg";
import { fetchPost } from "lib/api";
import compiler from "lib/compiler";

export default async function Home() {
  const file = await fetchPost("docs", "home");
  const { content } = await compiler(file);
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4">
      <main className="flex grow flex-col divide-y divide-[color:var(--line)] pb-6">
        <div className="flex flex-col items-center">
          <div className="mt-12 flex flex-col gap-8 pt-72 font-redoctober">
            <div
              className="
              relative flex -rotate-[35deg] transform-gpu items-start
              before:absolute before:right-0 before:bottom-[calc(100%_+_15px)] before:-z-10 before:h-[200%] before:w-[50px] before:bg-[#fb0500] before:content-['']
              after:absolute after:right-[60px] after:bottom-[calc(100%_+_15px)] after:-z-10 after:h-[150%] after:w-[50px] after:bg-[#66606c] after:content-['']"
            >
              <div
                className="
                relative flex flex-col items-end
                before:absolute before:right-[60%] before:bottom-[calc(100%_+_20px)] before:-z-10 before:h-0 before:w-0 before:rotate-[40deg] before:transform-gpu before:border-y-[25px] before:border-r-[60px] before:border-solid before:border-transparent before:border-r-[#ffd000] before:content-['']
                after:absolute after:right-[72%] after:bottom-[calc(100%_+_52px)] after:-z-10 after:h-[20px] after:w-[20px] after:rounded-full after:bg-[color:var(--fg)] after:content-['']
            "
              >
                <h2 className="text-5xl leading-none">«who?»</h2>
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
              vertical relative mr-20 flex -rotate-[35deg] transform-gpu flex-col overflow-hidden 
              before:absolute before:right-[40%] before:top-0 before:-z-10 before:h-0 before:w-0 before:border-x-[20px] before:border-t-[90px] before:border-solid before:border-transparent before:border-t-[#fd5404] before:content-['']
              after:absolute after:right-[40%] after:bottom-0 after:-z-10 after:h-0 after:w-0 after:border-x-[20px] after:border-t-[90px] after:border-solid after:border-transparent after:border-t-[#fb0500] after:content-['']
          "
            >
              <h3 className="text-3xl leading-none">
                code,
                <br />
                write,
                <br />
                and read.
              </h3>
            </div>
          </div>
        </div>
        <div className="post">
          <article>{content}</article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
