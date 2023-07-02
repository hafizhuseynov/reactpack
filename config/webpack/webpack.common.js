"use strict";

const path = require("path");
const paths = require("../paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const shouldUseReactRefresh = true;

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === "true") {
    return false;
  }

  try {
    require.resolve("react/jsx-runtime");
    return true;
  } catch (e) {
    return false;
  }
})();

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
    ],
  };
};
