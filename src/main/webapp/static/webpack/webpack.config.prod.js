/**
 * Created by m2mbob on 2017/4/20.
 */
const webpack = require('webpack')
const path = require('path')
const WebpackChunkHash = require('webpack-chunk-hash')
const autoprefixer = require('autoprefixer')
const values = require('postcss-modules-values')
const config = require('./consts')

const {
    WEBPACK_SERVER_PORT,
    JAVA_SERVER_PORT,
    WEB_ROOT,
    DEST_DIR,
} = config

module.exports = {
    context: WEB_ROOT,
    devtool: 'nosources-source-map',
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        'jsPerfsAngular': './src/angular.js',
        'jsPerfsVue': './src/vue.js',
        'jsPerfsReact': './src/react.js',
        'jsPerfsInnerHTML': './src/innerHTML.js',
        'jsPerfsBackbone': ['./src/backbone.js'],
        'index': './src/index.js',
    },
    output: {
        path: DEST_DIR,
        filename: '[name].js',
    },
    module: {
        rules: [{
            exclude: [/node_modules/],
            test: /\.js$/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.(gif|jpg|jpeg|png|woff|woff2|eot|ttf|svg)(\?v=.+)?$/,
            use: 'url-loader?limit=20480&name=[path][name].[ext]?[sha256:hash:base64:8]'
        }, {
            test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        // fbjs needs the plugin to remove dev codes at compile time: https://fb.me/react-minification
        new webpack.DefinePlugin({
            __DEV__: false,
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            context: WEB_ROOT,
            debug: false,
            options: {
                postcss: () => [autoprefixer, values]
            }
        }),
        new WebpackChunkHash(),
    ],
    resolve: {
        modules: [
            WEB_ROOT,
            path.resolve(WEB_ROOT, 'node_modules')
        ]
    },
}
