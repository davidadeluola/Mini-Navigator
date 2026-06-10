import type { NextConfig } from "next";

const allowedHostnames = [
  "images.unsplash.com",
  "tremendous-crane-40.convex.cloud",
  // add as many as you want...
];

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
   experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: allowedHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
