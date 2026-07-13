import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx$/
});

const nextConfig: NextConfig = {
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  typedRoutes: true,
  redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/playbook/backend-fundamentals-01",
        permanent: true
      },
      {
        source: "/docs/networking",
        destination: "/networking",
        permanent: true
      },
      {
        source: "/docs/playbook",
        destination: "/playbook",
        permanent: true
      },
      {
        source: "/docs/dsa",
        destination: "/dsa",
        permanent: true
      }
    ];
  }
};

export default withMDX(nextConfig);
