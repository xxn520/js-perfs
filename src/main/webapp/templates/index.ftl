<#assign contextPath="http://localhost:8080" />
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">
    <link rel="stylesheet" href="${contextPath}/static/assets/css/normalize.min.css">
    <link rel="shortcut icon" href="${contextPath}/static/assets/favicon.ico" type="image/x-icon">
    <title>js-perfs</title>
</head>
<body>
    <div id="app"></div>
    <script src="//cdn.bootcss.com/react/15.5.4/react.min.js"></script>
    <script src="//cdn.bootcss.com/react/15.5.4/react-dom.min.js"></script>
    <script src="${contextPath}/build/index.js"></script>
</body>
</html>