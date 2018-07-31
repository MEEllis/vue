import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const pkg = require('./package.json');

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

let theme = {};
if (pkg.theme && typeof (pkg.theme) === 'object') {
  theme = pkg.theme;
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
    'react-hot-loader/patch',
    'babel-polyfill',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less/i,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'less-loader', options: { sourceMap: true, modifyVars: theme } }
        ]
      }
    ]
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
