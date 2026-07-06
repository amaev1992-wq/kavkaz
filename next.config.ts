import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Сайт не привязан к конкретному хостингу: работает на Vercel,
  // любом Node.js-хостинге (next start) и может быть собран статически
  // (output: "export"), т.к. не использует серверные API-роуты.
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
