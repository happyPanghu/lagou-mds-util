"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = exports.array = void 0;

var array = _interopRequireWildcard(require("./array"));

exports.array = array;

var copy = _interopRequireWildcard(require("./copy"));

exports.copy = copy;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }