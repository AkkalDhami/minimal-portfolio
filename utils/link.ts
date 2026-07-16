export function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  if (pathname.startsWith("/docs")) {
    return false;
  }

  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${escaped}(/|$)`);

  return regex.test(pathname);
}

export function withUTM(href: string) {
  try {
    if (typeof window === "undefined") {
      const url = new URL(href);

      if (!url.searchParams.has("utm_source")) {
        url.searchParams.set("utm_source", "akkal.com.np");
      }

      return url.toString();
    }

    const url = new URL(href);

    if (
      url.hostname !== window.location.hostname &&
      !url.searchParams.has("utm_source")
    ) {
      url.searchParams.set("utm_source", "akkal.com.np");
    }

    return url.toString();
  } catch {
    return href;
  }
}
