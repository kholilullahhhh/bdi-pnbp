import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bdimakassar.kemenperin.go.id",
      },
    ],
  },
};

export default nextConfig;
