const { PHASE_PRODUCTION_BUILD } = require('next/constants')
const path = require('path')

// const hostname =
//   typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : window.location.hostname
// const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : window.location.origin
// console.log('hostname: ', hostname)
// console.log('origin: ', origin)

module.exports = (phase, { defaultConfig }) => {
  return {
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
    productionBrowserSourceMaps: true,

    // swcMinify: true,
    // distDir: 'build',

    images: {
      unoptimized: false

      // unoptimized: true
    },
    compiler: {
      removeConsole: phase === PHASE_PRODUCTION_BUILD ? true : false,
      styledComponents: true

      // removeConsole: {
      //   exclude: ['error', 'warning', 'info']
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

    // async rewrites() {
    //   return [
    //     {
    //       source: '/:path*',
    //       destination:
    //         phase === PHASE_PRODUCTION_BUILD
    //           ? process.env.NEXT_PUBLIC_API_SERVER + '/:path*'
    //           : process.env.NEXT_PUBLIC_API + '/:path*'

    //       // process.env.NEXT_PUBLIC_API == 'https://be.digipayid.com'
    //       //   ? process.env.NEXT_PUBLIC_API_SERVER + '/:path*'
    //       //   : process.env.NEXT_PUBLIC_API + '/:path*'

    //       //      // destination: 'https://43e2-2a09-bac5-55fc-15f-00-23-434.ngrok-free.app/api/:path*'
    //     }
    //   ]
    // }
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
