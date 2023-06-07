/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
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
