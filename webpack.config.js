const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MODE = process.env.NODE_ENV || "development";
const DEV = MODE === "development";

const copyRules = [
  {
    from: __dirname + "/src/index.html",
    to: __dirname + "/dist/index.html"
  },
  {
    from: __dirname + "/assets",
    to: __dirname + "/dist"
  }
];

function createPlugins() {
  const common = [new CopyPlugin(copyRules)];
  return DEV
    ? common.concat(new Dotenv())
    : common.concat(
        new webpack.EnvironmentPlugin(
          ["CTF_SPACE_ID"],
          ["CTF_CDA_ACCESS_TOKEN"]
        )
      );
}

module.exports = {
  mode: MODE,
  devtool: DEV ? "inline-source-map" : "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader/url" }, { loader: "file-loader" }]
      }
    ]
  },
  plugins: createPlugins()
};
