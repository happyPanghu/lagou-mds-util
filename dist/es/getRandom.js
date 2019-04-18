;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.GetRandom = factory();
  }
}(this, function() {
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
return GetRandom;
}));
