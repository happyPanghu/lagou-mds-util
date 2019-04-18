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
   * 深度克隆一个对象
   *
   * @param obj 要克隆的对象
   */

  function cloneDeep(obj) {
    // @fixme 修复any类型
    var result;
    if (obj === null || _typeof(obj) !== 'object') return obj;

    if (obj instanceof Date) {
      result = new Date();
      result.setTime(obj.getTime());
      return result;
    }

    if (obj instanceof Array) {
      result = [];

      for (var i = 0; i < obj.length; i++) {
        result[i] = cloneDeep(obj[i]);
      }

      return result;
    }
    /* istanbul ignore else */


    if (obj instanceof Object) {
      result = {};
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        result[key] = cloneDeep(obj[key]);
      }

      return result;
    }
    /* istanbul ignore next */


    throw new Error("Unable to copy values! Its type isn't supported.");
  }

  exports["default"] = cloneDeep;
});