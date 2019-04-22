;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Util = factory();
  }
}(this, function() {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatData = formatData;
exports.getArray = getArray;
exports.contain = contain;
exports.subset = subset;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function formatData(data) {
  if (typeof data === 'string') {
    var obj = null;
    fetch(data).then(function (response) {
      return response.json();
    }).then(function (res) {
      if (res.state === 1) {
        obj = res;
      }
    }).done();
    return obj;
  } else {
    return getArray(data);
  }
}

function getArray(arr) {
  if (arr.length === 0) {
    return [];
  }

  arr = arr.map(function (item) {
    if (_typeof(item) !== 'object') {
      return {
        text: item,
        value: item
      };
    } else {
      return item;
    }
  });
  return arr;
}

function contain(arr, item) {
  if (!(arr instanceof Array)) {
    return false;
  }

  for (var i in arr) {
    return arr[i] === item ? true : false;
  }
} // 判断一个字符串数组是否另一个字符串数组的子集
// ['a', 'b'] in ['a', 'b', 'c'] => true
// ['a', 'b', '!c'] in ['a', 'b', 'c'] => false


function subset(current, target) {
  if (!(current instanceof Array)) {
    if (current[0] === '!') {
      return target.indexOf(current.slice(1)) < 0;
    }

    return target.indexOf(current) > -1;
  }

  return current.reduce(function (res, item) {
    var currentRes;

    if (item[0] === '!') {
      currentRes = target.indexOf(item.slice(1)) < 0;
    } else {
      currentRes = target.indexOf(item) > -1;
    }

    return res && currentRes;
  }, true);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browerCheck = void 0;
var browerCheck = {
  isWin32: navigator.platform == 'Win32' ? true : false,
  isWindows: navigator.platform == 'Windows' ? true : false,
  isWin2000: /Windows NT 5.0/i.test(navigator.userAgent) ? true : false,
  isWinXP: /Windows NT 5.1/i.test(navigator.userAgent) ? true : false,
  isWin2003: /Windows NT 5.2/i.test(navigator.userAgent) ? true : false,
  isWinVista: /Windows NT 6.0/i.test(navigator.userAgent) ? true : false,
  isWin7: /Windows NT 6.1/i.test(navigator.userAgent) ? true : false,
  isMac: /Mac/i.test(navigator.userAgent) ? true : false,
  isUnix: navigator.platform == 'X11' ? true : false,
  isLinux: /Linux/i.test(navigator.userAgent) ? true : false,
  isAndorid: /Linux/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent.toLowerCase()) ? true : false,
  isWeixin: navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' ? true : false,
  isOpera: navigator.userAgent.indexOf('Opera') > -1 ? true : false,
  isFirefox: navigator.userAgent.indexOf('Firefox') > -1 ? true : false,
  isChrome: navigator.userAgent.indexOf('Chrome') > -1 ? true : false,
  isSafari: navigator.userAgent.indexOf('Safari') > -1 ? true : false,
  isIE: navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1 && !(navigator.userAgent.indexOf('Opera') > -1) ? true : false,
  is360: is360()
};
exports.browerCheck = browerCheck;

function is360() {
  // application/vnd.chromium.remoting-viewer 可能为360特有
  var is360 = _mime('type', 'application/vnd.chromium.remoting-viewer');

  if (isChrome() && is360) {
    is360 = true;
  }

  return is360;
} // 检测是否是谷歌内核(可排除360及谷歌以外的浏览器)


function isChrome() {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('chrome') > 1;
} // 测试mime


function _mime(option, value) {
  var mimeTypes = navigator.mimeTypes;

  for (var mt in mimeTypes) {
    if (mimeTypes[mt][option] == value) {
      return true;
    }
  }

  return false;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.channelsMap = void 0;
var channelsMap = {
  LAGOU: '拉勾网',
  ZHILIAN: '智联招聘',
  JOB_51: '前程无忧',
  LIEPIN: '猎聘网',
  LOCAL: '本地人才库',
  NEITUI: '内部推荐',
  BOSS_ZHIPIN: 'BOSS直聘',
  TONGCHENG_58: '58同城',
  CHINAHR: '中华英才',
  DAJIE: '大街网',
  KANZHUN: '看准网',
  GANJI: '赶集网',
  PAIDAI: '派代招聘',
  HAITOU: '海投网',
  MAIMAI: '脉脉',
  ZHILIAN_ZHUOPIN: '智联卓聘'
};
exports.channelsMap = channelsMap;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.docCookies = void 0;
var docCookies = {
  getItem: function getItem(sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  },
  setCookie: function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }

    var sExpires = '';

    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
          break;

        case String:
          sExpires = '; expires=' + vEnd;
          break;

        case Date:
          sExpires = '; expires=' + vEnd.toUTCString();
          break;
      }
    }

    document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
    return true;
  },
  removeItem: function removeItem(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }

    document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
    return true;
  },
  hasItem: function hasItem(sKey) {
    return new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(document.cookie);
  },
  keys: function keys() {
    /* optional method: you can safely remove it! */
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);

    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }

    return aKeys;
  }
};
exports.docCookies = docCookies;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToClipboard = CopyToClipboard;
exports.CreateElementForExecCommand = CreateElementForExecCommand;
exports.SelectContent = SelectContent;
exports["default"] = void 0;

// clipboard
function CopyToClipboard(textToClipboard) {
  var success = true; // Internet Explorer

  if (window.clipboardData) {
    window.clipboardData.setData('Text', textToClipboard);
  } else {
    // create a temporary element for the execCommand method
    var forExecElement = CreateElementForExecCommand(textToClipboard);
    /* Select the contents of the element
     (the execCommand for 'copy' method works on the selection) */

    SelectContent(forExecElement);
    var supported = true; // UniversalXPConnect privilege is required for clipboard access in Firefox

    try {
      if (window.netscape && netscape.security) {
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
      } // Copy the selected content to the clipboard
      // Works in Firefox and in Safari before version 5


      success = document.execCommand('copy', false, null);
    } catch (e) {
      success = false;
    } // remove the temporary element


    document.body.removeChild(forExecElement);
  }

  if (success) {
    alert('复制成功');
  } else {
    alert('复制失败，请手动复制该链接');
  }
}

console.log(1);

function CreateElementForExecCommand(textToClipboard) {
  var forExecElement = document.createElement('div'); // place outside the visible area

  forExecElement.style.position = 'absolute';
  forExecElement.style.left = '-10000px';
  forExecElement.style.top = '-10000px'; // write the necessary text into the element and append to the document

  forExecElement.textContent = textToClipboard;
  document.body.appendChild(forExecElement); // the contentEditable mode is necessary for the  execCommand method in Firefox

  forExecElement.contentEditable = true;
  return forExecElement;
}

function SelectContent(element) {
  // first create a range
  var rangeToSelect = document.createRange();
  rangeToSelect.selectNodeContents(element); // select the contents

  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(rangeToSelect);
}

function f() {
  console.log(1);
}

var Copy = {
  CopyToClipboard: CopyToClipboard,
  CreateElementForExecCommand: CreateElementForExecCommand,
  SelectContent: SelectContent
};
var _default = Copy;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var deepCopy = function deepCopy(obj) {
  // Handle the 3 simple types, and null or undefined
  if (obj == null || 'object' != _typeof(obj)) return obj; // Handle Date

  if (obj instanceof Date) {
    var copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  } // Handle Array


  if (obj instanceof Array) {
    var copy = [];

    for (var i = 0, len = obj.length; i < len; ++i) {
      copy[i] = deepCopy(obj[i]);
    }

    return copy;
  } // Handle Object


  if (obj instanceof Object) {
    var copy = {};

    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepCopy(obj[attr]);
      }
    }

    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

var _default = deepCopy;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.hasClass = hasClass;
exports.removeSiblingsClass = removeSiblingsClass;
exports.isClickInner = isClickInner;
exports.getCSSAttr = getCSSAttr;
exports.getText = getText;
exports.setText = setText;
exports.getpageX = getpageX;
exports.getpageY = getpageY;
exports.throttle = throttle;
exports.debounce = debounce;
exports.closest = closest;

/**
 * 常用dom操作
 */
function addClass(ele, className) {
  var currClass = ele.getAttribute('class');
  var classArr = currClass ? currClass.split(' ') : [];
  var index = classArr.indexOf(className);

  if (index === -1) {
    classArr.push(className);
  }

  var newClass = classArr.join(' ');
  ele.setAttribute('class', newClass);
}

