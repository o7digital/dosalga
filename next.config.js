/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/shop/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
