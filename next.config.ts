/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placehold.co"],
    unoptimized: true, // Esto puede ayudar con problemas de imágenes en desarrollo
  },
  // Configuración experimental para Next.js 14
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