function removeClass(ele, className) {
  var currClass = ele.getAttribute('class');
  var classArr = currClass ? currClass.split(' ') : [];
  var index = classArr.indexOf(className);

  if (index > -1) {
    classArr.splice(index, 1);
  }

  var newClass = classArr.join(' ');
  ele.setAttribute('class', newClass);
}

function hasClass(ele, className) {
  var classArr = ele.classList || [];
  return classArr.length ? classArr.contains(className) : false;
} // 移除兄弟元素的className，并给自己加上className


function removeSiblingsClass(ele, className) {
  var parentNode = ele.parentNode;
  var arr = parentNode.children;

  for (var i = 0, len = arr.length; i < len; i++) {
    removeClass(arr[i], className);
  }

  addClass(ele, className);
}

function isClickInner(ele, parentEle) {
  var node = ele.parentNode;

  while (node !== null) {
    if (node == parentEle) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

function getCSSAttr(ele, attr) {
  if (ele.currentStyle) {
    return ele.currentStyle[attr];
  } else {
    return document.defaultView.getComputedStyle(ele, null)[attr];
  }
}

function getText(ele) {
  return typeof ele.textContent == 'string' ? ele.textContent : ele.innerText;
}

function setText(ele, text) {
  if (ele.textContent) {
    ele.textContent = text;
  } else {
    ele.innerText = text;
  }
}
/**
 * 获取制定元素左上角距离window左侧的距离
 * @param elem
 * @returns {*}
 */


function getpageX(elem) {
  // 检查我们是否已经到了根元素
  return elem.offsetParent ? // 如果我们还能往上，则将当前偏移与向上递归的值相加
  elem.offsetLeft + getpageX(elem.offsetParent) : // 否则，取当前偏移
  elem.offsetLeft;
}
/**
 * 获取制定元素左上角距离window顶部的距离
 * @param elem
 * @returns {*}
 */
// 计算元素的Y(垂直，顶)位置


function getpageY(elem) {
  // 检查我们是否已经到了根元素
  return elem.offsetParent ? // 如果我们还能往上，则将当前偏移与向上递归的值相加
  elem.offsetTop + getpageY(elem.offsetParent) : // 否则，取当前偏移
  elem.offsetTop;
} // 函数节流 隔 wait 后执行
// 应用于window的scroll事件，resize事件以及普通元素的mousemove事件，因为这些事件由于鼠标或滚轮操作很频繁，会导致回调连续触发


function throttle(fn, threshhold) {
  var last;
  var timer;
  threshhold || (threshhold = 250);
  return function () {
    var context = this;
    var args = arguments;
    var now = Number(new Date()); // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时

    if (last && now < last + threshhold) {
      clearTimeout(timer); // 保证在当前时间区间结束后，再执行一次 fn

      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold); // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
} // 函数节流 在 delay 后执行
// 用户频繁操作，比如 监听keyUp,keyDown,keyPress,resize等事件


function debounce(func, delay) {
  var timer = null;
  return function () {
    var self = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      return typeof func === 'function' && func.apply(self, args);
    }, delay);
  };
}
/**
 * 查询最近的元素
 * @param source
 * @param selector
 * @returns {*}
 */


function closest(source, selector) {
  if (!source || !selector) {
    return null;
  }

  window.Element && function (ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.msMatchesSelector || function (selector) {
      var node = window;
      var nodes = (node.parentNode || node.document).querySelectorAll(selector);
      var i = -1;

      while (nodes[++i] && nodes[i] != node) {
        ;
      }

      return !!nodes[i];
    };
  }(Element.prototype); // closest polyfill

  window.Element && function (ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest || function (selector) {
      var el = this;

      while (el.matches && !el.matches(selector)) {
        el = el.parentNode;
      }

      return el.matches ? el : null;
    };
  }(Element.prototype);
  return source.closest(selector);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var eventProxy = {
  onObj: {},
  oneObj: {},
  on: function on(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }

    this.onObj[key].push(fn);
  },
  one: function one(key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }

    this.oneObj[key].push(fn);
  },
  off: function off(key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },
  trigger: function trigger() {
    var key;
    var args;

    if (arguments.length == 0) {
      return false;
    }

    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      for (var i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }

    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      for (var _i in this.oneObj[key]) {
        this.oneObj[key][_i].apply(null, args);

        this.oneObj[key][_i] = undefined;
      }

      this.oneObj[key] = [];
    }
  }
};
var _default = eventProxy;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fetch;

// 用原生js封装 XHR
// 创建XML对象 忽略IE6 及其以下 浏览器
function createXHR() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    throw new Error('浏览器版本过低或不支持XHR对象');
  }
} // 将传送的数据 url参数化


function getURLParmas(data) {
  var a = [];
  var i = 0;

  for (var k in data) {
    k ? a[i++] = k + '=' + data[k] : '';
  }

  return a.join('&');
}

function fetch(obj) {
  var xhr = createXHR();
  obj.async = obj.async || true;
  obj.data = getURLParmas(obj.data);

  if (obj.method.toLowerCase() === 'get') {
    obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
  }

  if (obj.async === true) {
    // true表示异步，false表示同步 //使用异步调用的时候，需要触发readystatechange 事件
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        // 判断对象的状态是否交互完成
        callback();
      }
    };
  }

  xhr.open(obj.method, obj.url, obj.async); // 默认异步

  if (obj.method.toLowerCase() === 'post') {
    // post方式需要自己设置http的请求头，来模仿表单提交。
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send(obj.data);
  } else {
    xhr.send(null);
  }

  if (obj.async === false) {
    // 同步
    callback();
  }

  function callback() {
    if (xhr.status == 200) {
      // 判断http的交互是否成功，200表示成功
      obj.success(JSON.parse(xhr.responseText)); // 回调传递参数
    } else {// console.log('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
      }
  }
} // 用法：

/**
ajax({
    method : 'post',
    url : 'demo.php',
    data : {
        'name' : 'JR',
        'age' : 22
    },
    success : function (message) {
        alert(message);
    }
});

*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shenceErrorData = shenceErrorData;
exports.fetchCatch = fetchCatch;
exports.fetchData = fetchData;

var _Modal = _interopRequireDefault(require("../Modal"));

var _string = require("./string.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Confirm = _Modal["default"].confirm;

function shenceErrorData(data) {
  typeof sa != 'undefined' && sa.track('ZHAOPIN_FRONTEND_ERROR', {
    createCompanyMethod: '候选人_前端_错误',
    company_Name: document.querySelector('#UserConpany') && document.querySelector('#UserConpany').value,
    company_ShortName: document.querySelector('#UserConpanyShortName') && document.querySelector('#UserConpanyShortName').value,
    company_ID: document.querySelector('#UserConpanyId') && document.querySelector('#UserConpanyId').value,
    _user_ID: document.querySelector('#UserId') && document.querySelector('#UserId').value,
    current_page: window.location.href,
    error_message: typeof data != 'undefined' && data.message,
    error_stack: typeof data != 'undefined' && data.stack
  });
}

function fetchCatch(fetchObj, catchCallback) {
  return fetchObj["catch"](function (e) {
    console.log(e); // shenceErrorData(e);

    catchCallback && catchCallback(e); // const sysConfirm = Confirm({
    //    content:'页面已失效，请刷新后重试',
    //    onOK:()=>{
    //        window.location.reload();
    //        sysConfirm.destroy();
    //    },
    //    okText:'确定',
    //    onlyOKBtn:true
    // })
  });
}

function fetchData(action, path, data, type, code) {
  return function (dispatch) {
    if (type === 'post') {
      return fetchCatch(fetch("".concat(path), {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Anit-Forge-Code': window.X_Anti_Forge_Code || '',
          'X-Anit-Forge-Token': window.X_Anti_Forge_Token || ''
        },
        body: (0, _string.Serialize)(data)
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        res.submitCode && (window.X_Anti_Forge_Code = res.submitCode);
        res.submitToken && (window.X_Anti_Forge_Token = res.submitToken);
        return dispatch(action(res, data));
      }));
    } else {
      return fetchCatch(fetch("".concat(path, "?").concat((0, _string.Serialize)(data)), {
        headers: {
          'X-Anit-Forge-Code': window.X_Anti_Forge_Code || '',
          'X-Anit-Forge-Token': window.X_Anti_Forge_Token || ''
        },
        credentials: 'include'
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        if (code == undefined) {
          res.submitCode && (window.X_Anti_Forge_Code = res.submitCode);
          res.submitToken && (window.X_Anti_Forge_Token = res.submitToken);
        }

        if (parseInt(res.state, 10) === 1997) {
          var sysConfirm = Confirm({
            content: '页面已失效，请刷新后重试',
            onOK: function onOK() {
              window.location.reload();
              sysConfirm.destroy();
            },
            okText: '确定',
            onlyOKBtn: true
          });
        }

        return dispatch(action(res, data));
      }));
    }
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormByKeys = getFormByKeys;
exports.delForm = delForm;

var _string = require("./string.jsx");

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
  form.setAttribute('target', target || '_blank'); // var itemsText = '';

  for (var item in params) {
    if (typeof params[item] != 'function' && params[item] != undefined) {
      if (params[item].constructor == Object) {
        // itemsText += '<input value="'+ Serialize(params[item])+'" name="'+item+'" />'
        var newInput = document.createElement('input');
        newInput.name = item;
        newInput.value = JSON.stringify(params[item]);
        form.appendChild(newInput);
      } else {
        var _newInput = document.createElement('input');

        _newInput.name = item;
        _newInput.value = params[item];
        form.appendChild(_newInput); // itemsText += '<input value="'+params[item]+'" name="'+item+'" />'
      }
    }
  } // itemsText += '<input type="submit" name="submit" value="Sumbit" />';


  var inputSubmit = document.createElement('input');
  inputSubmit.name = 'submit';
  inputSubmit.value = 'Sumbit';
  inputSubmit.type = 'submit';
  form.appendChild(inputSubmit); // form.innerHTML += itemsText||'';

  return form;
}
/*
 * 通过id删除form表单
 * */


