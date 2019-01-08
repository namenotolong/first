var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, 
                removeComments: true, 
                collapseWhitespace: true, 
            }
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader','sass-loader']
        }, {
            test: /\.jpg|png|gif|jpeg|bmp$/,
            use: 'url-loader?limit=15000&name=[hash:8]-[name].[ext]'
            //当图片大小在15000字节以内时，才将图片的路径转化为base64
        }, {
            test: /\.ttf|eot|svg|woff|woff2$/,
            use: 'url-loader',
            // exclude:path.resolve(__dirname,"./src/components/BaseIcon/svg")
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/, 
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        // {
        //     test: /\.svg$/,
        //     use: 'svg-sprite-loader',
        //     include:path.resolve(__dirname,"./src/components/BaseIcon/svg"),
        // }
        ]
    },
    performance: {
        hints: "warning", //展示警告
        maxAssetSize: 500000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    resolve: {
        // alias:{
        //     vue$:'vue/dist/vue.js'  //设置vue被导入时的路径，不然会默认导入vue.runtime.common.js的包。
        // }
    }
};