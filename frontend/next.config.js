/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = 
module.exports = {nextConfig,
  async rewrites() {
    return [
      {
        source: '/satellite/add/:id',
        destination: '/satellite/add',
      },
      {
        source: '/planet/delete/:id',
        destination: '/planet/delete',
      },
      {
        source: '/planet/edit/:id',
        destination: '/planet/edit',
      }]
  },
}