function delForm(element) {
  if (element != undefined && element.parentNode) {
    var toDel = element;
    element.parentNode.removeChild(toDel);
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRandom;

/**
 * 返回随机数
 */
function getRandom(digit) {
  window._CASH_RANDOM ? '' : window._CASH_RANDOM = {};

  var _cash_random = window._CASH_RANDOM || {};

  var _digit = digit || 4;

  var _random = getRandomSimple();

  while (_cash_random[_random]) {
    _random = getRandomSimple();
    if (!_cash_random[_random]) break;
  }

  window._CASH_RANDOM[_random] = _random;
  return _random; // 随即返回随机数  --  可能重复

  function getRandomSimple() {
    var random = '';

    for (var i = 0; i < _digit; i++) {
      var r = Math.floor(Math.random() * 10);
      random += r.toString();
    }

    return random.toString();
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @param param 传入配置对象
 * @returns string
 */
var keywordHighlight = function keywordHighlight(param) {
  // 初始化参数
  var defaultParam = Object.assign({
    className: '',
    // 自定义传入样式 默认无
    color: '#00B38A',
    // 高亮颜色 默认无className时展示
    keywordList: [],
    // 关键词
    targetString: '' // 待高亮 字符串

  }, param); // 用于临时接收

  var acceptArr = [];
  var targetString = defaultParam.targetString,
      keywordList = defaultParam.keywordList;
  var className = defaultParam.className,
      color = defaultParam.color;

  if (keywordList && keywordList.length) {
    // 特殊字符 是否被目标关键词占用，占用会导致重复匹配造成混乱
    var reservedWordOccupy = keywordList.some(function (item) {
      return '◐◑卍卐'.indexOf(item) > -1;
    });
    if (reservedWordOccupy) return defaultParam.targetString; // 去重

    keywordList = Array.from(new Set(keywordList)); // 冒泡交换位置 存在包含逻辑的字符  长的在前面优先匹配

    for (var i = 0; i < keywordList.length; i++) {
      for (var j = i + 1; j < keywordList.length; j++) {
        if (keywordList[j].includes(keywordList[i])) {
          var temp = keywordList[i];
          keywordList[i] = keywordList[j];
          keywordList[j] = temp;
        }
      }
    }

    try {
      // 匹配所有html标签
      var htmlReg = new RegExp('\<.*?\>', 'i'); // 替换HTML标签 并临时存储

      for (var _i = 0; true; _i++) {
        var regRes = htmlReg.exec(targetString);

        if (regRes) {
          acceptArr.push(regRes);
        } else {
          break;
        }

        targetString = targetString.replace(regRes, _i % 2 ? '◐' : '◑');
      } // 替换关键字


      keywordList.forEach(function (item) {
        var formatItem = item.replace(/(\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/)/g, '\\$1');
        var reg = new RegExp(formatItem, 'img');
        targetString = targetString.replace(reg, '卍$&卐');
      }); // 还原原始标签

      acceptArr.forEach(function (item, i) {
        var regStr = i % 2 ? '◐' : '◑';
        var reg = new RegExp(regStr, 'mg');
        targetString = targetString.replace(reg, item);
      }); // 关键字添加样式

      return targetString.replace(/卍/ig, "<span ".concat(className ? "class=\"".concat(className, "\"") : "style=\"color: ".concat(color, "\""), ">")).replace(/卐/ig, '</span>');
    } catch (e) {
      return defaultParam.targetString;
    }
  } else {
    if (targetString) {
      return defaultParam.targetString;
    } else {
      throw new Error('必须要有目标参数!');
    }
  }
};

var _default = keywordHighlight;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookie = exports.copy = exports.array = void 0;

var array = _interopRequireWildcard(require("./array"));

exports.array = array;

var copy = _interopRequireWildcard(require("./copy"));

exports.copy = copy;

var cookie = _interopRequireWildcard(require("./cookie"));

exports.cookie = cookie;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// 极验
// 获取key

/**
 *
 * @param obj
 * 主要包含id 必须
 * target 指定对象 可选
 * successCallback  成功回调
 * errorCallback    失败回调
 * target 一般 应与 两种回调互斥
 * @returns {boolean}
 */
var getSenseKey = function getSenseKey(obj) {
  var id = obj.id,
      target = obj.target,
      successCallback = obj.successCallback,
      errorCallback = obj.errorCallback;

  if (typeof initSense !== 'undefined') {
    initSense({
      id: id,
      onError: function onError(err) {
        console.log("\u6781\u9A8CinitSense error: ".concat(err));
      }
    }, function (sense) {
      sense.setInfos(function () {
        return {
          interactive: 1
        };
      }).onSuccess(function (data) {
        if (successCallback) {
          successCallback(data);
        } else {
          target.setState({
            challenge: data.challenge
          });
        }
      }).onClose(function () {
        console.log("\u6781\u9A8ConClose");
      }).onError(function (err) {
        console.log("\u6781\u9A8ConError: ".concat(err));

        if (err && err.code === '1001') {
          if (errorCallback) {
            errorCallback();
          } else {
            target.setState({
              challenge: ''
            });
          }
        }
      });
      sense.sense();
    });
  }
};

var _default = getSenseKey;
exports["default"] = _default;
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocalStorage = setLocalStorage;
exports.getLocalStorage = getLocalStorage;

/**
 * 常用LocalStorage操作
 */

/**
 * 判断对象val 是否等于 {}
 * @param val
 * @returns {boolean}
 */
function setLocalStorage(name, value) {
  if (localStorage && localStorage.setItem && JSON && JSON.stringify) {
    if (typeof value === 'string' || typeof value === 'number') {
      localStorage.setItem(name, value);
    } else {
      localStorage.setItem(name, JSON.stringify(value));
    }
  } else {
    return false;
  }
}

function getLocalStorage(name, needParse) {
  if (localStorage && localStorage.getItem && JSON && JSON.parse) {
    var temp = localStorage.getItem(name);
    var data = {};

    if (typeof temp == 'string') {
      needParse ? data = JSON.parse(temp) : data = temp;
    } else {
      data = JSON.parse(temp);
    }

    return data;
  } else {
    return false;
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function md5cycle(x, k) {
  var a = x[0];
  var b = x[1];
  var c = x[2];
  var d = x[3];
  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);
  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);
  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);
  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);
  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);
}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32(a << s | a >>> 32 - s, b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function md51(s) {
  // Converts the string to UTF-8 "bytes" when necessary
  if (/[\x80-\xFF]/.test(s)) {
    s = unescape(encodeURI(s));
  } // txt = '';


  var n = s.length;
  var state = [1732584193, -271733879, -1732584194, 271733878];
  var i;

  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }

  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (i = 0; i < s.length; i++) {
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  }

  tail[i >> 2] |= 0x80 << (i % 4 << 3);

  if (i > 55) {
    md5cycle(state, tail);

    for (i = 0; i < 16; i++) {
      tail[i] = 0;
    }
  }

  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

function md5blk(s) {
  /* I figured global was faster.   */
  var md5blks = [];
  var i;
  /* Andy King said do it this way. */

  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
  }

  return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n) {
  var s = '';
  var j = 0;

  for (; j < 4; j++) {
    s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];
  }

  return s;
}

