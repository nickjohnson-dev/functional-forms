/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    stats: 'minimal',
  },
  entry: {
    app: path.join(__dirname, './index.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: 'js/[name].js',
    path: __dirname,
    publicPath: 'http://localhost:8080/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      chunksSortMode: 'dependency',
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
