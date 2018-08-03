const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const commonConfig = {
  entry: {
    app: [
      path.join(__dirname, 'src/index.js')
    ],
    vendor: ['react','react-dom','dva','dva-loading']
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
      use: [
        
        {
          loader: 'babel-loader',
          options: {
              cacheDirectory: true,
          },
      }],
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
    // 需要从 vendor.js 中抽离出 Webpack 的运行时代码，保证 vendor.js 的 hash 不会受到影响。
    //这个插件会根据模块的相对路径生成一个长度只有四位的字符串作为模块的 id，既隐藏了模块的路径信息，又减少了模块 id 的长度
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