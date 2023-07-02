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

module.exports = {
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
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve("babel-loader"),
        options: {
          //   customize: require.resolve(
          //     "babel-preset-react-app/webpack-overrides"
          //   ),
          presets: [
            [
              require.resolve("babel-preset-react-app"),
              {
                runtime: hasJsxRuntime ? "automatic" : "classic",
              },
            ],
          ],

          plugins: [
            isEnvDevelopment &&
              shouldUseReactRefresh &&
              require.resolve("react-refresh/babel"),
          ].filter(Boolean),
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // See #6846 for context on why cacheCompression is disabled
          cacheCompression: false,
          compact: isEnvProduction,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
