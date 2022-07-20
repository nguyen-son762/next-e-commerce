/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com', 'https://images.unsplash.com/'],
  },
  i18n: {
    locales: ['vn', 'fr', 'en'],
    defaultLocale: 'vn',
    localeDetection: false,
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Accept-Language',
            value: 'en',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
