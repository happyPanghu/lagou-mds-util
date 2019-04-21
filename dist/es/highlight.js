"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @param param 传入配置对象
 * @returns string
 */
var keywordHighlight = function keywordHighlight(param) {
  // 初始化参数
  var defaultParam = Object.assign({
    className: '',
    // 自定义传入样式 默认无
    color: '#00B38A',
    // 高亮颜色 默认无className时展示
    keywordList: [],
    // 关键词
    targetString: '' // 待高亮 字符串

  }, param); // 用于临时接收

  var acceptArr = [];
  var targetString = defaultParam.targetString,
      keywordList = defaultParam.keywordList;
  var className = defaultParam.className,
      color = defaultParam.color;

  if (keywordList && keywordList.length) {
    // 特殊字符 是否被目标关键词占用，占用会导致重复匹配造成混乱
    var reservedWordOccupy = keywordList.some(function (item) {
      return '◐◑卍卐'.indexOf(item) > -1;
    });
    if (reservedWordOccupy) return defaultParam.targetString; // 去重

    keywordList = Array.from(new Set(keywordList)); // 冒泡交换位置 存在包含逻辑的字符  长的在前面优先匹配

    for (var i = 0; i < keywordList.length; i++) {
      for (var j = i + 1; j < keywordList.length; j++) {
        if (keywordList[j].includes(keywordList[i])) {
          var temp = keywordList[i];
          keywordList[i] = keywordList[j];
          keywordList[j] = temp;
        }
      }
    }

    try {
      // 匹配所有html标签
      var htmlReg = new RegExp('\<.*?\>', 'i'); // 替换HTML标签 并临时存储

      for (var _i = 0; true; _i++) {
        var regRes = htmlReg.exec(targetString);

        if (regRes) {
          acceptArr.push(regRes);
        } else {
          break;
        }

        targetString = targetString.replace(regRes, _i % 2 ? '◐' : '◑');
      } // 替换关键字


      keywordList.forEach(function (item) {
        var formatItem = item.replace(/(\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/)/g, '\\$1');
        var reg = new RegExp(formatItem, 'img');
        targetString = targetString.replace(reg, '卍$&卐');
      }); // 还原原始标签

      acceptArr.forEach(function (item, i) {
        var regStr = i % 2 ? '◐' : '◑';
        var reg = new RegExp(regStr, 'mg');
        targetString = targetString.replace(reg, item);
      }); // 关键字添加样式

      return targetString.replace(/卍/ig, "<span ".concat(className ? "class=\"".concat(className, "\"") : "style=\"color: ".concat(color, "\""), ">")).replace(/卐/ig, '</span>');
    } catch (e) {
      return defaultParam.targetString;
    }
  } else {
    if (targetString) {
      return defaultParam.targetString;
    } else {
      throw new Error('必须要有目标参数!');
    }
  }
};

var _default = keywordHighlight;
exports["default"] = _default;