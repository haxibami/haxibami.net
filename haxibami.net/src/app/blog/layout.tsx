import type { Metadata } from "next";

import Footer from "components/Footer";
import Header from "components/PostHeader";
import { SITEDATA } from "lib/constant";

const postType = "blog";

export const metadata: Metadata = {
  openGraph: {
    siteName: SITEDATA[postType].title,
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-4">
      <Header posttype={postType} />
      <main className="flex grow flex-col py-8">{children}</main>
      <Footer />
    </div>
  );
}
