import getRandom from './getRandom.jsx';
import { Serialize } from './string.jsx';
import { locationOpts } from './url.jsx';
/**
 * 跨域请求
 * @param options
 *
    import {jsonp} from '../../../common/components/Utils/jsonp.jsx';

    jsonp({
        url:'https://activity.lagou.com/activityapi/lamp/getJZPositionList',
        success: function (result) {
            debugger;
        },
        data:{user:11}
    });
 */
export function jsonp(options) {
    var randomId = getRandom();
    let CallBackName = options.callback || 'callback' + randomId;
    let scriptName = 'script' + randomId;
    let boxName = 'box' + randomId;
    window[CallBackName] = function (data) {
        options.success(data);
    };
    let currentRequest = document.createElement('div');
    currentRequest.setAttribute('id', boxName);
    document.body.appendChild(currentRequest);
    var queryUrl = locationOpts.reset(options.url);
    var params = options.data || {};
    params[options.callback || 'jsoncallback'] = CallBackName;
    let script = document.createElement('script');
    script.id = scriptName;
    script.name = scriptName;
    script.src = queryUrl.getFullUrl() + (Serialize(params) ? ('?' + Serialize(params)) : '');
    document.head.appendChild(script);
}



export function jsonpIframe(options) {
    var randomId = getRandom();
    let CallBackName = options.callback || 'callback' + randomId;
    let formName = 'form' + randomId;
    let iframeName = 'iframe' + randomId;
    let boxName = 'box' + randomId;
    window[CallBackName] = function (data) {
        options.success(data);
    };
    let currentRequest = document.createElement('div');
    currentRequest.setAttribute('id', boxName);
    document.body.appendChild(currentRequest);
    let iframe = getIframeByName(iframeName);
    var queryUrl = locationOpts.reset(options.url);
    var params = options.data || {};
    params[options.callback || 'jsoncallback'] = CallBackName;
    let form =  getFormByKeys(params, formName, formName, queryUrl.getFullUrl(), iframeName);
    currentRequest.appendChild(iframe);
    currentRequest.appendChild(form);
    iframe.onload = function () {

        window[CallBackName](iframe);
    };

    form.submit();
}

/**
 *通过相关参数获取form表单
 * @param params
 * @param name
 * @param id
 * @param url
 * @param target
 * @returns {Element}
 */
function getFormByKeys(params, name, id, url, target) {
    let form = document.createElement('form');
    form.setAttribute('name', name);
    form.setAttribute('id', id);
    form.setAttribute('action', url);
    form.setAttribute('target', target || '_blank');
    var itemsText = '';
    for (var item in params) {
        if (typeof params[item] != 'function') {
            itemsText += '<input value="' + params[item] + '" name="' + item + '" />';
        }
    }
    form.innerHTML = itemsText || '';
    return form;
}



/*
* 通过id删除form表单
* */
export function delForm(element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}



/**
 * 获取一个iframe元素
 * @param name
 */
function getIframeByName(name) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('id', name);
    iframe.setAttribute('name', name);
    iframe.setAttribute('width', 0);
    iframe.setAttribute('height', 0);
    iframe.style.display = 'none';
    return iframe;
}

