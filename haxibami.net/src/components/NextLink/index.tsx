import type { ReactNode } from "react";

import Link from "next/link";

export interface NextLinkProps {
  children: ReactNode;
  href?: string;
  id?: string;
}

const NextLink: React.FC<NextLinkProps> = (props) => {
  const { children, href, id } = props;
  if (href === undefined) {
    return <a>{children}</a>;
  } else {
    return href.startsWith("/") || href === "" ? (
      // internal
      <Link href={href}>{children}</Link>
    ) : href.startsWith("#user-content") ? (
      // inside page (footnote)
      <a
        href={href}
        id={id}
        data-footnote-ref
        aria-describedby="footnote-label"
      >
        {children}
      </a>
    ) : href.startsWith("#") ? (
      // inside page (document)
      <a href={href} id={id}>
        {children}
      </a>
    ) : (
      // external
      <a href={href}>{children}</a>
    );
  }
};

export default NextLink;
