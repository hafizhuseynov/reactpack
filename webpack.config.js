const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { merge: mergeWebpackConfigs } = require("webpack-merge");
const getCommonWebpackConfig = require("./config/webpack/webpack.common");
const getDevelopmentWebpackConfig = require("./config/webpack/webpack.dev");
const getProductionWebpackConfig = require("./config/webpack/webpack.prod");
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

  return mergeWebpackConfigs(commonWebpackConfig, webpackConfiguration);
};
