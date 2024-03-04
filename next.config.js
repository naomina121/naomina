/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');
const withPlugins = require('next-compose-plugins');
// const containerQuery = require('@tailwindcss/container-queries');

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
});

module.exports = withPlugins([withVideos, withPWA], {
	reactStrictMode: false,
	swcMinify: false,
	images: {
		domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
		unoptimized: true,
	},
});
