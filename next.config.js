/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Force dynamic rendering for all pages
  experimental: {
    forceSwcTransforms: true,
  },
  // Disable static generation for all pages
  trailingSlash: false,
  // Force dynamic rendering
  output: undefined,
}

module.exports = nextConfig
