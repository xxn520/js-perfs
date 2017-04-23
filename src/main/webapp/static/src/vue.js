/**
 * Created by m2mbob on 2017/4/19.
 */
import jsPerfs from './js-perfs'

const app = new Vue({
    el: '#app',
    data: {
        databases: []
    }
})

function loadSamples() {
    app.databases = ENV.generateData(true).toArray();
    jsPerfs.monitor.syncUi();
    setTimeout(loadSamples, ENV.timeout);
}

loadSamples()
