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