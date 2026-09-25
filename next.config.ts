import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Issue covers and other artwork uploaded in OJS are served from the journal host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "journal.northsumateraophthalmology.com",
        pathname: "/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
