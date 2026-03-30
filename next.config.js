/** @type {import('next').NextConfig} */
const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.sundayhundred.com/api/v1';
const normalizedBaseUrl = /^https?:\/\//i.test(rawBaseUrl)
  ? rawBaseUrl
  : `https://${rawBaseUrl}`;

const nextConfig = {
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_API_BASE_URL: normalizedBaseUrl,
  },

  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
