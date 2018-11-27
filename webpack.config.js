const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');


module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry:'./src/index.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
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
    node: {
      fs: "empty"
    }
  };
};

