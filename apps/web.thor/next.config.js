const config = require('dotenv').config().parsed;
const { pick } = require('@valhalla/utilities');
const withTM = require('next-transpile-modules')(['@valhalla/react']);
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @see https://nextjs.org/docs/messages/env-key-not-allowed
 */
const env = config
  ? pick(
      config,
      Object.keys(config).filter(
        (k) =>
          !k.startsWith('__') &&
          !k.startsWith('NODE_') &&
          !k.startsWith('NEXT_RUNTIME'),
      ),
    )
  : {};

module.exports = withPlugins([withTM, withBundleAnalyzer], {
  env,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    runtime: 'nodejs',
    serverComponents: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
});
