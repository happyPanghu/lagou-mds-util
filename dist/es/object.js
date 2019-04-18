;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Object = factory();
  }
}(this, function() {
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
return Object;
}));
