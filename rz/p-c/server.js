var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config')();
let compiler = webpack(config);
let path = require('path');

const baseConfig = require('./base-config.js');

Object.keys(config.entry).forEach(function (name, i) {
    config.entry[name].unshift('webpack/hot/dev-server');
    config.entry[name].unshift(`webpack-dev-server/client?http://localhost:${baseConfig.port}`);
});

let app = new WebpackDevServer(compiler, {
    contentBase: './dist',
    publicPath: '/',//以contentBase作为 / 根目录的路径
    hot: true,
    inline: true,
    setup: function (app) {

        // Object.keys(API).forEach(function(item,i){
        //   let apiUrl=API[item].api;
        //   let mock=path.resolve(__dirname,API[item].mock);
        //   console.log(apiUrl,mock);
        //   app.get(apiUrl,function(req,res){
        //     var query=req.query;
        //     let controller=require(mock);
        //     var resData=controller(query);
        //     console.log(query,controller);
        //     res.json(resData);
        //   });

        // });
    },
    proxy: {
        '/apiPc': {
            // target: 'http://10.1.20.195:8080',//陈德余
            target:'http://10.1.14.51:8089/pc',//测试环境
             // target:'http://10.1.14.144:9000/rz-web-pc',//陈海龙
            // target:'http://10.1.14.7:8089',//杨光伟
            // target:'http://10.1.20.29:8003/rz-web-pc',//徐莉华
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                '^/apiPc': ''
            },
        },
    },
    historyApiFallback: true,
    stats: {
        colors: true,
        open: true,
    }
});


app.listen(baseConfig.port, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log(`Listening at localhost:${baseConfig.port}`);
});





