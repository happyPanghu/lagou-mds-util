"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormByKeys = getFormByKeys;
exports.delForm = delForm;

var _string = require("./string.jsx");

/**
 *通过相关参数获取form表单
 * @param params
 * @param name
 * @param id
 * @param url
 * @param target
 * @returns {Element}
 */
function getFormByKeys(params, name, id, url, target) {
  var form = document.createElement('form');
  form.setAttribute('name', name);
  form.setAttribute('id', id);
  form.setAttribute('action', url);
  form.setAttribute('target', target || '_blank'); // var itemsText = '';

  for (var item in params) {
    if (typeof params[item] != 'function' && params[item] != undefined) {
      if (params[item].constructor == Object) {
        // itemsText += '<input value="'+ Serialize(params[item])+'" name="'+item+'" />'
        var newInput = document.createElement('input');
        newInput.name = item;
        newInput.value = JSON.stringify(params[item]);
        form.appendChild(newInput);
      } else {
        var _newInput = document.createElement('input');

        _newInput.name = item;
        _newInput.value = params[item];
        form.appendChild(_newInput); // itemsText += '<input value="'+params[item]+'" name="'+item+'" />'
      }
    }
  } // itemsText += '<input type="submit" name="submit" value="Sumbit" />';


  var inputSubmit = document.createElement('input');
  inputSubmit.name = 'submit';
  inputSubmit.value = 'Sumbit';
  inputSubmit.type = 'submit';
  form.appendChild(inputSubmit); // form.innerHTML += itemsText||'';

  return form;
}
/*
 * 通过id删除form表单
 * */


function delForm(element) {
  if (element != undefined && element.parentNode) {
    var toDel = element;
    element.parentNode.removeChild(toDel);
  }
}