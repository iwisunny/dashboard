const { resolve } = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const postCssOptions = require('./postcss.options');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',
  // cache: true,
  entry: [
    // 'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build/'),
    publicPath: '/build',
    pathinfo: true
  },
  // profile: true,
  stats: {
    hash: true,
    // version: true,
    timings: true,
    // assets: true,
    chunks: true,
    // modules: true,
    // reasons: true,
    // children: true,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true
  },
  module: {
    rules: [
      ...commonConfig.moduleRules,
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 2,
              localIdentName: '[folder]__[local]--[hash:base64:5]',
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: postCssOptions
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 0,
              localIdentName: '[folder]__[local]--[hash:base64:5]',
              modules: true
            }
          }
        ]
      }
    ]
  },
  resolve: commonConfig.resolve,
  plugins: [
    new WebpackNotifierPlugin({
      title: 'dashboard build done',
      alwaysNotify: true
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.WatchIgnorePlugin([
      // resolve(__dirname, 'lib'),
      resolve(__dirname, 'server'),
      resolve(__dirname, 'build'),
      resolve(__dirname, 'dist')
    ]),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('development')
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.js',
    //   // async: true,
    //   // children: true,
    //   minChunks: Infinity,
    // })
  ]
};