function hex(x) {
  for (var i = 0; i < x.length; i++) {
    x[i] = rhex(x[i]);
  }

  return x.join('');
}

var md5 = function md5(s) {
  return hex(md51(s));
};
/* this function is much faster, so if possible we use it. Some IEs are the
 only ones I know of that need the idiotic second function, generated by an
 if clause.  */


function add32(a, b) {
  return a + b & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
  var _add = function _add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
  };
}

var _default = md5;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyObject = isEmptyObject;
exports.smoothScrollY = smoothScrollY;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isEmptyObject(val) {
  if (_typeof(val) === 'object' && !(val instanceof Array)) {
    var hasProp = true;

    for (var prop in val) {
      hasProp = false;
      break;
    }

    return hasProp;
  }
}

function smoothScrollY(obj, time) {
  var timer;

  if (timer) {
    clearInterval(timer);
    timer = null;
  } else {
    timer = setInterval(function (e) {
      if (window.scrollTo) {
        window.scrollTo(0, obj.offsetTop);
      }
    }, time);
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pinyin = Pinyin;

var _oMultiDiff;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**/

/*
     作者:梅雪香
     日期:2006-7-29
     功能:生成与中文字符串相对映的拼音首字母串
     版本: V1.0 alpha
     */
// 汉字拼音首字母列表 本列表包含了20902个汉字,用于配合 ToChineseSpell
// 函数使用,本表收录的字符的Unicode编码范围为19968至40869, XDesigner 整理
var strChineseFirstPY = 'YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY'; // 此处收录了375个多音字,

var oMultiDiff = (_oMultiDiff = {
  '19969': 'DZ',
  '19975': 'WM',
  '19988': 'QJ',
  '20048': 'YL',
  '20056': 'SC',
  '20060': 'NM',
  '20094': 'QG',
  '20127': 'QJ',
  '20167': 'QC',
  '20193': 'YG',
  '20250': 'KH',
  '20256': 'ZC',
  '20282': 'SC',
  '20285': 'QJG',
  '20291': 'TD',
  '20314': 'YD',
  '20340': 'NE',
  '20375': 'TD',
  '20389': 'YJ',
  '20391': 'CZ',
  '20415': 'PB',
  '20446': 'YS',
  '20447': 'SQ',
  '20504': 'TC',
  '20608': 'KG',
  '20854': 'QJ',
  '20857': 'ZC',
  '20911': 'PF'
}, _defineProperty(_oMultiDiff, "20504", 'TC'), _defineProperty(_oMultiDiff, "20608", 'KG'), _defineProperty(_oMultiDiff, "20854", 'QJ'), _defineProperty(_oMultiDiff, "20857", 'ZC'), _defineProperty(_oMultiDiff, "20911", 'PF'), _defineProperty(_oMultiDiff, '20985', 'AW'), _defineProperty(_oMultiDiff, '21032', 'PB'), _defineProperty(_oMultiDiff, '21048', 'XQ'), _defineProperty(_oMultiDiff, '21049', 'SC'), _defineProperty(_oMultiDiff, '21089', 'YS'), _defineProperty(_oMultiDiff, '21119', 'JC'), _defineProperty(_oMultiDiff, '21242', 'SB'), _defineProperty(_oMultiDiff, '21273', 'SC'), _defineProperty(_oMultiDiff, '21305', 'YP'), _defineProperty(_oMultiDiff, '21306', 'QO'), _defineProperty(_oMultiDiff, '21330', 'ZC'), _defineProperty(_oMultiDiff, '21333', 'SDC'), _defineProperty(_oMultiDiff, '21345', 'QK'), _defineProperty(_oMultiDiff, '21378', 'CA'), _defineProperty(_oMultiDiff, '21397', 'SC'), _defineProperty(_oMultiDiff, '21414', 'XS'), _defineProperty(_oMultiDiff, '21442', 'SC'), _defineProperty(_oMultiDiff, '21477', 'JG'), _defineProperty(_oMultiDiff, '21480', 'TD'), _defineProperty(_oMultiDiff, '21484', 'ZS'), _defineProperty(_oMultiDiff, '21494', 'YX'), _defineProperty(_oMultiDiff, '21505', 'YX'), _defineProperty(_oMultiDiff, '21512', 'HG'), _defineProperty(_oMultiDiff, '21523', 'XH'), _defineProperty(_oMultiDiff, '21537', 'PB'), _defineProperty(_oMultiDiff, '21542', 'PF'), _defineProperty(_oMultiDiff, '21549', 'KH'), _defineProperty(_oMultiDiff, '21571', 'E'), _defineProperty(_oMultiDiff, '21574', 'DA'), _defineProperty(_oMultiDiff, '21588', 'TD'), _defineProperty(_oMultiDiff, '21589', 'O'), _defineProperty(_oMultiDiff, '21618', 'ZC'), _defineProperty(_oMultiDiff, '21621', 'KHA'), _defineProperty(_oMultiDiff, '21632', 'ZJ'), _defineProperty(_oMultiDiff, '21654', 'KG'), _defineProperty(_oMultiDiff, '21679', 'LKG'), _defineProperty(_oMultiDiff, '21683', 'KH'), _defineProperty(_oMultiDiff, '21710', 'A'), _defineProperty(_oMultiDiff, '21719', 'YH'), _defineProperty(_oMultiDiff, '21734', 'WOE'), _defineProperty(_oMultiDiff, '21769', 'A'), _defineProperty(_oMultiDiff, '21780', 'WN'), _defineProperty(_oMultiDiff, '21804', 'XH'), _defineProperty(_oMultiDiff, '21834', 'A'), _defineProperty(_oMultiDiff, '21899', 'ZD'), _defineProperty(_oMultiDiff, '21903', 'RN'), _defineProperty(_oMultiDiff, '21908', 'WO'), _defineProperty(_oMultiDiff, '21939', 'ZC'), _defineProperty(_oMultiDiff, '21956', 'SA'), _defineProperty(_oMultiDiff, '21964', 'YA'), _defineProperty(_oMultiDiff, '21970', 'TD'), _defineProperty(_oMultiDiff, '22003', 'A'), _defineProperty(_oMultiDiff, '22031', 'JG'), _defineProperty(_oMultiDiff, '22040', 'XS'), _defineProperty(_oMultiDiff, '22060', 'ZC'), _defineProperty(_oMultiDiff, '22066', 'ZC'), _defineProperty(_oMultiDiff, '22079', 'MH'), _defineProperty(_oMultiDiff, '22129', 'XJ'), _defineProperty(_oMultiDiff, '22179', 'XA'), _defineProperty(_oMultiDiff, '22237', 'NJ'), _defineProperty(_oMultiDiff, '22244', 'TD'), _defineProperty(_oMultiDiff, '22280', 'JQ'), _defineProperty(_oMultiDiff, '22300', 'YH'), _defineProperty(_oMultiDiff, '22313', 'XW'), _defineProperty(_oMultiDiff, '22331', 'YQ'), _defineProperty(_oMultiDiff, '22343', 'YJ'), _defineProperty(_oMultiDiff, '22351', 'PH'), _defineProperty(_oMultiDiff, '22395', 'DC'), _defineProperty(_oMultiDiff, '22412', 'TD'), _defineProperty(_oMultiDiff, '22484', 'PB'), _defineProperty(_oMultiDiff, '22500', 'PB'), _defineProperty(_oMultiDiff, '22534', 'ZD'), _defineProperty(_oMultiDiff, '22549', 'DH'), _defineProperty(_oMultiDiff, '22561', 'PB'), _defineProperty(_oMultiDiff, '22612', 'TD'), _defineProperty(_oMultiDiff, '22771', 'KQ'), _defineProperty(_oMultiDiff, '22831', 'HB'), _defineProperty(_oMultiDiff, '22841', 'JG'), _defineProperty(_oMultiDiff, '22855', 'QJ'), _defineProperty(_oMultiDiff, '22865', 'XQ'), _defineProperty(_oMultiDiff, '23013', 'ML'), _defineProperty(_oMultiDiff, '23081', 'WM'), _defineProperty(_oMultiDiff, '23487', 'SX'), _defineProperty(_oMultiDiff, '23558', 'QJ'), _defineProperty(_oMultiDiff, '23561', 'YW'), _defineProperty(_oMultiDiff, '23586', 'YW'), _defineProperty(_oMultiDiff, '23614', 'YW'), _defineProperty(_oMultiDiff, '23615', 'SN'), _defineProperty(_oMultiDiff, '23631', 'PB'), _defineProperty(_oMultiDiff, '23646', 'ZS'), _defineProperty(_oMultiDiff, '23663', 'ZT'), _defineProperty(_oMultiDiff, '23673', 'YG'), _defineProperty(_oMultiDiff, '23762', 'TD'), _defineProperty(_oMultiDiff, '23769', 'ZS'), _defineProperty(_oMultiDiff, '23780', 'QJ'), _defineProperty(_oMultiDiff, '23884', 'QK'), _defineProperty(_oMultiDiff, '24055', 'XH'), _defineProperty(_oMultiDiff, '24113', 'DC'), _defineProperty(_oMultiDiff, '24162', 'ZC'), _defineProperty(_oMultiDiff, '24191', 'GA'), _defineProperty(_oMultiDiff, '24273', 'QJ'), _defineProperty(_oMultiDiff, '24324', 'NL'), _defineProperty(_oMultiDiff, '24377', 'TD'), _defineProperty(_oMultiDiff, '24378', 'QJ'), _defineProperty(_oMultiDiff, '24439', 'PF'), _defineProperty(_oMultiDiff, '24554', 'ZS'), _defineProperty(_oMultiDiff, '24683', 'TD'), _defineProperty(_oMultiDiff, '24694', 'WE'), _defineProperty(_oMultiDiff, '24733', 'LK'), _defineProperty(_oMultiDiff, '24925', 'TN'), _defineProperty(_oMultiDiff, '25094', 'ZG'), _defineProperty(_oMultiDiff, '25100', 'XQ'), _defineProperty(_oMultiDiff, '25103', 'XH'), _defineProperty(_oMultiDiff, '25153', 'PB'), _defineProperty(_oMultiDiff, '25170', 'PB'), _defineProperty(_oMultiDiff, '25179', 'KG'), _defineProperty(_oMultiDiff, '25203', 'PB'), _defineProperty(_oMultiDiff, '25240', 'ZS'), _defineProperty(_oMultiDiff, '25282', 'FB'), _defineProperty(_oMultiDiff, '25303', 'NA'), _defineProperty(_oMultiDiff, '25324', 'KG'), _defineProperty(_oMultiDiff, '25341', 'ZY'), _defineProperty(_oMultiDiff, '25373', 'WZ'), _defineProperty(_oMultiDiff, '25375', 'XJ'), _defineProperty(_oMultiDiff, '25384', 'A'), _defineProperty(_oMultiDiff, '25457', 'A'), _defineProperty(_oMultiDiff, '25528', 'SD'), _defineProperty(_oMultiDiff, '25530', 'SC'), _defineProperty(_oMultiDiff, '25552', 'TD'), _defineProperty(_oMultiDiff, '25774', 'ZC'), _defineProperty(_oMultiDiff, '25874', 'ZC'), _defineProperty(_oMultiDiff, '26044', 'YW'), _defineProperty(_oMultiDiff, '26080', 'WM'), _defineProperty(_oMultiDiff, '26292', 'PB'), _defineProperty(_oMultiDiff, '26333', 'PB'), _defineProperty(_oMultiDiff, '26355', 'ZY'), _defineProperty(_oMultiDiff, '26366', 'CZ'), _defineProperty(_oMultiDiff, '26397', 'ZC'), _defineProperty(_oMultiDiff, '26399', 'QJ'), _defineProperty(_oMultiDiff, '26415', 'ZS'), _defineProperty(_oMultiDiff, '26451', 'SB'), _defineProperty(_oMultiDiff, '26526', 'ZC'), _defineProperty(_oMultiDiff, '26552', 'JG'), _defineProperty(_oMultiDiff, '26561', 'TD'), _defineProperty(_oMultiDiff, '26588', 'JG'), _defineProperty(_oMultiDiff, '26597', 'CZ'), _defineProperty(_oMultiDiff, '26629', 'ZS'), _defineProperty(_oMultiDiff, '26638', 'YL'), _defineProperty(_oMultiDiff, '26646', 'XQ'), _defineProperty(_oMultiDiff, '26653', 'KG'), _defineProperty(_oMultiDiff, '26657', 'XJ'), _defineProperty(_oMultiDiff, '26727', 'HG'), _defineProperty(_oMultiDiff, '26894', 'ZC'), _defineProperty(_oMultiDiff, '26937', 'ZS'), _defineProperty(_oMultiDiff, '26946', 'ZC'), _defineProperty(_oMultiDiff, '26999', 'KJ'), _defineProperty(_oMultiDiff, '27099', 'KJ'), _defineProperty(_oMultiDiff, '27449', 'YQ'), _defineProperty(_oMultiDiff, '27481', 'XS'), _defineProperty(_oMultiDiff, '27542', 'ZS'), _defineProperty(_oMultiDiff, '27663', 'ZS'), _defineProperty(_oMultiDiff, '27748', 'TS'), _defineProperty(_oMultiDiff, '27784', 'SC'), _defineProperty(_oMultiDiff, '27788', 'ZD'), _defineProperty(_oMultiDiff, '27795', 'TD'), _defineProperty(_oMultiDiff, '27812', 'O'), _defineProperty(_oMultiDiff, '27850', 'PB'), _defineProperty(_oMultiDiff, '27852', 'MB'), _defineProperty(_oMultiDiff, '27895', 'SL'), _defineProperty(_oMultiDiff, '27898', 'PL'), _defineProperty(_oMultiDiff, '27973', 'QJ'), _defineProperty(_oMultiDiff, '27981', 'KH'), _defineProperty(_oMultiDiff, '27986', 'HX'), _defineProperty(_oMultiDiff, '27994', 'XJ'), _defineProperty(_oMultiDiff, '28044', 'YC'), _defineProperty(_oMultiDiff, '28065', 'WG'), _defineProperty(_oMultiDiff, '28177', 'SM'), _defineProperty(_oMultiDiff, '28267', 'QJ'), _defineProperty(_oMultiDiff, '28291', 'KH'), _defineProperty(_oMultiDiff, '28337', 'ZQ'), _defineProperty(_oMultiDiff, '28463', 'TL'), _defineProperty(_oMultiDiff, '28548', 'DC'), _defineProperty(_oMultiDiff, '28601', 'TD'), _defineProperty(_oMultiDiff, '28689', 'PB'), _defineProperty(_oMultiDiff, '28805', 'JG'), _defineProperty(_oMultiDiff, '28820', 'QG'), _defineProperty(_oMultiDiff, '28846', 'PB'), _defineProperty(_oMultiDiff, '28952', 'TD'), _defineProperty(_oMultiDiff, '28975', 'ZC'), _defineProperty(_oMultiDiff, '29100', 'A'), _defineProperty(_oMultiDiff, '29325', 'QJ'), _defineProperty(_oMultiDiff, '29575', 'SL'), _defineProperty(_oMultiDiff, '29602', 'FB'), _defineProperty(_oMultiDiff, '30010', 'TD'), _defineProperty(_oMultiDiff, '30044', 'CX'), _defineProperty(_oMultiDiff, '30058', 'PF'), _defineProperty(_oMultiDiff, '30091', 'YSP'), _defineProperty(_oMultiDiff, '30111', 'YN'), _defineProperty(_oMultiDiff, '30229', 'XJ'), _defineProperty(_oMultiDiff, '30427', 'SC'), _defineProperty(_oMultiDiff, '30465', 'SX'), _defineProperty(_oMultiDiff, '30631', 'YQ'), _defineProperty(_oMultiDiff, '30655', 'QJ'), _defineProperty(_oMultiDiff, '30684', 'QJG'), _defineProperty(_oMultiDiff, '30707', 'SD'), _defineProperty(_oMultiDiff, '30729', 'XH'), _defineProperty(_oMultiDiff, '30796', 'LG'), _defineProperty(_oMultiDiff, '30917', 'PB'), _defineProperty(_oMultiDiff, '31074', 'NM'), _defineProperty(_oMultiDiff, '31085', 'JZ'), _defineProperty(_oMultiDiff, '31109', 'SC'), _defineProperty(_oMultiDiff, '31181', 'ZC'), _defineProperty(_oMultiDiff, '31192', 'MLB'), _defineProperty(_oMultiDiff, '31293', 'JQ'), _defineProperty(_oMultiDiff, '31400', 'YX'), _defineProperty(_oMultiDiff, '31584', 'YJ'), _defineProperty(_oMultiDiff, '31896', 'ZN'), _defineProperty(_oMultiDiff, '31909', 'ZY'), _defineProperty(_oMultiDiff, '31995', 'XJ'), _defineProperty(_oMultiDiff, '32321', 'PF'), _defineProperty(_oMultiDiff, '32327', 'ZY'), _defineProperty(_oMultiDiff, '32418', 'HG'), _defineProperty(_oMultiDiff, '32420', 'XQ'), _defineProperty(_oMultiDiff, '32421', 'HG'), _defineProperty(_oMultiDiff, '32438', 'LG'), _defineProperty(_oMultiDiff, '32473', 'GJ'), _defineProperty(_oMultiDiff, '32488', 'TD'), _defineProperty(_oMultiDiff, '32521', 'QJ'), _defineProperty(_oMultiDiff, '32527', 'PB'), _defineProperty(_oMultiDiff, '32562', 'ZSQ'), _defineProperty(_oMultiDiff, '32564', 'JZ'), _defineProperty(_oMultiDiff, '32735', 'ZD'), _defineProperty(_oMultiDiff, '32793', 'PB'), _defineProperty(_oMultiDiff, '33071', 'PF'), _defineProperty(_oMultiDiff, '33098', 'XL'), _defineProperty(_oMultiDiff, '33100', 'YA'), _defineProperty(_oMultiDiff, '33152', 'PB'), _defineProperty(_oMultiDiff, '33261', 'CX'), _defineProperty(_oMultiDiff, '33324', 'BP'), _defineProperty(_oMultiDiff, '33333', 'TD'), _defineProperty(_oMultiDiff, '33406', 'YA'), _defineProperty(_oMultiDiff, '33426', 'WM'), _defineProperty(_oMultiDiff, '33432', 'PB'), _defineProperty(_oMultiDiff, '33445', 'JG'), _defineProperty(_oMultiDiff, '33486', 'ZN'), _defineProperty(_oMultiDiff, '33493', 'TS'), _defineProperty(_oMultiDiff, '33507', 'QJ'), _defineProperty(_oMultiDiff, '33540', 'QJ'), _defineProperty(_oMultiDiff, '33544', 'ZC'), _defineProperty(_oMultiDiff, '33564', 'XQ'), _defineProperty(_oMultiDiff, '33617', 'YT'), _defineProperty(_oMultiDiff, '33632', 'QJ'), _defineProperty(_oMultiDiff, '33636', 'XH'), _defineProperty(_oMultiDiff, '33637', 'YX'), _defineProperty(_oMultiDiff, '33694', 'WG'), _defineProperty(_oMultiDiff, '33705', 'PF'), _defineProperty(_oMultiDiff, '33728', 'YW'), _defineProperty(_oMultiDiff, '33882', 'SR'), _defineProperty(_oMultiDiff, '34067', 'WM'), _defineProperty(_oMultiDiff, '34074', 'YW'), _defineProperty(_oMultiDiff, '34121', 'QJ'), _defineProperty(_oMultiDiff, '34255', 'ZC'), _defineProperty(_oMultiDiff, '34259', 'XL'), _defineProperty(_oMultiDiff, '34425', 'JH'), _defineProperty(_oMultiDiff, '34430', 'XH'), _defineProperty(_oMultiDiff, '34485', 'KH'), _defineProperty(_oMultiDiff, '34503', 'YS'), _defineProperty(_oMultiDiff, '34532', 'HG'), _defineProperty(_oMultiDiff, '34552', 'XS'), _defineProperty(_oMultiDiff, '34558', 'YE'), _defineProperty(_oMultiDiff, '34593', 'ZL'), _defineProperty(_oMultiDiff, '34660', 'YQ'), _defineProperty(_oMultiDiff, '34892', 'XH'), _defineProperty(_oMultiDiff, '34928', 'SC'), _defineProperty(_oMultiDiff, '34999', 'QJ'), _defineProperty(_oMultiDiff, '35048', 'PB'), _defineProperty(_oMultiDiff, '35059', 'SC'), _defineProperty(_oMultiDiff, '35098', 'ZC'), _defineProperty(_oMultiDiff, '35203', 'TQ'), _defineProperty(_oMultiDiff, '35265', 'JX'), _defineProperty(_oMultiDiff, '35299', 'JX'), _defineProperty(_oMultiDiff, '35782', 'SZ'), _defineProperty(_oMultiDiff, '35828', 'YS'), _defineProperty(_oMultiDiff, '35830', 'E'), _defineProperty(_oMultiDiff, '35843', 'TD'), _defineProperty(_oMultiDiff, '35895', 'YG'), _defineProperty(_oMultiDiff, '35977', 'MH'), _defineProperty(_oMultiDiff, '36158', 'JG'), _defineProperty(_oMultiDiff, '36228', 'QJ'), _defineProperty(_oMultiDiff, '36426', 'XQ'), _defineProperty(_oMultiDiff, '36466', 'DC'), _defineProperty(_oMultiDiff, '36710', 'JC'), _defineProperty(_oMultiDiff, '36711', 'ZYG'), _defineProperty(_oMultiDiff, '36767', 'PB'), _defineProperty(_oMultiDiff, '36866', 'SK'), _defineProperty(_oMultiDiff, '36951', 'YW'), _defineProperty(_oMultiDiff, '37034', 'YX'), _defineProperty(_oMultiDiff, '37063', 'XH'), _defineProperty(_oMultiDiff, '37218', 'ZC'), _defineProperty(_oMultiDiff, '37325', 'ZC'), _defineProperty(_oMultiDiff, '38063', 'PB'), _defineProperty(_oMultiDiff, '38079', 'TD'), _defineProperty(_oMultiDiff, '38085', 'QY'), _defineProperty(_oMultiDiff, '38107', 'DC'), _defineProperty(_oMultiDiff, '38116', 'TD'), _defineProperty(_oMultiDiff, '38123', 'YD'), _defineProperty(_oMultiDiff, '38224', 'HG'), _defineProperty(_oMultiDiff, '38241', 'XTC'), _defineProperty(_oMultiDiff, '38271', 'ZC'), _defineProperty(_oMultiDiff, '38415', 'YE'), _defineProperty(_oMultiDiff, '38426', 'KH'), _defineProperty(_oMultiDiff, '38461', 'YD'), _defineProperty(_oMultiDiff, '38463', 'AE'), _defineProperty(_oMultiDiff, '38466', 'PB'), _defineProperty(_oMultiDiff, '38477', 'XJ'), _defineProperty(_oMultiDiff, '38518', 'YT'), _defineProperty(_oMultiDiff, '38551', 'WK'), _defineProperty(_oMultiDiff, '38585', 'ZC'), _defineProperty(_oMultiDiff, '38704', 'XS'), _defineProperty(_oMultiDiff, '38739', 'LJ'), _defineProperty(_oMultiDiff, '38761', 'GJ'), _defineProperty(_oMultiDiff, '38808', 'SQ'), _defineProperty(_oMultiDiff, '39048', 'JG'), _defineProperty(_oMultiDiff, '39049', 'XJ'), _defineProperty(_oMultiDiff, '39052', 'HG'), _defineProperty(_oMultiDiff, '39076', 'CZ'), _defineProperty(_oMultiDiff, '39271', 'XT'), _defineProperty(_oMultiDiff, '39534', 'TD'), _defineProperty(_oMultiDiff, '39552', 'TD'), _defineProperty(_oMultiDiff, '39584', 'PB'), _defineProperty(_oMultiDiff, '39647', 'SB'), _defineProperty(_oMultiDiff, '39730', 'LG'), _defineProperty(_oMultiDiff, '39748', 'TPB'), _defineProperty(_oMultiDiff, '40109', 'ZQ'), _defineProperty(_oMultiDiff, '40479', 'ND'), _defineProperty(_oMultiDiff, '40516', 'HG'), _defineProperty(_oMultiDiff, '40536', 'HG'), _defineProperty(_oMultiDiff, '40583', 'QJ'), _defineProperty(_oMultiDiff, '40765', 'YQ'), _defineProperty(_oMultiDiff, '40784', 'QJ'), _defineProperty(_oMultiDiff, '40840', 'YK'), _defineProperty(_oMultiDiff, '40863', 'QJG'), _oMultiDiff); // 参数,中文字符串
// 返回值:拼音首字母串数组

function makePy(str) {
  if (typeof str != 'string') throw new Error(-1, '函数makePy需要字符串类型参数!');
  var arrResult = new Array(); // 保存中间结果的数组

  for (var i = 0, len = str.length; i < len; i++) {
    // 获得unicode码
    var ch = str.charAt(i); // 检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理

    arrResult.push(checkCh(ch));
  } // 处理arrResult,返回所有可能的拼音首字母串数组


  return mkRslt(arrResult);
}

function checkCh(ch) {
  var uni = ch.charCodeAt(0); // 如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数

  if (uni > 40869 || uni < 19968) return ch; // dealWithOthers(ch);
  // 检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母

  return oMultiDiff[uni] ? oMultiDiff[uni] : strChineseFirstPY.charAt(uni - 19968);
}

function mkRslt(arr) {
  var arrRslt = [''];

  for (var i = 0, len = arr.length; i < len; i++) {
    var str = arr[i];
    var strlen = str.length;

    if (strlen == 1) {
      for (var k = 0; k < arrRslt.length; k++) {
        arrRslt[k] += str;
      }
    } else {
      var tmpArr = arrRslt.slice(0);
      arrRslt = [];

      for (k = 0; k < strlen; k++) {
        // 复制一个相同的arrRslt
        var tmp = tmpArr.slice(0); // 把当前字符str[k]添加到每个元素末尾

        for (var j = 0; j < tmp.length; j++) {
          tmp[j] += str.charAt(k);
        } // 把复制并修改后的数组连接到arrRslt上


        arrRslt = arrRslt.concat(tmp);
      }
    }
  }

  return arrRslt;
}

function Pinyin(a) {
  if (!a) {
    return '';
  }

  return makePy(a);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
     //触发的事件
     var logmsg = function(topics, data) {
        console.log("logging:" + topics + ":" + data);
     }
     //监听指定的消息'msgName'
     var sub = pubsub.subscribe('msgName', logmsg);
     var sub = pubsub.subscribe('msgName', logmsg);
     //发布消息'msgName'
     pubsub.publish('msgName', 'hello world');
     pubsub.publish('msgName', 'hello world1111');
     //发布无人监听的消息'msgName1'
     pubsub.publish('anotherMsgName', 'me too!');
 */
var _default = function () {
  var q = {};
  var topics = {};
  var subUid = -1; // 发布消息

  q.publish = function (topic, args) {
    if (!topics[topic]) {
      return;
    }

    var subs = topics[topic];
    var len = subs.length;

    while (len--) {
      subs[len].func(topic, args);
    }

    return this;
  }; // 订阅事件


  q.subscribe = function (topic, func) {
    topics[topic] = topics[topic] ? topics[topic] : [];
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };

  q.unsubscribe = function (token) {
    var topicCurrent = '';
    var index = '';

    for (var item in topics) {
      var len = topics[item].length;

      while (len--) {
        if (topics[item][len].token == token) {
          topicCurrent = item;
          index = len;
        }
      }
    }

    if (topicCurrent != '' && index != '') {}

    topics[topicCurrent].splice(index, 1);
    return token;
  };

  return q; // 取消订阅就不写了，遍历topics，然后通过保存前面返回token，删除指定元素
}();

exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.luhmCheck = exports.isIdCardNo = exports.regs = void 0;
var regs = {
  mail: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
  phone: /^(0|86|17951)?((13[0-9]|15[012356789]|16[67]|17[0135678]|18[0-9]|14[57]|19[189])[0-9]{8})$/,
  allphone: /^[\d\+\-]+$/,
  password: /^[\S\s]{6,20}$/,
  number: /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))*\s*$/,
  alpha: /^[a-z ._-]+$/i,
  alphanum: /^[a-z0-9_]+$/i,
  pureNum: /^[0-9]{0,6}$/,
  idcard: /^[\S\s]{8,20}$/,
  code: /^\d{6}$/,
  floatnum: /^(([1-9]\d{0,4})|0)(\.\d{1,2})?$/,
  positiveInteger: /^[0-9]{0,3}$/,
  tel: /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^[0-9]{3,4}\-[0-9]{7,8}\-[0-9]{3,5}$)|(^[0-9]{7,8}\-[0-9]{3,5}$)|(^\([0-9]{3,4}\)[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{7,8}\-[0-9]{3,5}$)|(^1[3,4,5,7,8]{1}[0-9]{9}$)/
};
exports.regs = regs;

var isIdCardNo = function isIdCardNo(value) {
  var flag = false;
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子

  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X

  var idCard = trim(value.replace(/ /g, '')); // 去掉字符串头尾空格

  if (idCard.length == 15) {
    flag = isValidityBrithBy15IdCard(idCard); // 进行15位身份证的验证
  } else if (idCard.length == 18) {
    var a_idCard = idCard.split(''); // 得到身份证数组

    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
      // 进行18位身份证的基本验证和第18位的验证
      flag = true;
    }
  }

  return flag;
};
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */


