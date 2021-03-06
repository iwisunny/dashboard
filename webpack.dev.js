const { resolve } = require('path');
const webpack = require('webpack');
const postCssOptions = require('./config/postcss.options');

module.exports = {
  mode: 'development',
  entry: [
    // 'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    filename: '[name].js',
    // chunkFilename: "[name].[chunkhash].js",
    path: resolve(__dirname, 'build/'),
    publicPath: '/build/',
    pathinfo: false
  },
  // profile: true,
  performance: {
    hints: 'warning'
  },
  module: {
    // noParse: function(content){
    //   return /lodash/.test(content);
    // },
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: '.cache/babel-loader'
            }
          }
        ],
        include: [resolve(__dirname, 'src'), resolve(__dirname, 'lib')]
      },
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      scss: resolve(__dirname, 'src/scss')
    },
    modules: [resolve(__dirname, 'src'), resolve(__dirname, 'lib'), 'node_modules']
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('development')
    })
    // for webpack v3
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function(module) {
    //     return module.context && module.context.includes('node_modules');
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   filename: 'common.js',
    //   chunks: 'all',
    //   minChunks: 2
    // })
  ],
  // for webpack v4
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        'async-vendors': {
          name: 'async-vendors',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          priority: 0
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        },
        default: {
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true
        }
      }
    }
  }
};
