/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  swcMinify: false, // Some dependency is not compatible with SWC minification
};

module.exports = nextConfig;
