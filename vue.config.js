const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
    // historyApiFallback: true,
    // allowedHosts: 'all',
    // port: 9528,
    //   // host: '192.168.0.51',
    // open: true,
    proxy: {
      "/": {
        // target: "https://sdd.cevmp.cn/",
        // target: "http://192.168.99.112:9999",
        target: "https://jsgsn.cevmp.cn",
        // target: "http://10.168.1.237:9999",
        secure: false,
        changeOrigin: true,
        open: true,
        ws: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          referer:"https://jsgsn.cevmp.cn/subsidy/"
        }
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    },
  },
})
