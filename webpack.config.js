const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { merge: mergeWebpackConfigs } = require("webpack-merge");
const webpack = require("webpack");
const fs = require("fs");

if (fs.existsSync(".env")) {
  require("dotenv").config({ path: "./.env" });
}

const getCommonWebpackConfig = require("./config/webpack/webpack.common");
const { availableEnvironments } = require("./config/constant");

module.exports = function (env = {}) {
  const nodeEnv = process.env.NODE_ENV;
  const commonWebpackConfig = getCommonWebpackConfig();

  if (!nodeEnv) {
    throw Error(
      `Missing NODE_ENV: The NODE_ENV environment variable is not defined.`
    );
  }

  if (!availableEnvironments.includes(nodeEnv)) {
    throw new Error(
      `Invalid NODE_ENV value: "${nodeEnv}". Allowed values are [${availableEnvironments.join(
        ", "
      )}].`
    );
  }

  const webpackConfiguration =
    require(`./config/webpack/webpack.${nodeEnv}`)(/*Extra arguments can be sent*/);

  if (env.analyze) {
    webpackConfiguration.plugins.push(
      new BundleAnalyzerPlugin({
        defaultSizes: "parsed",
        openAnalyzer: true,
      })
    );
  }

  webpackConfiguration.plugins.push(
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    })
  );

  return mergeWebpackConfigs(commonWebpackConfig, webpackConfiguration);
};
