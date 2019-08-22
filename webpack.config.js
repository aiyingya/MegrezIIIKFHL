const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
let package = require('./package.json');

// 多线程打包
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

let option = {
    mode: 'development',
    // mode:'production',
    devtool: 'source-map',
    entry: {
        main: ['babel-polyfill', __dirname + "/app/entry.js"]
    },
    output: {
        // Cannot GET / 注意这里打包到线上需要/static/
        // publicPath:'/static/',
        publicPath:'/',
        path: __dirname + "/dist",
        filename: package.name + "-[hash].js"
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    priority: -10,
                    name: "vendors",
                    enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    name: "default"
                }
            }
        }
    },
    resolve: {
        alias: {
            "@": __dirname + "/src",
            "@api": __dirname + "/src/api",
            "@pages": __dirname + "/src/pages",
            "@components": __dirname + "/src/components",
            "@locales": __dirname + "/src/locales",
            "@utils": __dirname + "/src/utils",
            "~": __dirname,
            "~app": __dirname + "/app",
            "~modules": __dirname + "/node_modules",
            "#": __dirname + "/core",
            "define": __dirname + "/app/css/Define.less",
            // export
            "styleCommon": __dirname + "/app/css/style",
            "userCentre":  __dirname + "/src/api/UserCentre"
        }
    },
    devServer: {
        contentBase: __dirname,//本地服务器所加载的页面所在的目录
        historyApiFallback: true,
        inline: true,//实时刷新
        port: 3015,//端口号
        proxy: {
            '/': {
                bypass: function(req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                }
            },
            '/rest': {
                target: 'http://192.168.1.61:8081',
                // target: 'http://192.168.16.160:9005',
                ws: false,
                changeOrigin: true
            }
        },
        quiet: true, //输出打包的信息
        noInfo: false,
        hot: true, //开启热点
        lazy: false, //不启动懒加载
        progress: true, //
        watchOptions: {
            aggregateTimeout: 300
        }
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: "babel-loader",
                // include: [/app/, /node_modules\/winning-megreziii-basic-service/, /src/]
                // include: [/app/, /node_modules\/winning-megreziii-basic-service/,/node_modules\/winning-megreziii-utils/, /src/]
                // include: [/app/, /node_modules\/winning-megreziii-basic-service/,/node_modules\/winning-megreziii-routers/, /src/]
                include: [/app/, /node_modules\/winning-megreziii-basic-service/,/node_modules\/winning-megreziii-utils/,/node_modules\/winning-megreziii-routers/, /src/]

            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader"
                    }
                ],
                include: [/app/, /src/]
            },
            {
                test: /\.less$/,
                include: [/antd/, /exclude*/,/Wrapper/],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            javascriptEnabled: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modules: false,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: [/antd/, /exclude*/,/Wrapper/],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modules: true,
                            localIndetName: "[name]__[local]___[hash:base64:5]",
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|svg|ttf|eot)\??.*$/,
                loader: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            },
            {
                test: /\.(gif|png|jpg|svg|mp4)\??.*$/,
                loader: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash:8].[ext]',
                        limit: 8192
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanWebpackPlugin('dist/*', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            exclude: [/\.map$/, /asset-manifest\.json$/],
            importWorkboxFrom: 'cdn',
            navigateFallback: '/index.html',
            navigateFallbackBlacklist: [
                // Exclude URLs starting with /_, as they're likely an API call
                new RegExp('^/_'),
                // Exclude URLs containing a dot, as they're likely a resource in
                // public/ and not a SPA route
                new RegExp('/[^/]+\\.[^/]+$'),
            ],
        }),
        new HappyPack({
            id: 'js',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
            verbose: true
        })
    ],
    performance: {hints: false}
};

option.plugins.push(new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    chunks: ['main', 'vendors', 'default'],
    hash: true,
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: false
    }
}));
module.exports = option;