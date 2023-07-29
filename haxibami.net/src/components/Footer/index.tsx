import Link from "next/link";

import {
  FediverseIcon,
  GitHubIcon,
  TwitterIcon,
  RssIcon,
} from "components/Svg";

const Footer: React.FC = () => {
  return (
    <footer className="flex w-full justify-center border-t border-[color:var(--line)] py-8 text-[color:var(--secondary)]">
      <div className="w-full max-w-3xl px-4">
        <div className="flex flex-row justify-between">
          <span>
            <Link href="/">©haxibami</Link>
          </span>
          <span className="flex gap-4">
            <a href={"https://twitter.com/haxibami"} rel="me" title="Twitter">
              <TwitterIcon className="h-6 w-6 fill-[color:var(--secondary)]" />
            </a>
            <a
              href={"https://calc.cune.moe/@haxibami"}
              rel="me"
              title="Fediverse"
            >
              <FediverseIcon className="h-6 w-6 fill-[color:var(--secondary)]" />
            </a>
            <a href={"https://github.com/haxibami"} rel="me" title="GitHub">
              <GitHubIcon className="h-6 w-6 fill-[color:var(--secondary)]" />
            </a>
            <a href={`/rss/feed.xml`} title="RSS">
              <RssIcon className="h-6 w-6 fill-[color:var(--secondary)]" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
