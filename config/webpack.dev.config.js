const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const webpack = require('webpack');


module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    overlay: true,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: { data: `@import "./src/styles/variable.scss";@import "./src/styles/mixin.scss";` }
      }]
    }]
  }
})
