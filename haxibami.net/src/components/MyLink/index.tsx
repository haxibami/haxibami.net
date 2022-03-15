import Link from "next/link";
import type { ReactNode } from "react";

interface LinkProps {
  children: ReactNode;
  href: string;
}

const MyLink: React.VFC<LinkProps> = ({ children, href }) =>
  href.startsWith("/") || href === "" ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

export default MyLink;
