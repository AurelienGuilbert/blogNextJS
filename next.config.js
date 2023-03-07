/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    NEXTAUTH_SECRET: "codingwithabbas",
  },
};

module.exports = nextConfig;
