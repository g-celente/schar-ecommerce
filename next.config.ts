import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (40–50% smaller than WebP), WebP as fallback
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Explicit device sizes for responsive srcSet generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Compress JS output
  compress: true,
  // Enable React strict mode for better perf warnings
  reactStrictMode: true,
};

export default nextConfig;