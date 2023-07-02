const path = require("path");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const common = require("./webpack.common.js");
const paths = require("../paths.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "static/js/bundle.js",
    pathinfo: true,
    chunkFilename: "static/js/[name].chunk.js",
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        // exclude: /node_modules/,
        include: paths.appSrc,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: "./build",
    compress: true,
    port: 3000,
    hot: true,
  },

  devtool: "eval-cheap-module-source-map",
  plugins: [new ReactRefreshWebpackPlugin()],
});
