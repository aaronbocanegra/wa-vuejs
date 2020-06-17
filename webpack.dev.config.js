const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
const VueLoaderPlugin  = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-wordpress.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'vue-wordpress.css'
    })
  ],
  optimization: {
    chunkIds: isDev ? 'named' : 'total-size',
    minimize: !isDev,
    minimizer: isDev
      ? []
      : [
          new UglifyJsPlugin({
            // include: [path.resolve(__dirname, '../src')],
            cache: true,
            parallel: true,
            extractComments: true,
            uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: true,
              output: null,
              ie8: false,
              keep_fnames: false,
              toplevel: false,
            },
          }),
        ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json', '.css']
  }
}
