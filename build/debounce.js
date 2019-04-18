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
   * 函数节流，避免频繁触发
   *
   * @param func 需要执行的方法
   * @param wait 触发间隔
   * @param immediate 是否立即执行
   * @example
   * ```javascript
   * // 如果要保证立刻执行，请设置immediate=true。该值默认为false。
   * // 如绑定click事件。保证在300ms内只触发第一次。
   *
   * // 如果要保证最后一次执行，请设置immediate=false。
   * // 比如resize触发，保证最后一次触发完执行一些逻辑。
   *
   *
   * window.addEventListener('resize', debounce(()=>{
   *  console.log(1);
   * }, 300));
   * // 绑定window resize事件，但是第二次执行至少会在300ms以后
   * ```
   */

  function debounce(func, wait, immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var timeout;
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };

      var carry = immediate && !timeout;
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
      if (carry) func.apply(this, args);
    };
  }

  exports["default"] = debounce;
});