const path = require('path')

module.exports = {
  staticPageGenerationTimeout: 100000,
  trailingSlash: false,

  // webpack5: true,
  // ignoreBuildErrors: true,
  distDir: 'build',
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true
  },

  reactStrictMode: false,

  // swcMinify: true,
  // distDir: 'build',

  images: {
    unoptimized: false

    // unoptimized: true
  },
  compiler: {
    removeConsole: true,
    styledComponents: true

    // removeConsole: {
    //   exclude: ['info']
    // }
  },

  // transpilePackages: ['mui-one-time-password-input'],

  // transpilePackages: ['@mui/x-charts', 'react-hook-mousetrap'],
  // transpilePackages: ['@mui/x-charts'],
  // eslint: {
  //   ignoreDuringBuilds: true
  // },
  // experimental: {
  //   transpilePackages: ['@mui/x-charts']
  // },
  // modularizeImports: {
  //   '@mui/material': {
  //     transform: '@mui/material/{{member}}'
  //   },
  //   '@mui/x-charts': {
  //     transform: '@mui/x-charts/{{member}}'
  //   }
  // },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    if (cfg.cache && !dev) {
      cfg.cache = Object.freeze({
        type: 'memory'
      })
      cfg.cache.maxMemoryGenerations = 0
    }

    // Important: return the modified config
    return config
  },

  experimental: {
    webpackBuildWorker: true

    //   esmExternals: false,
    //   jsconfigPaths: false, // enables it for both jsconfig.json and tsconfig.json
    //   optimizePackageImports: [
    //     'lodash',
    //     '@mui/material',
    //     '@mui/icons-material',
    //     'store',
    //     'yup',
    //     'next/router',
    //     'crypto-js',
    //     'primereact/datatable',
    //     'primereact/column',
    //     'store',
    //     'react-number-format',
    //     'moment',
    //     'libphonenumber-js',
    //     'react-countdown'
    //   ]
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'digipayid',
  project: 'digipayid-fe',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
})
