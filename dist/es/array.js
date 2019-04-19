;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Array = factory();
  }
}(this, function() {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var Array = {
  formatData: formatData,
  getArray: getArray,
  contain: contain,
  subset: subset
};
var _default = Array;
exports["default"] = _default;
return Array;
}));
