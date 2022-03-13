import Link from "next/link";

const MyLink: React.VFC<{
  children: string;
  href: string;
}> = ({ children, href }: { children: string; href: string }) =>
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
