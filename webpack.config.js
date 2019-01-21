const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');


module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: {
      pageOne: './src/index.js',
      pageTwo: './src/index.js'
    },
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: '[name].bundle.js'
    },
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
    devtool: isProduction ? 'source-map':'cheap-module-eval-source-map',
    devServer:{
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath:'/dist/'
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
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
      })
    
    ],
    node: {
      fs: "empty"
    }
  };
};

