
const path = require('path');
const HtmlWbpackPlugin =require('html-webpack-plugin');

const htmlPlugin = new HtmlWbpackPlugin({
    template:path.join(__dirname,'./src/index.html'),  //源文件
    filename:'index.html',  // 生成在内存中首页的名称
})


module.exports = {
    mode:'development',
    plugins:[
        htmlPlugin,
    ]
}