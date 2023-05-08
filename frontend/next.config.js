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
        source: '/satellite/edit/:id',
        destination: '/satellite/edit',
      },
      {
        source: '/planet/delete/:id',
        destination: '/planet/delete',
      },
      {
        source: '/planet/edit/:id',
        destination: '/planet/edit',
      },
      {
        source: '/resource/add/:id',
        destination: '/resource/add',
      }]
  },
}