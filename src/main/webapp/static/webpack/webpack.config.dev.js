const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const WebpackChunkHash = require('webpack-chunk-hash')
const autoprefixer = require('autoprefixer')
const values = require('postcss-modules-values')
const _ = require('lodash')
const config = require('./consts')

const {
    WEBPACK_SERVER_PORT,
    JAVA_SERVER_PORT,
    WEB_ROOT,
    DEST_DIR,
} = config
const publicPath = '/static/dist/'
const WEBPACK_DEV_FILES = [
    `webpack-dev-server/client?http://localhost:${WEBPACK_SERVER_PORT}/`,
    'webpack/hot/only-dev-server'
]
const APP_ENTRY = {
    'jsPerfsAngular': ['./src/angular.js'],
    'jsPerfsVue': ['./src/vue.js'],
    'jsPerfsReact': ['./src/react.js'],
    'jsPerfsInnerHTML': ['./src/innerHTML.js'],
    'index': ['./src/index.js'],
};

 module.exports = {
    context: WEB_ROOT,
    entry: _.mapValues(APP_ENTRY, files => files.concat(WEBPACK_DEV_FILES)),
    devtool: 'cheap-module-source-map',
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    watch: true,
    output: {
        path: DEST_DIR,
        filename: '[name].js',
        publicPath,
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
            __DEV__: true,
            'process.env': {
                NODE_ENV: JSON.stringify('develop')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            context: WEB_ROOT,
            debug: true,
            options: {
                postcss: () => [autoprefixer, values]
            }
        }),
        new WebpackChunkHash(),
        new WebpackNotifierPlugin({ title: 'Webpack(site)' }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    resolve: {
        modules: [
            WEB_ROOT,
            path.resolve(WEB_ROOT, 'node_modules')
        ]
    },
    devServer: {
        hot: true,
        publicPath,
        proxy: {
            '*': {
                target: `http://localhost:${JAVA_SERVER_PORT}`
            }
        }
    }
}
