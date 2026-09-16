//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   // disable: process.env.NODE_ENV === 'development',
//   disable: true,
//   disableDevLogs: true,
//   // register: false,
//   // scope: '/app',
//   // sw: 'service-worker.js',
// });

const base_url = process.env.API_BASE_URL;
// const auth_prefix = process.env.NEXT_PUBLIC_AUTH_PREFIX || 'api';
const bbp_prefix = process.env.NEXT_PUBLIC_BBP_PREFIX || '';

const rewritesConfig = [
  // {
  //   source: `/${auth_prefix}/:path*`,
  //   destination: `${base_url}/${auth_prefix}/:path*`,
  // },
  {
    source: `/${bbp_prefix}/:path*`,
    destination: `${base_url}/${bbp_prefix}/:path*`,
  },
];

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];
/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  images: {
    unoptimized: true,
  },

  staticPageGenerationTimeout: 180,
  basePath: process.env.NODE_ENV === 'development' ? '' : base_url,
  rewrites: async () => {
    return rewritesConfig;
  },
  headers: async () => {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  compiler: {
    // For other options, see https://styled-components.com/docs/tooling#babel-plugin
    styledComponents: true,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
