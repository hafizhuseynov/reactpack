const { merge } = require("webpack-merge");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = require("../paths.js");

module.exports = function getProductionWebpackConfig(args) {
  return {
    mode: "production",
    devtool: false, // "source-map" for debugging in production if needed.
    output: {
      filename: "static/js/[name].[contenthash:8].js",
      chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
      devtoolModuleFilenameTemplate: (info) =>
        path
          .relative(paths.appSrc, info.absoluteResourcePath)
          .replace(/\\/g, "/"),
    },
    module: {
      rules: [
        {
          test: /\.(s?)css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
          sideEffects: true,
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: process.argv.includes("--profile"),
            keep_fnames: process.argv.includes("--profile"),
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash].css",
      }),
    ],
  };
};