exports.isIdCardNo = isIdCardNo;

function isTrueValidateCodeBy18IdCard(a_idCard) {
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子

  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X

  var sum = 0; // 声明加权求和变量

  if (a_idCard[17].toLowerCase() == 'x') {
    a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
  }

  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i]; // 加权求和
  }

  var valCodePosition = sum % 11; // 得到验证码所位置

  if (a_idCard[17] == ValideCode[valCodePosition]) {
    return true;
  } else {
    return false;
  }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */


function isValidityBrithBy18IdCard(idCard18) {
  var year = idCard18.substring(6, 10);
  var month = idCard18.substring(10, 12);
  var day = idCard18.substring(12, 14);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day)); // 这里用getFullYear()获取年份，避免千年虫问题

  if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return true;
  }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */


function isValidityBrithBy15IdCard(idCard15) {
  var year = idCard15.substring(6, 8);
  var month = idCard15.substring(8, 10);
  var day = idCard15.substring(10, 12);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day)); // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法

  if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return true;
  }
} // 去掉字符串头尾空格


function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

var luhmCheck = function luhmCheck(bankno) {
  if (bankno.length < 16 || bankno.length > 19) {
    // $("#banknoInfo").html("银行卡号长度必须在16到19之间");
    return false;
  }

  var num = /^\d*$/; // 全数字

  if (!num.exec(bankno)) {
    // $("#banknoInfo").html("银行卡号必须全为数字");
    return false;
  } // 开头6位


  var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99';

  if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
    // $("#banknoInfo").html("银行卡号开头6位不符合规范");
    return false;
  }

  var lastNum = bankno.substr(bankno.length - 1, 1); // 取出最后一位（与luhm进行比较）

  var first15Num = bankno.substr(0, bankno.length - 1); // 前15或18位

  var newArr = new Array();

  for (var i = first15Num.length - 1; i > -1; i--) {
    // 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }

  var arrJiShu = new Array(); // 奇数位*2的积 <9

  var arrJiShu2 = new Array(); // 奇数位*2的积 >9

  var arrOuShu = new Array(); // 偶数位数组

  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {
      // 奇数位
      if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);else arrJiShu2.push(parseInt(newArr[j]) * 2);
    } else // 偶数位
      {
        arrOuShu.push(newArr[j]);
      }
  }

  var jishu_child1 = new Array(); // 奇数位*2 >9 的分割之后的数组个位数

  var jishu_child2 = new Array(); // 奇数位*2 >9 的分割之后的数组十位数

  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }

  var sumJiShu = 0; // 奇数位*2 < 9 的数组之和

  var sumOuShu = 0; // 偶数位数组之和

  var sumJiShuChild1 = 0; // 奇数位*2 >9 的分割之后的数组个位数之和

  var sumJiShuChild2 = 0; // 奇数位*2 >9 的分割之后的数组十位数之和

  var sumTotal = 0;

  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }

  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  } // 计算总和


  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2); // 计算Luhm值

  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  var luhm = 10 - k;

  if (lastNum == luhm) {
    // $("#banknoInfo").html("Luhm验证通过");
    return true;
  } else {
    // $("#banknoInfo").html("银行卡号必须符合Luhm校验");
    return false;
  }
};

