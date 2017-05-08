<#include "../consts.ftl">
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">
    <link rel="stylesheet" href="${contextPath}/static/assets/css/normalize.min.css">
    <link rel="stylesheet" href="${contextPath}/static/assets/css/js-perfs.css">
    <link href="${contextPath}/static/assets/css/sweetalert.css" rel="stylesheet">
    <link rel="shortcut icon" href="${contextPath}/static/assets/favicon.ico" type="image/x-icon">
    <title>js-perfs - ${pageName}</title>
</head>
<body ng-app="app">
    <!-- DBMon -->
    <div ng-controller="DBMonCtrl">
        <table class="table table-striped latest-data">
            <tbody>
            <!-- Database -->
            <tr ng-repeat="db in databases">
                <td class="dbname">
                    {{db.dbname}}
                </td>
                <!-- Sample -->
                <td class="query-count">
                <span class="{{db.lastSample.countClassName}}">
                  {{db.lastSample.nbQueries}}
                </span>
                </td>
                <!-- Query -->
                <td ng-repeat="q in db.lastSample.topFiveQueries" class="{{q.elapsedClassName}}">
                    {{q.formatElapsed}}
                    <div class="popover left">
                        <div class="popover-content">
                            {{q.query}}
                        </div>
                        <div class="arrow"></div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <script>
        window.pageName = '${pageName}'
    </script>
    <script src="${contextPath}/static/assets/js/angular.min.js"></script>
    <script src="${contextPath}/static/assets/js/sweetalert.min.js"></script>
    <script src="${contextPath}/static/dist/jsPerfsAngular.js"></script>
</body>
</html>