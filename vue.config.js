const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        QRCode: "qrcode", //忽略引入qrcode库
      }),
    ],
  },
  // // 1.关闭sourceMap
  // productionSourceMap: false,
  // // 2.关闭lintOnSave
  // lintOnSave: false,
  // // 3.配置webpack

  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
