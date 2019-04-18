
export function formatTime(date, format) {
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return date.substr(0, 4);
            case 'MM':
                return date.substr(4, 2);
            case 'dd':
                return date.substr(6, 2);
            case 'mm':
                return date.substr(8, 2);
            case 'ss':
                return date.substr(10, 2);
        }
    });
}

export function formatTimeString(date, format) {
    // 处理Safari 兼容
    if (typeof date === 'string' && date.indexOf('-') > -1) {
        date = date.replace(/-/g, '/');
    }
    let time = new Date(date);
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return time.getFullYear();
            case 'MM':
                return (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
            case 'dd':
                return time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            case 'HH':
                return time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            case 'mm':
                return time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            case 'ss':
                return time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
        }
    });
}

/**
 * 将2016-06-20 15:30 格式化为2016年06月20日 15:30
 * @param str
 * @returns {XML|string|*}
 */
export function formatDateToZH(str) {
    return str.substr(0, 4) + '年' + str.substr(5, 2) + '月' + str.substr(8, 2) + '日 ' + str.substr(11, 6);
}



function getDatStartEnd(date) {
    var Start = new Date(date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' 00:00:00').getTime();
    var End = new Date(date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' 23:59:59').getTime();
    return { Start, End };
}
function GetDateStr(AddDayCount, current) {
    var dd = current || new Date();
    dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; // 获取当前月份的日期
    var d = dd.getDate();
    return y + '-' + m + '-' + d;
}

// - 1分钟内：刚刚
// - 1小时内：X分钟前
// - 24小时内：X小时前
// - 24小时外：昨天
// - 昨天0点以前：前天
// - 30天内：X天前
// - 30天前：YYYY-MM-DD
export function formateTime(dateTime) {
    var result = '';
    var nowTime = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':00';
    nowTime = new Date(nowTime).getTime();
    var today = getDatStartEnd(new Date());
    var pre = getDatStartEnd(new Date(GetDateStr(-1)));
    var prePre = getDatStartEnd(new Date(GetDateStr(-2)));
    var prePreTen = getDatStartEnd(new Date(GetDateStr(-29)));
    var temp = new Date(dateTime).getTime();
    if (nowTime < temp) {
        result = '刚刚';
        return result;
    }
    if (((nowTime - temp) / (1000 * 60)) < (60)) {
        result = Math.ceil((nowTime - temp) / (1000 * 60)) + '分钟前';
        return result;
    }
    if (((nowTime - temp) / (1000 * 60 * 60)) < 24) {
        result = Math.ceil((nowTime - temp) / (1000 * 60 * 60)) + '小时前';
        return result;
    }
    if (pre.Start < temp && temp < pre.End) {
        result = '昨天';
        return result;
    }
    if (prePre.Start < temp && temp < prePre.End) {
        result = '前天';
        return result;
    }
    if (prePreTen.Start < temp) {
        var days = Math.ceil((new Date().getTime() - new Date(dateTime).getTime()) / (60 * 60 * 1000 * 24));
        result = days + '天前';
        return result;
    }
    return dateTime.substr(0, 11);
}



/**
 *  str 为2015-06-04
 *  格式化  2015年06月04日
 */
export function formatTimeToCN(str, format) {
    str = typeof str === 'string' && str.indexOf('-') > -1 ? str.replace(/[-]/g, '/') : str;
    let time = new Date(str);
    if (time) {
        return format.replace(/yyyy|MM|dd/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return time.getFullYear() + '年';
                case 'MM':
                    return ((time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + '月';
                case 'dd':
                    return (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + '日';
            }
        });
    }
}


/**
 * 拼接URL 参数
 * key=xxxx&key2=xxxxx
 * params={
 *     a:'xxx',
 *     b:'xxx'
 * }
 */
export function getURLParmas(params) {
    let a = [];


    let i = 0;
    for (var k in params) {
        k ? a[i++] = k + '=' + params[k] : '';
    }
    return a.join('&');
}

export function Serialize(a) {
    // /    <summary>
    // /        This method is internal.  Use serialize() instead.
    // /    </summary>
    // /    <param name="a" type="Map">A map of key/value pairs to serialize into a string.</param>'
    // /    <returns type="String" />
    // /    <private />

    var s = [];

    function add(key, value) {
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        // s[ s.length ] = (key) + '=' + (value);
    }

    // Serialize the key/values
    for (var j in a) {
        add(j, a[j]);
    }

    // Return the resulting serialization
    return s.join('&').replace(/%20/g, '+');
}

/**
 * @return {string}
 */
export function SimpleSerialize(a) {
    var s = [];
    function add(key, value) {
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }

    for (var j in a) {
        add(j, a[j]);
    }
    return s.join('&');
}

/**
 * 字符串数字千位加上,分割
 * @param str
 * @param len
 * @returns {*}
 */
export function formateNumberToDot(str) {
    if (!str) {
        return '';
    }
    var temp = Number(str);
    if (isNaN(temp))
    {
        return str;
    }
    str = String(str);
    var floatStr = str.substr(str.indexOf('.'));
    var strPre =  str.substr(0, str.indexOf('.'));
    strPre = strPre.split('').reverse();
    var dobNum = Math.floor(strPre.length / 3) + (strPre.length % 3 == 0 ? -1 : 0);
    for (var i = 0, len = dobNum; i < len; i++) {
        strPre.splice(((i + 1) * 3 + i), 0, ',');
    }
    return strPre.reverse().join('') + floatStr;
}

/**
 * 自动加...  汉字当成两个算
 * @param str
 * @param len
 * @returns {*}
 */
export function spliceStringByLength(str, len, hasNoDotted) {
    var strlen = 0;
    var s = '';
    if (!str) {
        return '';
    }
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            strlen += 2;
        } else {
            strlen++;
        }
        s += str.charAt(i);
        if (strlen >= len) {
            if (i == (str.length - 1)) {
                return s;
            }
            return s + (hasNoDotted ? '' : '...');
        }
    }
    return s;
}
// 获取字符长度（中英文）
export function getStrLength(str) {
    var strlen = 0;
    if (!str) {
        return '';
    }
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            strlen += 2;
        } else {
            strlen++;
        }

    }
    return strlen;
}

