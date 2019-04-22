"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shenceErrorData = shenceErrorData;
exports.fetchCatch = fetchCatch;
exports.fetchData = fetchData;

var _Modal = _interopRequireDefault(require("../Modal"));

var _string = require("./string.jsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Confirm = _Modal["default"].confirm;

function shenceErrorData(data) {
  typeof sa != 'undefined' && sa.track('ZHAOPIN_FRONTEND_ERROR', {
    createCompanyMethod: '候选人_前端_错误',
    company_Name: document.querySelector('#UserConpany') && document.querySelector('#UserConpany').value,
    company_ShortName: document.querySelector('#UserConpanyShortName') && document.querySelector('#UserConpanyShortName').value,
    company_ID: document.querySelector('#UserConpanyId') && document.querySelector('#UserConpanyId').value,
    _user_ID: document.querySelector('#UserId') && document.querySelector('#UserId').value,
    current_page: window.location.href,
    error_message: typeof data != 'undefined' && data.message,
    error_stack: typeof data != 'undefined' && data.stack
  });
}

function fetchCatch(fetchObj, catchCallback) {
  return fetchObj["catch"](function (e) {
    console.log(e); // shenceErrorData(e);

    catchCallback && catchCallback(e); // const sysConfirm = Confirm({
    //    content:'页面已失效，请刷新后重试',
    //    onOK:()=>{
    //        window.location.reload();
    //        sysConfirm.destroy();
    //    },
    //    okText:'确定',
    //    onlyOKBtn:true
    // })
  });
}

function fetchData(action, path, data, type, code) {
  return function (dispatch) {
    if (type === 'post') {
      return fetchCatch(fetch("".concat(path), {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Anit-Forge-Code': window.X_Anti_Forge_Code || '',
          'X-Anit-Forge-Token': window.X_Anti_Forge_Token || ''
        },
        body: (0, _string.Serialize)(data)
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        res.submitCode && (window.X_Anti_Forge_Code = res.submitCode);
        res.submitToken && (window.X_Anti_Forge_Token = res.submitToken);
        return dispatch(action(res, data));
      }));
    } else {
      return fetchCatch(fetch("".concat(path, "?").concat((0, _string.Serialize)(data)), {
        headers: {
          'X-Anit-Forge-Code': window.X_Anti_Forge_Code || '',
          'X-Anit-Forge-Token': window.X_Anti_Forge_Token || ''
        },
        credentials: 'include'
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        if (code == undefined) {
          res.submitCode && (window.X_Anti_Forge_Code = res.submitCode);
          res.submitToken && (window.X_Anti_Forge_Token = res.submitToken);
        }

        if (parseInt(res.state, 10) === 1997) {
          var sysConfirm = Confirm({
            content: '页面已失效，请刷新后重试',
            onOK: function onOK() {
              window.location.reload();
              sysConfirm.destroy();
            },
            okText: '确定',
            onlyOKBtn: true
          });
        }

        return dispatch(action(res, data));
      }));
    }
  };
}