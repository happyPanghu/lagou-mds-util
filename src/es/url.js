import React from 'react';
import defaultHead from '../../../common/static/img/default_photo.png';
/**
 * import {locationOpts} from  '../../common/components/Utils/url'; 在文件中引用
 * console.log(locationOpts.get('id'));  获取url里制定的参数
 * locationOpts.p 获取链接上的所有参数
 * console.log(locationOpts.set('id','3453453453',true)); 设置url里面的参数 存在会是修改  不存在是添加 第三个参数是是否设置参数时候就直接更新url 默认是不更新url的
 * console.log(locationOpts.set('id','3453453453')); 默认是不更新url的
 * console.log(locationOpts.has('id')); 返回true 或 false
 * console.log(locationOpts.del('id',true)); 第二个参数是是否删除参数时候就直接更新url 默认是不更新url的
 * locationOpts.UpdateUrl();
 */
export var locationOpts = locationOpts();

function getSearchQs() {
    if (history && (typeof history.replaceState == 'function')) {
        return location.search;
    } else {
        var result = '';
        result += location.search && location.search.substr(1) || '';
        result && (result += '&');
        result += (window.location.hash && window.location.hash.substr(1)) || '';
        return '#' + result;
    }
}

function locationOpts(qs) {
    // 对href做特殊处理、对于单页面应用有些浏览器获取不到id、mode，暂时处理，后续通
    var obj = {};
    obj.p = {};
    obj.reset = function (qs, isUpdateUrl) {
        if (!qs) {
            qs = getSearchQs();
        }
        if (qs) {
            obj.p = {};
            var b = qs.indexOf((history && (typeof history.replaceState == 'function')) && '?' || '#');
            b > -1 ? (obj._url = qs.substr(0, b)) : (obj._url = qs);
            qs = qs.substr(b + 1);
            if (qs.length > 0 && b > -1) {
                let tmp = false;
                // qs = qs.replace(/\+/g, ' ');     暂时注释掉
                var list = qs.split('&');
                for (var i = 0; i < list.length; i++) {
                    var n = list[i].substr(0, list[i].indexOf('='));
                    var v = list[i].substr(list[i].indexOf('=') + 1);
                    v && (obj.p[n] = decodeURIComponent(v));
                    (tmp == false) && !v && (tmp = true);
                }
                if (tmp) {
                    this.UpdateUrl();
                }
            }
            if (isUpdateUrl) {
                this.UpdateUrl(obj._url);
            }
        }
        return this;
    };
    obj.getFullUrl = function () {
        return this._url + this.toStrUrlP();
    };

    obj.set = function (name, value, isUpdateUrl) {
        this.p[name] = value;
        if (isUpdateUrl) {
            this.UpdateUrl();
        }
        return this;
    };
    // 跟新数组形式的url
    obj.setAll = function(params, isUpdateUrl) {
        for (var key in params) {
            this.set(key, params[key]);
        }

        if (isUpdateUrl) {
            this.UpdateUrl();
        }
        return this;
    };

    // 与setAll不同的是  不需要的参数会被删除
    obj.filterAndSetAll = function(params, updateBoolean) {
        this.p = Object.assign(this.p, params);
        Object.keys(this.p)
            .filter(item => !params[item])
            .forEach(item => {
                delete this.p[item];
            });
        if (updateBoolean) this.UpdateUrl();
        return this;
    };

    obj.get = function (name, def) {
        var v = this.p[name];
        return (v != null) ? v : def;
    };
    obj.has = function (name) {
        return this.p[name] != null;
    };
    obj.del = function (name, isUpdateUrl) {
        if (name.constructor == Array) {
            for (var key in name) {
                delete this.p[name[key]];
            }
        } else {
            delete this.p[name];
        }
        if (isUpdateUrl) {
            this.UpdateUrl();
        }
    };
    obj.delAll = function (isUpdateUrl) {
        this.p = {};
        if (isUpdateUrl) {
            this.UpdateUrl();
        }
        return this;
    };
    obj.toStrUrlP = function () {
        var r = '?';
        var a = [];
        var i = 0;
        for (var k in this.p) {
            k ? a[i++] = k + '=' + encodeURIComponent(this.p[k]) : '';
            /* r += k + '=' + this.p[k] + '&'; */
        }

        return ((history && (typeof history.replaceState == 'function')) && r || '') + a.join('&') + ((history && (typeof history.replaceState == 'function')) && (window.location.hash || '') || '');
    };

    obj.updateByUrl = function (url) {
        if (history && (typeof history.replaceState == 'function')) {
            history.replaceState({ id: 'yun.lagou.com' }, '候选人', url);
            // history.pushState({id: 'yun.lagou.com'}, '候选人', url + this.toStrUrlP());
        } else {
            var paramsStr = this.toStrUrlP();
            document.location.hash = paramsStr;
        }
    };

    obj.UpdateUrl = function (BaseUrl, replace) {
        var url = BaseUrl || window.location.protocol + '//' + window.location.host + window.location.pathname;

        if (history && (typeof history.replaceState == 'function')) {
            history.replaceState({ id: 'yun.lagou.com' }, '候选人', url + this.toStrUrlP());
            // history.pushState({id: 'yun.lagou.com'}, '候选人', url + this.toStrUrlP());
        } else {
            var paramsStr = this.toStrUrlP();
            document.location.hash = paramsStr;
        }
    };
    obj.getParamObj = function() {
        var url = location.search; // 获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf('?') != -1) {
            var str = url.substr(1);
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                var param = strs[i].split('=');
                if (param[1] === 'null' || param[1] === 'undefined') {
                    // 若参数值不为空
                    continue;
                } else {
                    try {
                        theRequest[param[0]] = decodeURIComponent(param[1]);
                    } catch (e) {
                        theRequest[param[0]] = param[1];

                    }
                }
            }
        }
        console.log('thisRequest', theRequest);
        return theRequest;
    };
    obj.reset(qs);
    return obj;
}

// 判断url是否需要前缀
export function formatImgPrefix(str, cdn, compress, extra) {
    if (!str) {
        return '';
    } else {
        return /https?:\/\//.test(str)
            ?
            str
            :
            (
                '//' +
                (cdn ? cdn : 'www.lgstatic.com') +
                '/' +
                (compress ? compress + '/' : '') +
                (extra ? extra : '') +
                str
            )
    }
}

// 获取头像地址
export const getHeadPortrait = (headPortrait) => {

    if (headPortrait.compress) {
        const compressRes = parseInt(headPortrait.compress);
        if (!isNaN(compressRes)) {
            headPortrait.compress = `thumbnail_${compressRes}x${compressRes}`;
        }
    } else {
        headPortrait.compress = false;
    }

    headPortrait = Object.assign({
        url: '',
        cdn: 'www.lgstatic.com',
        compress: '',
        extra: ''
    }, headPortrait);

    if (headPortrait.url) {
        const {url, cdn, compress, extra} = headPortrait;
        return formatImgPrefix(url.replace(/^[\/]+/, ''), cdn, compress, extra);
    } else {
        return defaultHead;
    }
};