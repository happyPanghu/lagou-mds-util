"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = void 0;

var array = _interopRequireWildcard(require("./array"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// import * as copy   from './copy';
// import * as cookie   from './cookie';
// export default {
//     ...array,
//     ...copy,
//     ...cookie
// };
var a = array;
exports.a = a;