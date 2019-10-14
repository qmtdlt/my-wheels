//小工具集成

// 1. 身份证号验证,通过验证，返回ok
// 调用举例 if(CheckIdNumber(code) == 'ok') {}
function CheckIdNumber(code) {
    var tip = "";
    var pass = true;
    var year = code.substr(6, 4);
    var mounth = code.substr(10, 2);
    var day = code.substr(12, 2);

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    }
    // 验证出生年月
    if (((year % 400 == 0) || year % 100 != 0) && year % 4 == 0) {
        if (mounth == '02') {
            if (day * 1 > 29) {
                pass = false;
            }
        }
    } else {
        if (mounth == '02') {
            if (day * 1 > 28) {
                pass = false;
            }
        }
    }
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
        }
    }
    if (!pass) {
        //校验失败  填写你要做的内容
        return tip;
    }
    else
    {
        return "ok";
    }
}

// 2. 保留两位小数钱数
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