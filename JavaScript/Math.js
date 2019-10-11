// 1 处理js精度防范
// f为待处理参数，digit为小数点后位数
Math.formatFloat = function (f, digit) {
    var m = Math.pow(10, digit);//10的digit次方
    return Math.round(f * m, 10) / m;
}

// 2 将参数，转为两位小数字符串，返回
function formatMoney(text) {
    if (isEmpty(text)) {
        return;
    }
    var fds = /^\d+(\.\d+)?$/;  //浮点数正则表达式
    var zzs = /^\d+$/;          //正整数正则表达式
    var lwxs = /^[1-9]+([.]\d{2})?$/;       //两位小数正则表达式
    if (zzs.test(text)) { //如果是，是整数,补全两个0
        return parseFloat(text).toFixed(2);
    }
    if (lwxs.test(text)) { //是两位小数
        return text;
    }
    if (fds.test(text)) {//如果是浮点数,自动保留两位小数
        return parseFloat(text).toFixed(2);
    }
    if (!fds.test(text) || !zzs.test(text)) { //非浮点数,非整数
        return '';
    }
}