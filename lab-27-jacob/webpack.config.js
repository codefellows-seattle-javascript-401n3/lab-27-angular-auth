'use strict';

const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
//takes css from bundle and creates our own css file.

const production = process.env.NODE_ENV === 'production';

dotenv.load();

let plugins = [
  new ExtractTextPlugin('bundle.css'),//({filename: 'bundle.css'})
  new HTMLPlugin({ template: `${__dirname}/app/index.html` }),
  new webpack.DefinePlugin({
    __API_URL__: JSON.stringify(process.env.API_URL),
    __DEBUG__: JSON.stringify(!production) //this goes away
  })
];

if (production) { //this block goes away
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new CleanPlugin()
  ]);
}

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  devtool: production ? false : 'eval', //'source-map'  //instead of eval
  plugins, //this goes away
  output: {
    path: 'build', //`${__dirname}/build`
    filename: 'bundle.js'
  },
  sassLoader: {
    includePaths: [`${__dirname}/app/scss/`]
  },
  //plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel' //use: ['babel-loader']
      },
      {
        test: /\.html$/,
        loader: 'html' //use: ['html-loader']
      },
      {
        test: /\.(woff|tt|svg|eot).*/,
        loader: 'url?limit=10000&name=image/[hash].[ext]' //use [instead of] loader
      },
      {
        test: /\.(jpg|jpeg|svg|bmp|tiff|gif|png)$/,
        loader: 'url?limit=10000&name=image/[hash].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
      }
    ]
  }
};

/*
test: /\.scss$/,
use: ExtractTextPlugin.extract(
  {
    use: [
      { loader: 'css-loader', options {sourceMap: true } },
      {
        loader: 'sass-loader',
        optons: {
          sourceMap: true,
          includePaths: [`${__dirname}/app/scss`]
        }
      },
    ]
  })
*/
