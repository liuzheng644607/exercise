/**
* @Author: liuyany.liu <lyan>
* @Date:   2017-03-21 22:45:05
* @Last modified by:   lyan
* @Last modified time: 2017-03-21 23:13:05
*/

var webpack = require('webpack');
 
module.exports = {
    //页面入口文件配置
    entry: {
        index : './src/app.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.js$/, loader: 'babel-loader?presets=es2015' }
        ]
    }
};
