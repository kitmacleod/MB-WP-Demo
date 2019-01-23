const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production'

// Old way to configure
// module.exports = (env) => {
//   const isProduction = env === 'production';

//   return {
  module.exports ={
    entry: {
      pageOne: './src/index.js',
      pageTwo: './src/index.js'
    },
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: '[name].bundle.js'
    },
    mode: devMode ? 'development':'production',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            mangle: false
          }
        })
      ],
    },
    devtool: devMode ? 'cheap-module-eval-source-map': 'source-map',
    devServer:{
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath:'/dist/'
    },
    module: {
      rules: [
        {
          //test: /\.s?css$/,
          test:/\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin,
            //'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html'
      }),
      new HtmlWebpackPlugin({
        filename: 'map2.html',
        template: 'public/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css': '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'

      })
  
    ],
    node: {
      fs: "empty"
    }
  };
//};

