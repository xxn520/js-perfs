/**
 * Created by m2mbob on 2017/4/16.
 */
/**
 * @return {string}
 */
export function DateFormat(now, fmt) {
    //安卓上未实现locate,暂时无法使用
    //return now.toLocaleDateString('zh-CN').substring(5).replace(/\//g, '月').concat('日 ', now.toLocaleTimeString().slice(0, -3));
    const o = {
        "M+": now.getMonth() + 1,                 //月份
        "d+": now.getDate(),                    //日
        "h+": now.getHours(),                   //小时
        "m+": now.getMinutes(),                 //分
        "s+": now.getSeconds(),                 //秒
        "q+": Math.floor((now.getMonth() + 3) / 3), //季度
        "S": now.getMilliseconds()             //毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (now.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
}
