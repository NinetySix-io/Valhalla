/* eslint-disable */
const withTM = require('next-transpile-modules')(['@valhalla/react']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
});
