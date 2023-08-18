const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /server/, ],
        use: {
          loader: 'babel-loader', // Use Babel loader
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Use these presets with Babel
          }
        }
      },
      {
        test: /\.css$/, // Target .css files
        use: ['style-loader', 'css-loader'], // Use these loaders for .css files
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }, // Needed for apps with routing to redirect all server requests to index.html
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html', // source html
        filename: 'index.html' // destination file name
    })
],

};
