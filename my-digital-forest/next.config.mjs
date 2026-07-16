/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Esto hace que Next.js ignore errores de tipos al compilar
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;