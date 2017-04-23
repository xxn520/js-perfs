/**
 * Created by m2mbob on 2017/4/19.
 */
window.ENV = (function () {

    var first = true;
    var counter = 0;
    var data;
    var _base;
    // 扩展了 String 的原型，增加了 lpad 方法，如果目前长度小于指定的 toLength 那么在左边填充指定的 padding 尽量到指定长度
    (_base = String.prototype).lpad || (_base.lpad = function (padding, toLength) {
        return padding.repeat((toLength - this.length) / padding.length).concat(this);
    });

    // 格式化所耗时
    function formatElapsed(value) {
        var str = parseFloat(value).toFixed(2);
        if (value > 60) {
            minutes = Math.floor(value / 60);
            comps = (value % 60).toFixed(2).split('.');
            seconds = comps[0].lpad('0', 2);
            ms = comps[1];
            str = minutes + ":" + seconds + "." + ms;
        }
        return str;
    }

    // 耗时的类名
    function getElapsedClassName(elapsed) {
        var className = 'Query elapsed';
        if (elapsed >= 10.0) {
            className += ' warn_long';
        }
        else if (elapsed >= 1.0) {
            className += ' warn';
        }
        else {
            className += ' short';
        }
        return className;
    }

    // 查询数量的类名
    function countClassName(queries) {
        var countClassName = "label";
        if (queries >= 20) {
            countClassName += " label-important";
        }
        else if (queries >= 10) {
            countClassName += " label-warning";
        }
        else {
            countClassName += " label-success";
        }
        return countClassName;
    }

    // 更新 Query 数据
    function updateQuery(object) {
        if (!object) {
            object = {};
        }
        var elapsed = Math.random() * 15;
        object.elapsed = elapsed;
        object.formatElapsed = formatElapsed(elapsed);
        object.elapsedClassName = getElapsedClassName(elapsed);
        object.query = "SELECT blah FROM something";
        object.waiting = Math.random() < 0.5;
        if (Math.random() < 0.2) {
            object.query = "<IDLE> in transaction";
        }
        if (Math.random() < 0.1) {
            object.query = "vacuum";
        }
        return object;
    }

    // 清空 Query 数据
    function cleanQuery(value) {
        if (value) {
            value.formatElapsed = "";
            value.elapsedClassName = "";
            value.query = "";
            value.elapsed = null;
            value.waiting = null;
        } else {
            return {
                query: "***",
                formatElapsed: "",
                elapsedClassName: ""
            };
        }
    }

    function generateRow(object, keepIdentity, counter) {
        var nbQueries = Math.floor((Math.random() * 10) + 1);
        if (!object) {
            object = {};
        }
        object.lastMutationId = counter;
        object.nbQueries = nbQueries;
        if (!object.lastSample) {
            object.lastSample = {};
        }
        if (!object.lastSample.topFiveQueries) {
            object.lastSample.topFiveQueries = [];
        }
        if (keepIdentity) {
            // for Angular optimization
            if (!object.lastSample.queries) {
                object.lastSample.queries = [];
                for (var l = 0; l < 12; l++) {
                    object.lastSample.queries[l] = cleanQuery();
                }
            }
            for (var j in object.lastSample.queries) {
                var value = object.lastSample.queries[j];
                if (j <= nbQueries) {
                    updateQuery(value);
                } else {
                    cleanQuery(value);
                }
            }
        } else {
            object.lastSample.queries = [];
            for (var j = 0; j < 12; j++) {
                if (j < nbQueries) {
                    var value = updateQuery(cleanQuery());
                    object.lastSample.queries.push(value);
                } else {
                    object.lastSample.queries.push(cleanQuery());
                }
            }
        }
        for (var i = 0; i < 5; i++) {
            var source = object.lastSample.queries[i];
            object.lastSample.topFiveQueries[i] = source;
        }
        object.lastSample.nbQueries = nbQueries;
        object.lastSample.countClassName = countClassName(nbQueries);
        return object;
    }

    // 对于 keepIdentity 为 true 的情况会利用原有的引用，否则会新建引用
    function getData(keepIdentity) {
        var oldData = data;
        if (!keepIdentity) { // reset for each tick when !keepIdentity
            data = [];
            for (var i = 1; i <= ENV.rows; i++) {
                data.push({dbname: 'cluster' + i, query: "", formatElapsed: "", elapsedClassName: ""});
                data.push({dbname: 'cluster' + i + ' slave', query: "", formatElapsed: "", elapsedClassName: ""});
            }
        }
        if (!data) { // first init when keepIdentity
            data = [];
            for (var i = 1; i <= ENV.rows; i++) {
                data.push({dbname: 'cluster' + i});
                data.push({dbname: 'cluster' + i + ' slave'});
            }
            oldData = data;
        }
        for (var i in data) {
            var row = data[i];
            if (!keepIdentity && oldData && oldData[i]) {
                row.lastSample = oldData[i].lastSample;
            }
            if (!row.lastSample || Math.random() < ENV.mutations()) {
                counter = counter + 1;
                if (!keepIdentity) {
                    row.lastSample = null;
                }
                generateRow(row, keepIdentity, counter);
            } else {
                data[i] = oldData[i];
            }
        }
        first = false;
        return {
            toArray: function () {
                return data;
            }
        };
    }

    var mutationsValue = 0.5;

    function mutations(value) {
        if (value) {
            mutationsValue = value;
            return mutationsValue;
        } else {
            return mutationsValue;
        }
    }

    var body = document.querySelector('body');
    var theFirstChild = body.firstChild;

    var sliderContainer = document.createElement('div');
    sliderContainer.style.cssText = "display: flex; margin-top: 60px;";
    var slider = document.createElement('input');
    var text = document.createElement('label');
    text.innerHTML = 'mutations : ' + (mutationsValue * 100).toFixed(0) + '%';
    text.id = "ratioval";
    text.style.cssText = "width: 350px; line-height: 53px; padding-left: 5px; flex: 1;"
    slider.setAttribute("type", "range");
    slider.style.cssText = 'margin: 10px; flex: 2;'
    slider.addEventListener('change', function (e) {
        ENV.mutations(e.target.value / 100);
        document.querySelector('#ratioval').innerHTML = 'mutations : ' + (ENV.mutations() * 100).toFixed(0) + '%';
    });
    sliderContainer.appendChild(text);
    sliderContainer.appendChild(slider);
    body.insertBefore(sliderContainer, theFirstChild);

    return {
        generateData: getData,
        rows: 50,
        timeout: 4,
        mutations: mutations
    };
})();