exports.luhmCheck = luhmCheck;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;
exports.formatTimeString = formatTimeString;
exports.formatDateToZH = formatDateToZH;
exports.formateTime = formateTime;
exports.formatTimeToCN = formatTimeToCN;
exports.getURLParmas = getURLParmas;
exports.Serialize = Serialize;
exports.SimpleSerialize = SimpleSerialize;
exports.formateNumberToDot = formateNumberToDot;
exports.spliceStringByLength = spliceStringByLength;
exports.getStrLength = getStrLength;
exports.imgUrl = imgUrl;
exports.splitName = splitName;
exports.formateTimeWithTime = formateTimeWithTime;
exports.changeEntitiesToNormal = changeEntitiesToNormal;
exports.escapeText = escapeText;
exports.base64 = void 0;

var _whiteList;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function formatTime(date, format) {
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

function formatTimeString(date, format) {
  // 处理Safari 兼容
  if (typeof date === 'string' && date.indexOf('-') > -1) {
    date = date.replace(/-/g, '/');
  }

  var time = new Date(date);
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return time.getFullYear();

      case 'MM':
        return time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;

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


function formatDateToZH(str) {
  return str.substr(0, 4) + '年' + str.substr(5, 2) + '月' + str.substr(8, 2) + '日 ' + str.substr(11, 6);
}

function getDatStartEnd(date) {
  var Start = new Date(date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' 00:00:00').getTime();
  var End = new Date(date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' 23:59:59').getTime();
  return {
    Start: Start,
    End: End
  };
}

function GetDateStr(AddDayCount, current) {
  var dd = current || new Date();
  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; // 获取当前月份的日期

  var d = dd.getDate();
  return y + '-' + m + '-' + d;
} // - 1分钟内：刚刚
// - 1小时内：X分钟前
// - 24小时内：X小时前
// - 24小时外：昨天
// - 昨天0点以前：前天
// - 30天内：X天前
// - 30天前：YYYY-MM-DD


function formateTime(dateTime) {
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

  if ((nowTime - temp) / (1000 * 60) < 60) {
    result = Math.ceil((nowTime - temp) / (1000 * 60)) + '分钟前';
    return result;
  }

  if ((nowTime - temp) / (1000 * 60 * 60) < 24) {
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


function formatTimeToCN(str, format) {
  str = typeof str === 'string' && str.indexOf('-') > -1 ? str.replace(/[-]/g, '/') : str;
  var time = new Date(str);

  if (time) {
    return format.replace(/yyyy|MM|dd/g, function (a) {
      switch (a) {
        case 'yyyy':
          return time.getFullYear() + '年';

        case 'MM':
          return (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '月';

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


function getURLParmas(params) {
  var a = [];
  var i = 0;

  for (var k in params) {
    k ? a[i++] = k + '=' + params[k] : '';
  }

  return a.join('&');
}

function Serialize(a) {
  // /    <summary>
  // /        This method is internal.  Use serialize() instead.
  // /    </summary>
  // /    <param name="a" type="Map">A map of key/value pairs to serialize into a string.</param>'
  // /    <returns type="String" />
  // /    <private />
  var s = [];

  function add(key, value) {
    s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value); // s[ s.length ] = (key) + '=' + (value);
  } // Serialize the key/values


  for (var j in a) {
    add(j, a[j]);
  } // Return the resulting serialization


  return s.join('&').replace(/%20/g, '+');
}
/**
 * @return {string}
 */


function SimpleSerialize(a) {
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


function formateNumberToDot(str) {
  if (!str) {
    return '';
  }

  var temp = Number(str);

  if (isNaN(temp)) {
    return str;
  }

  str = String(str);
  var floatStr = str.substr(str.indexOf('.'));
  var strPre = str.substr(0, str.indexOf('.'));
  strPre = strPre.split('').reverse();
  var dobNum = Math.floor(strPre.length / 3) + (strPre.length % 3 == 0 ? -1 : 0);

  for (var i = 0, len = dobNum; i < len; i++) {
    strPre.splice((i + 1) * 3 + i, 0, ',');
  }

  return strPre.reverse().join('') + floatStr;
}
/**
 * 自动加...  汉字当成两个算
 * @param str
 * @param len
 * @returns {*}
 */


function spliceStringByLength(str, len, hasNoDotted) {
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
      if (i == str.length - 1) {
        return s;
      }

      return s + (hasNoDotted ? '' : '...');
    }
  }

  return s;
} // 获取字符长度（中英文）


function getStrLength(str) {
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


function imgUrl(url) {
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


function splitName(name, len) {
  var len = len || 2;
  if (!name) return '';
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]+/g;
  name = String(name);
  var rs = name.match(reg);

  if (rs && rs.length > 0) {
    var result = rs[rs.length - 1];
    return result.substr(result.length - len < 0 ? 0 : result.length - len, len || 2);
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


var base64 = new Base64();
exports.base64 = base64;

function Base64() {
  // 一般的Base64编码字符
  var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // Base64解码用到的映射表，兼容一般编码的Base64和针对URL进行扩展编码的Base64

  var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

  this.encode = function (str) {
    // 普通 Base64 编码
    return base64encode(utf16to8(str));
  };

  this.decode = function (str) {
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

      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += '==';
        break;
      }

      c2 = str.charCodeAt(i++);

      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += '=';
        break;
      }

      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
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
      out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);
      /* c3 */

      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if (c3 == 61) return out;
        c3 = base64DecodeChars[c3];
      } while (i < len && c3 == -1);

      if (c3 == -1) break;
      out += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);
      /* c4 */

      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if (c4 == 61) return out;
        c4 = base64DecodeChars[c4];
      } while (i < len && c4 == -1);

      if (c4 == -1) break;
      out += String.fromCharCode((c3 & 0x03) << 6 | c4);
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

      if (c >= 0x0001 && c <= 0x007F) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
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

      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += str.charAt(i - 1);
          break;

        case 12:
        case 13:
          // 110x xxxx 10xx xxxx
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
          break;

        case 14:
          // 1110 xxxx 10xx xxxx 10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
          break;
      }
    }

    return out;
  }
} // 时间格式应该 20180227T170522+0800
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


function formateTimeWithTime(dateTime) {
  if (!dateTime) {
    return '';
  }

  function getDatStartEnd(date) {
    var Start = new Date(date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' 00:00:00').getTime();
    var End = new Date(date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' 23:59:59').getTime();
    return {
      Start: Start,
      End: End
    };
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
    var Start = new Date(date.getFullYear() + '/' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' 00:00:00').getTime();
    var End = new Date(date.getFullYear() + '/' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' 23:59:59').getTime();
    return {
      Start: Start,
      End: End
    };
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
  var tempDataTime = new Date(window.parseInt(dateTime.substr(0, 4)), window.parseInt(dateTime.substr(4, 2)) - 1, window.parseInt(dateTime.substr(6, 2)), window.parseInt(dateTime.substr(9, 2)), window.parseInt(dateTime.substr(11, 2)), window.parseInt(dateTime.substr(13, 2)));
  var temp = tempDataTime.getTime();
  var HHMM = dateTime.substr(9, 2) + ':' + dateTime.substr(11, 2);

  if (Math.ceil((nowTime - temp) / (1000 * 60)) < 2 && Math.ceil((nowTime - temp) / (1000 * 60)) > 0) {
    result = '刚刚';
    return result;
  }

  if ((nowTime - temp) / (1000 * 60) < 60 && (nowTime - temp) / (1000 * 60) > 0) {
    result = Math.ceil((nowTime - temp) / (1000 * 60)) + '分钟前';
    return result;
  }

  if ((nowTime - temp) / (1000 * 60 * 60) < 24 && (nowTime - temp) / (1000 * 60 * 60) > 0) {
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

  return [window.parseInt(dateTime.substr(0, 4)), window.parseInt(dateTime.substr(4, 2)), window.parseInt(dateTime.substr(6, 2))].join('-') + ' ' + HHMM;
} // 防xss攻击的过滤html代码的工具


require('../../static/js/xss');

var filterXSSOptions = {
  whiteList: (_whiteList = {
    div: ['style', 'data-index', 'class'],
    u: ['style', 'class'],
    b: ['style', 'class'],
    ul: ['style', 'class'],
    ol: ['style', 'class'],
    li: ['style', 'class'],
    br: ['style', 'class'],
    a: ['href', 'class', 'target', 'style', 'class'],
    img: ['src', 'alt', 'class', 'data-mds-key', 'data-*'],
    p: ['title', 'class', 'style']
  }, _defineProperty(_whiteList, "b", ['style', 'class']), _defineProperty(_whiteList, "span", ['style', 'class']), _whiteList)
};
/**
 * 字符转义显示处理,同时做了xss攻击防护
 * @param str
 * @returns {string|string}
 */

function changeEntitiesToNormal(str) {
  var a = document.createElement('div');
  a.innerHTML = filterXSS(str || '', filterXSSOptions);
  var result = a.textContent || '';
  a = null;
  return result;
}

function escapeText(s) {
  if (!s) {
    return '';
  }

  s = String(s); // Both single quotes and double quotes (for attributes)

  return s.replace(/&(#039|lt|gt|amp|nbsp|quot|cent|pound|yen|euro|sect|copy|reg|trade|times|divide);/g, function (s) {
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
return Util;
}));
