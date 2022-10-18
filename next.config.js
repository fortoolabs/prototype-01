/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/script.js',
      },
      {
        source: '/api/event',
        destination: 'https://plausible.io/api/event',
      },
    ]
  },
  images: {
    domains: ['pbs.twimg.com'],
  },
}

module.exports = nextConfig
