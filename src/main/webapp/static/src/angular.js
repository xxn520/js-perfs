/**
 * Created by m2mbob on 2017/4/19.
 */
import jsPerfs from './js-perfs'

angular.module('app', []).controller('DBMonCtrl', function ($scope, $timeout) {
    $scope.databases = []
    const load = function() {
        $scope.databases = ENV.generateData(true).toArray()
        jsPerfs.monitor.syncUi()
        $timeout(load, ENV.timeout)
    }
    load()
})
