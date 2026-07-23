import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH at build time when serving from a subpath,
// e.g. GitHub Pages project sites (https://<user>.github.io/<repo>/).
// Leave unset for Vercel or a custom domain served from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
};

export default nextConfig;
