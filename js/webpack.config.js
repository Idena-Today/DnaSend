const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  node: {
    fs: 'empty'
  },
  entry: {main : ["./src/index.js"],
          demo: ["./src/demo.js"] },
  target: "web",
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
    new HtmlWebpackPlugin({
      filename: "demo.html",
      template: "src/demo.html",
      chunks: ['demo']
    }),
    ],
 module: {
      rules: [
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader',
         ],
       },
       {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
       }
      ],
    },
  //externals: ['tls', 'net', 'fs'],
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
