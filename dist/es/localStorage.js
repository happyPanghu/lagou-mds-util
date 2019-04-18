;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.LocalStorage = factory();
  }
}(this, function() {
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
return LocalStorage;
}));
