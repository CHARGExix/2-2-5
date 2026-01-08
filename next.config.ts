import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Makes all JS/CSS/image URLs relative
  assetPrefix: "./",

  // Disable basePath so it doesn't force a specific root
  // basePath: '',
  // Required for static export on GitHub Pages
  images: {
    unoptimized: true,
  },

  // Ensures trailing slash so relative paths resolve correctly
  trailingSlash: true,
};

export default nextConfig;
