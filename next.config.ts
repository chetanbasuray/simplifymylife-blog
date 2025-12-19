/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // optional: used by Unsplash API
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/recommends/trade-republic",
        destination: "https://traderepublic.com",
        permanent: false,
      },
      {
        source: "/recommends/c24",
        destination: "https://s.c24.de/ShDYa9mLCF/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
