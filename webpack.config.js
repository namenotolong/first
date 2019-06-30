const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


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
            favicon: "./favicon.ico",
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
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.jpg|png|gif|jpeg|bmp$/,
            use: 'url-loader?limit=10000&name=img/[hash:6]-[name].[ext]'
        }, {
            test: /\.ttf|eot|svg|woff|woff2$/,
            use: 'url-loader',
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'media/[name].[hash:6].[ext]'
            }
        },
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
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    }
};