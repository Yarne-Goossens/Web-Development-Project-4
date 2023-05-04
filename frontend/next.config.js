/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  async rewrites() {
    return [
      {
        source: '/satellite/add/:id',
        destination: '/satellite/add',
      },
    ]
  },
}