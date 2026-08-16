import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    console.log("BACKEND_URL is:", process.env.BACKEND_URL); // temporary debug
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;