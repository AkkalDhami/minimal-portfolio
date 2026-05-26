export function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  if (pathname.startsWith("/docs")) {
    return false;
  }

  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${escaped}(/|$)`);

  return regex.test(pathname);
}
