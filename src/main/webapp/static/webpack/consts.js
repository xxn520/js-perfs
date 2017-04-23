/**
 * Created by m2mbob on 2017/4/14.
 */
const path = require('path')

module.exports = {
    WEB_ROOT: path.resolve(__dirname, '../'),
    RES_DIR: path.resolve(__dirname, '../src'),
    DEST_DIR: path.resolve(__dirname, '../dist'),
    JAVA_SERVER_PORT: 8081,
    WEBPACK_SERVER_PORT: 8080,
}
