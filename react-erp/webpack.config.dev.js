import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';

function getIPAdress() {
  const interfaces = require('os').networkInterfaces();// eslint-disable-line global-require
  for (const devName in interfaces) { // eslint-disable-line guard-for-in, no-restricted-syntax
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i += 1) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
}


const host = getIPAdress();
const port = 8023;

module.exports = webpackMerge(baseConfig, {
  devtool: 'cheap-module-source-map',
  devServer: {
    host,
    port,
    hot: true,
    historyApiFallback: true,
    compress: true,
  },
  entry: [
    './src/index.js',
  ],
  module: {
    rules: []
  },

  performance: {
    hints: 'warning',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      Mock: 'mockjs',
      fetchMock: 'fetch-mock',
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
      __DEBUG__: false,
    }),
  ],
});
