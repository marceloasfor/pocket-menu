/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    env: {
      // BACKEND_URL: 'http://localhost:8000/',
      // TODO: make the .env work
      BACKEND_URL: process.env.REACT_APP_BACKEND_4NEXT_URL,
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
