const path = require('path')

module.exports = {
  staticPageGenerationTimeout: 1000,
  trailingSlash: false,

  ignoreBuildErrors: false,
  reactStrictMode: false,

  webpack5: true,

  // transpilePackages: ['@mui/x-charts', 'react-hook-mousetrap'],
  // transpilePackages: ['@mui/x-charts'],
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    transpilePackages: ['@mui/x-charts']
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/x-charts': {
      transform: '@mui/x-charts/{{member}}'
    }
  },

  // experimental: {
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
  // },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
