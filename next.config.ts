import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/app/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/app/blog/:slug",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/app/privacy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/app/terms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
