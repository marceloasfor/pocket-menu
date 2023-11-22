/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    env: {
      BACKEND_URL: process.env.BACKEND_URL,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/verification',
          permanent: false,
        },
      ];
    },
}

module.exports = nextConfig
