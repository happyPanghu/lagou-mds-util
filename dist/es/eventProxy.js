"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var eventProxy = {
  onObj: {},
  oneObj: {},
  on: function on(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }

    this.onObj[key].push(fn);
  },
  one: function one(key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }

    this.oneObj[key].push(fn);
  },
  off: function off(key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },
  trigger: function trigger() {
    var key;
    var args;

    if (arguments.length == 0) {
      return false;
    }

    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      for (var i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }

    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      for (var _i in this.oneObj[key]) {
        this.oneObj[key][_i].apply(null, args);

        this.oneObj[key][_i] = undefined;
      }

      this.oneObj[key] = [];
    }
  }
};
var _default = eventProxy;
exports["default"] = _default;