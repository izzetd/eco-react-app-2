const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  entry: path.join(__dirname, "/client/src/index.js"),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  target: 'web',
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'client/dist'),
  //   open: true,
    proxy: {
      "/api": "http://localhost:4000/"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "client/templates/index.html"),
    })
  ]
};