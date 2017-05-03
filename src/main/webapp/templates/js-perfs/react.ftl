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
    <link href="//cdn.bootcss.com/sweetalert/1.1.3/sweetalert.css" rel="stylesheet">
    <link rel="shortcut icon" href="${contextPath}/static/assets/favicon.ico" type="image/x-icon">
    <title>js-perfs - ${pageName}</title>
</head>
<body>
    <div id="app"></div>
    <script>
        window.pageName = '${pageName}'
    </script>
    <script src="//cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
    <script src="//cdn.bootcss.com/react/15.5.4/react.min.js"></script>
    <script src="//cdn.bootcss.com/react/15.5.4/react-dom.min.js"></script>
    <script src="${contextPath}/static/dist/jsPerfsReact.js"></script>
</body>
</html>