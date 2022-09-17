const config = require('dotenv').config().parsed;
const pick = require('lodash.pick');
const withTM = require('next-transpile-modules')(['@valhalla/web.react']);
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

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponents: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  headers: () =>
    Promise.resolve([
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=(), fullscreen=()',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // {
          //   key: 'Content-Security-Policy',
          //   value: `
          //       default-src 'self';
          //       script-src 'self';
          //       child-src 'self';
          //       style-src 'self';
          //       font-src 'self';
          //     `
          //     .replace(/\s{2,}/g, ' ')
          //     .trim(),
          // },
        ],
      },
    ]),
};

module.exports = () => {
  const plugins = [withTM, withBundleAnalyzer];
  return plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });
};
