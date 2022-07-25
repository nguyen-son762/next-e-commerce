/** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["images.unsplash.com", "https://images.unsplash.com/"],
  },
  i18n: {
    locales: ["vn", "fr", "en"],
    defaultLocale: "vn",
    localeDetection: false,
  },
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Accept-Language",
            value: "vn",
          },
        ],
      },
    ];
  },
  // assetPrefix: isProd ? "https://cdn.mydomain.com" : "",
  env: {
    customKey: "my-value",
  },
};

module.exports = nextConfig;
