"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports"], factory);
  }
})(function (require, exports) {
  "use strict";

  exports.__esModule = true;
  /**
   * 设置cookie
   *
   * @param name cookie名称
   * @param value cookie值
   * @param expires 过期时间
   *
   * @example
   * ```javascript
   *
   * set('a','1',new Date(Date.now() + 86400*1000 ));
   * ```
   */

  exports.set = function (name, value, expires) {
    document.cookie = name + "=" + value + ";expires=" + expires;
  };
  /**
   * 根据名称获取cookie
   *
   * @param name cookie名称
   *
   * @example
   * ```javascript
   *
   * const value  = get('a');
   * ```
   */


  exports.get = function (name) {
    var cookieArr = document.cookie.replace(/\s/g, '').split(';');

    for (var i = 0; i < cookieArr.length; i++) {
      var _a = cookieArr[i].split('='),
          key = _a[0],
          value = _a[1];

      if (key === name) {
        return decodeURIComponent(value);
      }
    }

    return '';
  };
  /**
   * 根据cookie名称，删除一个cookie
   *
   * @param name cookie名称
   *
   * @example
   * ```javascript
   *
   * remove('a');
   * ```
   */


  exports.remove = function (name) {
    exports.set(name, '', new Date(Date.now() - 1));
  };
});