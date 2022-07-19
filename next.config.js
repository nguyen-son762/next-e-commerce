/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  images: {
    domains: ["images.unsplash.com", "https://images.unsplash.com/"],
  },
  // i18n: {
  //   locales: ["vn", "fr", "en"],
  //   defaultLocale: "vn",
  //   localeDetection: false,
  //   domains: [
  //     {
  //       domain: "http://localhost:3000/en",
  //       defaultLocale: "en",
  //       http: true,
  //     },
  //     {
  //       domain: "http://localhost:3000/fr",
  //       defaultLocale: "fr",
  //     },
  //     {
  //       domain: "http://localhost:3000",
  //       defaultLocale: "vn",
  //       http: true,
  //     },
  //   ],
  // },
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Accept-Language",
            value: "en",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
