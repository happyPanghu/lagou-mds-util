;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.DeepCopy = factory();
  }
}(this, function() {
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
return DeepCopy;
}));
