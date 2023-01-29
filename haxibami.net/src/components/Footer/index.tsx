import Link from "next/link";

import { GitHubIcon, TwitterIcon, RssIcon } from "components/Svg";

const Footer: React.FC = () => {
  const date = new Date();
  return (
    <footer className="flex w-full justify-center border-t border-[color:var(--line)] py-8 text-[color:var(--title)]">
      <div className="w-full max-w-3xl px-4">
        <div className="flex flex-row justify-between">
          <span>
            <Link href="/blog">©{date.getFullYear()} haxibami</Link>
          </span>
          <span className="flex gap-8">
            <a
              href={"https://twitter.com/haxibami"}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
            >
              <TwitterIcon className="h-8 w-8 fill-[color:var(--fg)]" />
            </a>
            <a
              href={"https://github.com/haxibami"}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <GitHubIcon className="h-8 w-8 fill-[color:var(--fg)]" />
            </a>
            <a
              href={"https://www.haxibami.net/rss/feed.xml"}
              target="_blank"
              rel="noopener noreferrer"
              title="RSS"
            >
              <RssIcon className="h-8 w-8 fill-[color:var(--fg)]" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
