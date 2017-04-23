/**
 * Created by m2mbob on 2017/4/20.
 */
const webpack = require('webpack')
const path = require('path')
const WebpackChunkHash = require('webpack-chunk-hash')
const WEB_ROOT = path.resolve(__dirname, '../../')

module.exports = {
    context: WEB_ROOT,
    devtool: 'nosources-source-map',
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        'jsPerfsAngular': './src/js-perfs/angular.js',
        'jsPerfsVue': './src/js-perfs/vue.js',
        'jsPerfsReact': './src/js-perfs/react.js',
        'jsPerfsInnerHTML': './src/js-perfs/innerHTML.js',
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            exclude: [/node_modules/],
            test: /\.js$/,
            use: 'babel-loader'
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
