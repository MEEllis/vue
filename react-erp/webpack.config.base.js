import path from 'path';
import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';

export default {
  output: {
    // webpack 如何输出结果的相关选项
    path: path.join(__dirname, 'app'), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    publicPath: '/', // string
    // 输出解析文件的目录，url 相对于 HTML 页面

    filename: 'resources/js/[name]-[hash:10].js', // string
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    chunkFilename: 'resources/js/[name]-[chunkhash:10].js', // 长效缓存(/guides/caching)
    // 「附加分块(additional chunk)」的文件名模板
  },


  module: {
    rules: [{
      test: /\.jsx?$/i,
      use: [
        'babel-loader'
      ],
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new HtmlPlugin({
      title: '云盛ERP',
      template: './src/index.ejs',
      favicon: './src/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};