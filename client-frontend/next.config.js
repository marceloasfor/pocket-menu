/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    env: {
      BACKEND_URL: process.env.REACT_APP_SERVER_URL,
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
