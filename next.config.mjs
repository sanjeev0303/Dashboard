/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
            },
            {
                protocol: 'https',
                hostname: "cloudflare-ipfs.com",
            },
            {
                protocol: "https",
                hostname: "utfs.io"
              }
        ]
      },
};

export default nextConfig;
