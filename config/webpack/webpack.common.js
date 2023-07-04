"use strict";

const paths = require("../paths");
const modules = require("../modules");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const shouldUseReactRefresh = true;

module.exports = function getCommonWebpackConfig(args) {
  return {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: paths.appBuild,
      clean: true,
      assetModuleFilename: "static/media/[name].[hash][ext]",
      publicPath: paths.publicUrlOrPath,
    },
    resolve: {
      alias: {
        ...(modules.webpackAliases || {}),
      },
    },
    module: {
      rules: [
        {
          test: /\.(j|t)s(x?)$/,
          exclude: [/node_modules/, /(.|_)min\.js$/],
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.svg$/i,
          type: "asset",
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          // it's technically possible to use font files for icons (like Font Awesome)
          exclude: paths.appIcons,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            context: paths.appPublic,
            from: "*",
            to: paths.appBuild,
            toType: "dir",
            globOptions: {
              dot: true,
              gitignore: true,
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    ],
  };
};
