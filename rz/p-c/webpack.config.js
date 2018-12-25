let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path');
let glob = require('glob');
let autoprefixer = require('autoprefixer');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
let HtmlWebpackPlugin =require('html-webpack-plugin');

const baseConfig = require('./base-config.js');

const ENTRY_PATH = './src/page/';


//个人中心只打包member/index文件   member下的其它文件不打包  避免浪费打包性能
module.exports = function () {
    console.log('env:', process.env.NODE_ENV);
    let env = process.env.NODE_ENV || 'dev';

    let getEntries = function (root) {
        var entryFiles = glob.sync(root + '**/*.{js,jsx}');
        var map = {};
        for (var i = 0; i < entryFiles.length; i++) {
            var filePath = entryFiles[i].substring(ENTRY_PATH.length, entryFiles[i].lastIndexOf('\.'));
            if(/^member\/.*/.test(filePath) ){
                if(filePath=='member/index'){
                    map['js/' + filePath] = [entryFiles[i]];
                }
            }else{
                map['js/' + filePath] = [entryFiles[i]];
            }
        }
        return map;
    }

    //公共配置
    let commonConfig = {
        entry: getEntries(ENTRY_PATH),
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].min.js',
            publicPath: '/',
            chunkFilename: './js/chunk/[name]-[id].common.js?[chunkhash]'//非主文件的命名规则
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,//css模块化
                                minimize: true,
                                import: true,
                                localIdentName: '[name]_[local]_[hash:base64:8]'
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader',

                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                minimize: true,
                                import: true,
                                localIdentName: '[name]_[local]_[hash:base64:8]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                import: true,
                                modules: true
                            }
                        },

                    ]
                },
                {test: /\.json$/, loader: 'json-loader'},
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-0'],
                            // presets: ['react','es2015','stage-0'],
                            plugins: [
                                ['transform-runtime', {
                                    'polyfill': true,
                                    'regenerator': true
                                }],
                                "transform-object-assign"
                            ]
                        },
                    }
                },
                {
                    test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
                    loader: 'url-loader?name=image/[name].[ext]',
                    options: {
                        limit: 8000
                    }
                }
            ]
        },
    };

    let getPages = function (root) {
        var entryFiles = glob.sync(root + '**/*.{js,jsx}');
        var map = {};
        console.log();
        for (var i = 0; i < entryFiles.length; i++) {
            var filePath = entryFiles[i].substring(ENTRY_PATH.length, entryFiles[i].lastIndexOf('\.'));
            map[filePath] = [entryFiles[i]];
        }
        return map;
    }

    // let pagesConfig=[];
    // Object.keys(getPages('./src/page/')).forEach((dir,index)=>{
    //     pagesConfig.push(new HtmlWebpackPlugin({
    //         filename:dir+'.html',
    //         template:'./template.html',
    //         chunks:['js/'+dir],
    //         hash:true,
    //     }))
    // });

    //开发环境配置
    let devConfig = {
        devtool: 'cheap-module-source-map',//cheap-module-source-map  source-map  eval
        resolve: {
            modules: [path.resolve(__dirname, './src'), 'node_modules'],
            extensions: ['.jsx','.scss','.js' ,'.css', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                // 'apiConfig': path.resolve(__dirname, './src/api/mockApiConfig.js'),
                'apiConfig': path.resolve(__dirname, './src/api/onLineApiConfig.js'),
            }
        },
        plugins: [
            // new CleanWebpackPlugin(["dist/js"], {}),
            new webpack.HotModuleReplacementPlugin(),
            new OpenBrowserPlugin({url: `http://localhost:${baseConfig.port}/index.html`})
        ]
    }


    //生产环境配置
    let prodConfig = {
        // devtool: 'eval',
        plugins: [
            new CleanWebpackPlugin(["dist/js"], {}),
            new CopyWebpackPlugin([
                {from: path.resolve(__dirname, './static'), to: './static'},
            ]),
            new webpack.optimize.UglifyJsPlugin({//代码压缩
                comments: false,//显示注释
                mangle: false,//取消代码混淆
                compress: {
                    warnings: false//在UglifyJs删除没有用到的代码时不输出警告
                }
            }),
            new webpack.DefinePlugin({//避免打包后出现警告的问题
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            })
        ],
        resolve: {
            modules: [path.resolve(__dirname, './src'), 'node_modules'],//模块的查找顺序
            extensions: ['.jsx','.scss','.js' ,'.css', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                'apiConfig': path.resolve(__dirname, './src/api/onLineApiConfig.js'),
            }
        }
    };


    return Object.assign(commonConfig, env == 'dev' ? devConfig : prodConfig);

}

