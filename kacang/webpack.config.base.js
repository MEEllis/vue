import path from 'path';
import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';

export default {
  output: {
    path: path.join(__dirname, 'app'),
    publicPath: '/',
    filename: 'resources/js/[name]-[hash:10].js',
    chunkFilename: 'resources/js/[name]-[chunkhash:10].js',
  },
  resolve: {
    alias: {
      rework: 'rework.less/rework.less',
      utils: '../utils/utils.js',
      FL: '../utils/FL.js',
    },
    extensions: [
      '.web.js',
      '.jsx',
      '.js',
      '.less',
      '.css',
      '.json',
    ],
  },
  performance: {
    hints: false,
  },
  externals: {
    configs: 'configs'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        use: [
          { loader: 'svg-sprite-loader', options: { name: '[name]-[hash:10]' } },
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                plugins: [
                  { cleanupAttrs: true }, // 清理属性换行和重复的空格
                  { cleanupEnableBackground: true }, // 移除或清理 enable-background 属性
                  { cleanupIDs: true },   // 清理未使用的 和 压缩使用的 ID
                  { removeRasterImages: true }, // 移除栅格图标，默认值 false √
                  { removeDimensions: true }, // 移除 width/height 属性，默认值 false √
                  { removeStyleElement: true }, // 移除 <style> 元素，默认值 false √
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'resources/images/[name]-[hash:10].[ext]',
              limit: 1000
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      title: '卡仓网',
      inject: true,
      template: './src/index.ejs',
   
      favicon: './src/favicon.ico',
      // hash: true,                 // 时间戳
      minify: {                      // https://github.com/kangax/html-minifier#options-quick-reference
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        trimCustomFragments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/) // eslint-disable-line no-useless-escape
  ],
};
