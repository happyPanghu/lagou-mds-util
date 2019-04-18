;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Events = factory();
  }
}(this, function() {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.off = off;
exports.one = one;

function on(ele, type, callback) {
  if (ele.addEventListener) {
    ele.addEventListener(type, callback);
  } else {
    ele.attachEvent('on' + type, function () {
      callback.call(ele);
    });
  }
}

function off(ele, type, callback) {
  if (ele.removeEventListener) {
    ele.removeEventListener(type, callback);
  } else {
    ele.detachEvent('on' + type, callback);
  }
}

function one(ele, type, callback) {
  var typeArray = type.split(' ');

  var recursiveFunction = function recursiveFunction(e) {
    e.target.removeEventListener(e.type, recursiveFunction);
    return callback(e);
  };

  for (var i = typeArray.length - 1; i >= 0; i--) {
    on(ele, typeArray[i], recursiveFunction);
  }
}
return Events;
}));
