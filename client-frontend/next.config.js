/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    env: {
      BACKEND_URL: 'http://54.146.254.132/',
      // TODO: make the .env work
      // BACKEND_URL: process.env.REACT_APP_BACKEND_4NEXT_URL,
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
