import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import baseConfig from './webpack.config.base';

const pkg = require('./package.json');

let theme = {};
if (pkg.theme && typeof (pkg.theme) === 'object') {
  theme = pkg.theme;
}


module.exports = webpackMerge(baseConfig, {
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router',
      'react-router-redux',
      'react-redux',
      'redux',
      'whatwg-fetch',
      'moment',
    ],
    index: [
      './src/index.js',
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                modifyVars: theme
              },
            },
          ],
        }),
      },
    ]
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin([
      'app'
    ]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        drop_debugger: true,
        drop_console: true,
        screw_ie8: true
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'resources/js/vendor-[hash:10].js'
    }),
    new ExtractTextPlugin({
      filename: 'resources/css/[name]-[hash:10].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      __DEV__: false,
      __DEBUG__: false,
    }),
  ],
});
