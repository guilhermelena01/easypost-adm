import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'res.cloudinary.com',
        port: ""
      },
      {
        protocol: "https",
        hostname: 'www.easypostsys.com.br',
        port: ""
      }
    ]
  }
};

export default nextConfig;
