const path = require("path");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
  mode: "production",
  // plugins: [new NodePolyfillPlugin()],
  entry: {
    background: "./common/background.js",
    content_scripts: "./common/content_scripts/index.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/zero/js",
    auxiliaryComment: "none", // 禁用 license 文件的生成
  },
  module: {
    rules: [
      // 添加对 .js 文件的处理规则
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 目录
        use: {
          loader: "babel-loader", // 使用 babel-loader 处理 JavaScript 文件
          options: {
            presets: ["@babel/preset-env"], // 使用 @babel/preset-env 进行转译
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
