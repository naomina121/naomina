/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = nextConfig;

config.resolve.alias = {
  '@': path.resolve(__dirname, './'),
};

const withVideos = require('next-videos');

module.exports = withVideos();
