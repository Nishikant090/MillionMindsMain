import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static `out/` folder for deployment on Render Static Sites.
  output: "export",
  // Pin workspace root so Next.js doesn't pick up stray lockfiles.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
