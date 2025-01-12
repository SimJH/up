/* eslint-disable prefer-named-capture-group */
const path = require('node:path');
const dotenv = require('dotenv');
const { presets, plugins } = require('./babel.config.js');
const { transformPackagesOnRspack } = require('./shares');

dotenv.config('.env');

const babelLoaderConfiguration = {
  test: /\.(ts|tsx|js|jsx)$/i,
  include: [new RegExp(`(${transformPackagesOnRspack.join('|')})`)],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins,
    },
  },
};

const jsModuleConfiguration = {
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
};

const imageLoaderConfiguration = {
  test: /\.(png|jpe?g|gif)$/i,
  type: 'asset',
};

const svgLoaderConfiguration = {
  test: /\\\\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

module.exports = {
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
  devServer: {
    allowedHosts: 'all',
  },
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native': 'react-native-web',
      'react-native-share': './src/web/react-native-share',
      '@/App': './App',
      src: './src',
      tests: './tests',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      jsModuleConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  builtins: {
    html: [
      {
        template: './index.html',
        favicon: './static/favicon.ico',
        publicPath: '',
        minify: true,
      },
    ],
    copy: {
      patterns: [
        './static/assets/**/*',
        './static/favicon.ico',
        './static/site.webmanifest',
      ],
    },
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      WEB_SENTRY_DSN: JSON.stringify(process.env.WEB_SENTRY_DSN) || 'empty',
      process: {
        env: {},
      },
    },
  },
  optimization: {
    sideEffects: false,
    moduleIds: 'named',
    minimize: false,
  },
};
