/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    NEXTAUTH_SECRET: "9335077958b24ea184a39e1b79fe3858f9c4d85c296c8c5807f7048b4e5fc909a7705aa6f6b1f47c5933f3b9efbb385467c024675842de274eedf257a4bb42a2",
  },
};

module.exports = nextConfig;
