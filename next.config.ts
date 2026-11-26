import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',

  sassOptions: {
    loadPaths: [path.join(process.cwd(), 'src/styles')],
  },

  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];

    return [
      {
        source: '/_backend/:path*',
        destination: 'https://gateway.elysiac.fun/:path*',
      },
    ];
  },
};

export default nextConfig;
