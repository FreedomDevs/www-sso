import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') {
      return [];
    }

    return [
      {
        source: '/_backend/:path*',
        destination: 'https://gateway.elysiac.fun/:path*',
      },
    ];
  },
};

export default nextConfig;
