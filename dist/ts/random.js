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
   * 请求散列工具函数
   *
   * @param fn 被散列的函数, promise
   * @param time 随机时间，单位秒。api 请求将在 0 -time 中散列。
   * @example
   * ```javascript
   *
   * const sendRequest = random(function(url){
   *   // do something
   * }, 3);
   * sendRequest(url); // 调用后，将在 0-3s内发起真正请求
   * ```
   */

  function random(fn, time) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      setTimeout(function () {
        fn.apply(void 0, args);
      }, Math.random() * time * 1000);
    };
  }

  exports.random = random;
});
/**
 * 请求散列工具函数 Promise 版
 *
 * @param fn 被散列的函数, promise
 * @param time 随机时间，单位秒。api 请求将在 0 -time 中散列。
 * @example
 * ```javascript
 *
 * const sendRequest = randomPromise(function(){
 *   return Promise.resolve(10);
 * }, 3); // 调用后，将在 0-3s内发起真正请求
 *
 * sendRequest().then(data=> {
 *   console.log(data); // 10
 * });
 * ```
 */
// export function randomPromise(fn: Function, time: number) {
//   return (...args: any) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(
//         () => {
//           fn(...args)
//             .then((data: any) => { resolve(data); })
//             .catch((err: any) => { reject(err); });
//         },
//         Math.random() * time * 1000,
//       );
//     });
//   };
// }