const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.base');
const mockUrlObj = require('./.webpack.mock');
const bodyParser = require('body-parser');

const devConfig = {
    devtool: 'inline-source-map',
    mode: 'development',
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.(css)$/,
            use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
            test: /\.(less)$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName:"[local]-[hash:base64:5]"
                    },
                },
                {
                    loader: 'less-loader', // 能够识别，并且解析less文件  的loader
                },
                {
                    loader: 'postcss-loader', // less 文件自动补全 loader
                },
            ],
        }]
    },
    devServer: {
        port: 8023,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '127.0.0.1',
        hot: true,
        open: false,
        progress:true, // 显示webpack 打包明细
        proxy: {
            "/api/*": "http://localhost:7090/$1"
        },
        before(app) {
            // 返回模拟请求数据
            Object.keys(mockUrlObj).forEach((key) => {
              const [type, url] = key.split(' ');
              app.use(url, bodyParser.json());
              if (type === 'GET') {
                app.get(url, mockUrlObj[key]);
              } else if (type === 'POST') {
                app.post(url, mockUrlObj[key]);
              }
            });
          },
    },
    plugins:[
        new webpack.LoaderOptionsPlugin(), //加载loader插件的一些配置选项，如postcss loader，你可以直接新建一个postcss.config.js文件来配置选项
       
        new webpack.NamedModulesPlugin(),  //插件替换默认的数字类型的模块 id，避免增加或删除模块对其他模块的 id 产生影响
        new webpack.DefinePlugin({
            __DEV__: true,
            __DEBUG__: false,
        }),  //选择性编译本质上是字符串的替换   全局替换 __DEV__为 true  , __DEBUG__  为fasle 

        new webpack.HotModuleReplacementPlugin(), // 载入模块热更新
    ]
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);