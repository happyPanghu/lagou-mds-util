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
exports["default"] = void 0;

var cookie = _interopRequireWildcard(require("./cookie.ts"));

var cloneDeep = _interopRequireWildcard(require("./clone-deep.ts"));

var debounce = _interopRequireWildcard(require("./debounce.ts"));

var random = _interopRequireWildcard(require("./random.ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var _default = {
  cookie: cookie,
  cloneDeep: cloneDeep,
  debounce: debounce,
  random: random
}; //
// module.exports = require('./cookie.ts');
// module.exports = require('./clone-deep.ts');
// module.exports = require('./debounce.ts');
// module.exports = require('./random.ts');

exports["default"] = _default;
return Index;
}));
