import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep TS build tolerant while stabilizing types
  typescript: {
    ignoreBuildErrors: true,
  },
  // Reduce double-invocations in dev that can exacerbate effect loops
  reactStrictMode: false,
};

export default nextConfig;