/**
 * 图片url判断
 */
export function imgUrl(url) {
    if (url) {
        if (url.substr(0, 2) == 'i/') {
            return 'https://yun.lagou.com' + '/' + url;
        } else {
            return 'https://yun.lagou.com' + url;
        }
    } else {
        return '';
    }
}
/**
 * 根据姓名切割返回名字
 * sdfa中  => 中
 *
 */
/*
*   len传入参数为需要截断的长度
*   有中文就取最后的中文，有两个取两个，有一个取一个
*   没有中文 就取头两个字母 ，长度不够就取一个
* */
export function splitName(name, len) {
    var len = len || 2;
    if (!name) return '';
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]+/g;
    name = String(name);
    var rs = name.match(reg);
    if (rs && rs.length > 0) {
        var result = rs[rs.length - 1];
        return result.substr(((result.length - len) < 0 ? 0 : (result.length - len)), len || 2);
    } else {
        return name.substr(0, 2);
    }
}


/**
*
*  Base64 encode / decode
 *  base64.encode(string) //给制定的string编码
 *  base64.decode(string) //对已经编码的string解码
*/

export const base64 = new Base64();

function Base64() {
    // 一般的Base64编码字符
    var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    // Base64解码用到的映射表，兼容一般编码的Base64和针对URL进行扩展编码的Base64
    var base64DecodeChars = new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);


    this.encode = function(str) {
        // 普通 Base64 编码
        return base64encode(utf16to8(str));
    };
    this.decode = function(str) {
        // 兼容的 Base64 解码
        return utf8to16(base64decode(str));
    };

    /** 通用的Base64编码函数
     * str为待编码的串
     * isUrl用来表明编码的对象(str)是否是一个URL
     */
    function base64encode(str) {
        var out;


        var i;


        var len;
        var c1;


        var c2;


        var c3;
        len = str.length;
        i = 0;
        out = '';
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len)
            {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += '==';
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len)
            {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += '=';
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    /**
     * Base64解码函数
     * @param str
     * @returns {*}
     */
    function base64decode(str) {
        var c1;


        var c2;


        var c3;


        var c4;
        var i;


        var len;


        var out;
        len = str.length;
        i = 0;
        out = '';
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1) break;
            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1) break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61) return out;
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1) break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61) return out;
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1) break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }

    /**
     * 把 unicode 码转换成 utf8 编码
     * @param str
     * @returns {string}
     */
    function utf16to8(str) {
        var out;


        var i;


        var len;


        var c;
        out = '';
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    /**
     * 把 utf8 编码转换成 unicode 码
     * @param str
     * @returns {string}
     */
    function utf8to16(str) {
        var out;


        var i;


        var len;


        var c;
        var char2;


        var char3;
        out = '';
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4)
            {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12: case 13:
                    // 110x xxxx 10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx 10xx xxxx 10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }

}

// 时间格式应该 20180227T170522+0800

// 简写时间（带time）
// 今天24点前：今天 hh:mm
// 明天0点~24点：明天 hh:mm
// else：X天后 hh:mm
// ——————以上是未来时间，以下是过去时间————
// 1分钟内：刚刚
// 1小时内：X分钟前
// 24小时内：X小时前
// 24小时外：昨天 hh:mm
// 昨天0点以前：前天 hh:mm
// 30天内：X天前 hh:mm
// 30天前：YYYY-MM-DD hh:mm
export function formateTimeWithTime(dateTime) {
    if (!dateTime) {
        return '';
    }
    function getDatStartEnd(date) {
        var Start = new Date(date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' 00:00:00').getTime();
        var End = new Date(date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' 23:59:59').getTime();
        return { Start, End };
    }
    function GetDateStr(AddDayCount, current) {
        var dd = current || new Date();
        dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1; // 获取当前月份的日期
        var d = dd.getDate();
        return y + '-' + m + '-' + d;
    }
    function getDatStartEnd2(date) {
        var Start = new Date(date.getFullYear() + '/' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '/' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' 00:00:00').getTime();
        var End = new Date(date.getFullYear() + '/' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '/' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' 23:59:59').getTime();
        return { Start, End };
    }
    function GetDateStr2(AddDayCount, current) {
        var dd = current || new Date();
        dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1; // 获取当前月份的日期
        var d = dd.getDate();
        return y + '/' + m + '/' + d;
    }

    var result = '';
    var nowTime = new Date().getTime();
    var today = getDatStartEnd(new Date());
    var next = getDatStartEnd2(new Date(GetDateStr2(+1)));
    var pre = getDatStartEnd(new Date(GetDateStr(-1)));
    var prePre = getDatStartEnd(new Date(GetDateStr(-2)));
    var prePreTen = getDatStartEnd(new Date(GetDateStr(-29)));
    var tempDataTime = new Date(
        window.parseInt(dateTime.substr(0, 4)),
        window.parseInt(dateTime.substr(4, 2)) - 1,
        window.parseInt(dateTime.substr(6, 2)),
        window.parseInt(dateTime.substr(9, 2)),
        window.parseInt(dateTime.substr(11, 2)),
        window.parseInt(dateTime.substr(13, 2)),
    );
    var temp = tempDataTime.getTime();
    var HHMM = dateTime.substr(9, 2) + ':' + dateTime.substr(11, 2);
    if (Math.ceil((nowTime - temp) / (1000 * 60)) < 2 && Math.ceil((nowTime - temp) / (1000 * 60)) > 0) {
        result = '刚刚';
        return result;
    }
    if (((nowTime - temp) / (1000 * 60)) < (60) && ((nowTime - temp) / (1000 * 60)) > 0) {
        result = Math.ceil((nowTime - temp) / (1000 * 60)) + '分钟前';
        return result;
    }
    if (((nowTime - temp) / (1000 * 60 * 60)) < 24 && ((nowTime - temp) / (1000 * 60 * 60)) > 0) {
        result = Math.ceil((nowTime - temp) / (1000 * 60 * 60)) + '小时前';
        return result;
    }
    if (today.Start <= temp && temp <= today.End) {
        result = '今天' + HHMM;
        return result;
    }
    if (next.Start <= temp && temp <= next.End) {
        result = '明天' + HHMM;
        return result;
    }
    if (pre.Start < temp && temp < pre.End) {
        result = '昨天' + HHMM;
        return result;
    }
    if (prePre.Start < temp && temp < prePre.End) {
        result = '前天' + HHMM;
        return result;
    }
    if (prePreTen.Start < temp) {
        var days = Math.ceil((new Date().getTime() - temp) / (60 * 60 * 1000 * 24));
        result = days + '天前' + HHMM;
        return result;
    }
    return [
        window.parseInt(dateTime.substr(0, 4)),
        window.parseInt(dateTime.substr(4, 2)),
        window.parseInt(dateTime.substr(6, 2)),
    ].join('-') + ' ' + HHMM;
}

// 防xss攻击的过滤html代码的工具
require('../../static/js/xss');
const filterXSSOptions = { whiteList: { div: ['style', 'data-index', 'class'], u: ['style', 'class'], b: ['style', 'class'], ul: ['style', 'class'], ol: ['style', 'class'], li: ['style', 'class'], br: ['style', 'class'], a: ['href', 'class', 'target', 'style', 'class'], img: ['src', 'alt', 'class', 'data-mds-key', 'data-*'], p: ['title', 'class', 'style'], b: ['style', 'class'], span: ['style', 'class'] } };

/**
 * 字符转义显示处理,同时做了xss攻击防护
 * @param str
 * @returns {string|string}
 */
export function changeEntitiesToNormal(str) {
    var a = document.createElement('div');
    a.innerHTML = filterXSS(str || '', filterXSSOptions);
    let result = a.textContent || '';
    a = null;
    return result;
}


export function escapeText(s) {
    if (!s) {
        return '';
    }
    s = String(s);
    // Both single quotes and double quotes (for attributes)
    return s.replace(/&(#039|lt|gt|amp|nbsp|quot|cent|pound|yen|euro|sect|copy|reg|trade|times|divide);/g, function(s) {
        switch (s) {
            case '&lt;':
                return '<';
            case '&gt;':
                return '>';
            case '&amp;':
                return '&';
            case '&quot;':
                return '"';
            case '&cent;':
                return '￠';
            case '&pound;':
                return '£';
            case '&yen;':
                return '¥';
            case '&euro;':
                return '€';
            case '&sect;':
                return '§';
            case '&copy;':
                return '©';
            case '&reg;':
                return '®';
            case '&trade;':
                return '™';
            case '&times;':
                return '×';
            case '&divide;':
                return '÷';
            case '&#039;':
                return '\'';
            case '&nbsp;':
                return ' ';
        }
    });
}