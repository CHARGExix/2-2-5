import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: 'docs', // Output to 'docs' folder for GitHub Pages
  // Use relative paths for assets so it works on any subdirectory (GitHub Pages or Local)
  assetPrefix: './',

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
