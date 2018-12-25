// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8082,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/apiApp': {
            // target: 'http://10.1.14.118:8080/app',      //陈德余
            // target: 'http://10.1.14.113:8080/rz-web-app/app',      //张文
            // target: 'http://10.1.14.61:8080/rz-web-app/app',      //魏加松
            // target:'http://10.1.14.7:8088',//杨光伟
            target:'http://10.1.14.51:8088/app/app',//测试环境
            // target:'http://10.1.14.144:9000/rz-web-app/app',//陈海龙
            changeOrigin: true,
            pathRewrite: {
                '^/apiApp': ''
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
/**
 张文： http://10.1.14.113:8080/rz-web-app/app
 陈德余： http://10.1.14.118:8080/app

  **/

