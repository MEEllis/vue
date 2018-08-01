const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const commonConfig = {
  entry: {
    app: [
      path.join(__dirname, 'src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'react-dom']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '云盛ERP',
      template: './src/index.ejs',
      favicon: './src/favicon.ico',
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],

  optimization:{
    splitChunks: {
        cacheGroups: {
            vendor: { 
                test: /node_modules\//,
                name: 'dist/vendor',
            },
          
        }
    },
    runtimeChunk: {
        name: 'dist/runtime'
    }
},

  resolve: {

  }
};

module.exports = commonConfig;