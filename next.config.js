/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');
const withPlugins = require('next-compose-plugins');
const containerQuery = require('@tailwindcss/container-queries');

module.exports = withPlugins([withVideos, containerQuery], {
  reactStrictMode: true,
  images: {
    domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
  },
});
