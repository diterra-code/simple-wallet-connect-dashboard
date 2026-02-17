/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Ignore react-native modules that cause warnings
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
    };
    return config;
  },
};

module.exports = nextConfig;
