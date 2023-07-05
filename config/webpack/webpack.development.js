'use strict'

const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const paths = require("../paths.js");

module.exports = function getDevelopmentWebpackConfig(args) {
  return {
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
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: "[local]_[hash:base64:5]",
                },
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
          sideEffects: true,
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
  };
};
