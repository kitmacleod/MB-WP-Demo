const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');


module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry:'./src/index.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
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
    // TODO: may change this as not sure development source maps are working
    devtool: isProduction ? 'source-map':'cheap-module-eval-source-map',
    devServer:{
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath:'/dist/'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        }, 
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }]
        },
    node: {
      fs: "empty"
    }
  };
};


//--240119 Old config, not refreshing scss, so used earlier config--
// const path = require('path');
// // const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// // const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const devMode = process.env.NODE_ENV !== 'production'

// // TODO 
// // May need uglify JS
// // Should have separate config files

//   module.exports ={
//     // entry: {
//       // app: './src/index.js',
//     entry: './src/index.js',  
//     // },
//     output: {
//       path: path.join(__dirname, 'public', 'dist'),
//       filename: 'bundle.js'
//     },
//     mode: devMode ? 'development':'production',
//     //  optimization: {
//     //   splitChunks: {
//     //     chunks: 'all'
//     //   }
//     // },
   
//     devtool: devMode ? 'cheap-module-eval-source-map': 'source-map',
//     devServer:{
//       hot: true,
//       contentBase: path.join(__dirname, 'public'),
//       historyApiFallback: true,
//       //publicPath: path.join(__dirname, 'public', 'dist')
//        publicPath:'/dist/'
//     },
//     module: {
//       rules: [
//         {
//           test: /\.s?css$/,
//          // test:/\.(sa|sc|c)ss$/,
//           use: [
//           //  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
//             'style-loader',
//             'css-loader',
//             'sass-loader'
//           ]
//         }]
//     },
//     plugins: [
//       new CleanWebpackPlugin(['dist'])
//       // new HtmlWebpackPlugin({
//       //   filename: 'index.html',
//       //   template: 'public/index.html',
//       //   chunks: ['app']
//       // }),
//       // new HtmlWebpackPlugin({
//       //   filename: 'map2.html',
//       //   template: 'public/map2.html', 
//       //   chunks: ['app']
//       // })
//       // new MiniCssExtractPlugin({
//       //   filename: devMode ? '[name].css': '[name].[contenthash].css',
//       //   chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css'

//       // })
  
//     ],
//     node: {
//       fs: "empty"
//     }
//   };
// //};

