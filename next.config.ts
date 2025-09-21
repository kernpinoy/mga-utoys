import type { NextConfig } from "next";
// Just import — will throw if env is missing
import "./src/env/server";
import "./src/env/client";

const nextConfig: NextConfig = {
  // your Next.js config
};

export default nextConfig;
