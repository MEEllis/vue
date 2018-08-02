const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.config.base');

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
            test: /\.(css|scss|less)$/,
            use: ["style-loader", "css-loader","less-loader?modules", "postcss-loader"]
        }]
    },
    devServer: {
        port: 8023,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '127.0.0.1',
        hot: true,
        progress:true,
        proxy: {
            "/api/*": "http://localhost:7090/$1"
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
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