;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Pubsub = factory();
  }
}(this, function() {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
     //触发的事件
     var logmsg = function(topics, data) {
        console.log("logging:" + topics + ":" + data);
     }
     //监听指定的消息'msgName'
     var sub = pubsub.subscribe('msgName', logmsg);
     var sub = pubsub.subscribe('msgName', logmsg);
     //发布消息'msgName'
     pubsub.publish('msgName', 'hello world');
     pubsub.publish('msgName', 'hello world1111');
     //发布无人监听的消息'msgName1'
     pubsub.publish('anotherMsgName', 'me too!');
 */
var _default = function () {
  var q = {};
  var topics = {};
  var subUid = -1; // 发布消息

  q.publish = function (topic, args) {
    if (!topics[topic]) {
      return;
    }

    var subs = topics[topic];
    var len = subs.length;

    while (len--) {
      subs[len].func(topic, args);
    }

    return this;
  }; // 订阅事件


  q.subscribe = function (topic, func) {
    topics[topic] = topics[topic] ? topics[topic] : [];
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };

  q.unsubscribe = function (token) {
    var topicCurrent = '';
    var index = '';

    for (var item in topics) {
      var len = topics[item].length;

      while (len--) {
        if (topics[item][len].token == token) {
          topicCurrent = item;
          index = len;
        }
      }
    }

    if (topicCurrent != '' && index != '') {}

    topics[topicCurrent].splice(index, 1);
    return token;
  };

  return q; // 取消订阅就不写了，遍历topics，然后通过保存前面返回token，删除指定元素
}();

exports["default"] = _default;
return Pubsub;
}));
