import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 이미지 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lxsrrjbliquipxytgnna.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  turbopack: {},
};

export default nextConfig;
