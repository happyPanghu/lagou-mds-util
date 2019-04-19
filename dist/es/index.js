;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Index = factory();
  }
}(this, function() {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "array", {
  enumerable: true,
  get: function get() {
    return _array["default"];
  }
});
Object.defineProperty(exports, "copy", {
  enumerable: true,
  get: function get() {
    return _copy["default"];
  }
});
exports["default"] = void 0;

var _array = _interopRequireDefault(require("./array"));

var _copy = _interopRequireDefault(require("./copy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Index = {
  array: array,
  copy: copy
};
var _default = Index;
exports["default"] = _default;
return Index;
}));
