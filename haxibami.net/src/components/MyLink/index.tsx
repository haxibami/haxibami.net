import type { ReactNode } from "react";

import Link from "next/link";



export interface MyLinkProps {
  children: ReactNode;
  href?: string;
  id?: string;
}

const MyLink: React.FC<MyLinkProps> = (props) => {
  const { children, href, id } = props;
  if (href === undefined) {
    return <a>{children}</a>;
  } else {
    return href.startsWith("/") || href === "" ? (
      // internal
      <Link href={href}>
        <a>{children}</a>
      </Link>
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
      // external (new tab)
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
};

export default MyLink;
