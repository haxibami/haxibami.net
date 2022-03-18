import Link from "next/link";
import type { ReactNode } from "react";

interface LinkProps {
  children: ReactNode;
  href: string;
  id?: string;
}

const MyLink: React.VFC<LinkProps> = ({ children, href, id }) =>
  href.startsWith("/") || href === "" ? (
    // internal
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : href.startsWith("#") ? (
    // internal (document)
    <a href={href} id={id} data-footnote-ref aria-describedby="footnote-label">
      {children}
    </a>
  ) : (
    // external (new tab)
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

export default MyLink;
