/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbopack: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;
