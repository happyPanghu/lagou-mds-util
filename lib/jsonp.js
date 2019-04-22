"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonp = jsonp;
exports.jsonpIframe = jsonpIframe;
exports.delForm = delForm;

var _getRandom = _interopRequireDefault(require("./getRandom.jsx"));

var _string = require("./string.jsx");

var _url = require("./url.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
function jsonp(options) {
  var randomId = (0, _getRandom["default"])();
  var CallBackName = options.callback || 'callback' + randomId;
  var scriptName = 'script' + randomId;
  var boxName = 'box' + randomId;

  window[CallBackName] = function (data) {
    options.success(data);
  };

  var currentRequest = document.createElement('div');
  currentRequest.setAttribute('id', boxName);
  document.body.appendChild(currentRequest);

  var queryUrl = _url.locationOpts.reset(options.url);

  var params = options.data || {};
  params[options.callback || 'jsoncallback'] = CallBackName;
  var script = document.createElement('script');
  script.id = scriptName;
  script.name = scriptName;
  script.src = queryUrl.getFullUrl() + ((0, _string.Serialize)(params) ? '?' + (0, _string.Serialize)(params) : '');
  document.head.appendChild(script);
}

function jsonpIframe(options) {
  var randomId = (0, _getRandom["default"])();
  var CallBackName = options.callback || 'callback' + randomId;
  var formName = 'form' + randomId;
  var iframeName = 'iframe' + randomId;
  var boxName = 'box' + randomId;

  window[CallBackName] = function (data) {
    options.success(data);
  };

  var currentRequest = document.createElement('div');
  currentRequest.setAttribute('id', boxName);
  document.body.appendChild(currentRequest);
  var iframe = getIframeByName(iframeName);

  var queryUrl = _url.locationOpts.reset(options.url);

  var params = options.data || {};
  params[options.callback || 'jsoncallback'] = CallBackName;
  var form = getFormByKeys(params, formName, formName, queryUrl.getFullUrl(), iframeName);
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
  var form = document.createElement('form');
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


function delForm(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}
/**
 * 获取一个iframe元素
 * @param name
 */


function getIframeByName(name) {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('id', name);
  iframe.setAttribute('name', name);
  iframe.setAttribute('width', 0);
  iframe.setAttribute('height', 0);
  iframe.style.display = 'none';
  return iframe;
}