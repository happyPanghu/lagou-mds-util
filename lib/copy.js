"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToClipboard = CopyToClipboard;
exports.CreateElementForExecCommand = CreateElementForExecCommand;
exports.SelectContent = SelectContent;
exports["default"] = void 0;

// clipboard
function CopyToClipboard(textToClipboard) {
  var success = true; // Internet Explorer

  if (window.clipboardData) {
    window.clipboardData.setData('Text', textToClipboard);
  } else {
    // create a temporary element for the execCommand method
    var forExecElement = CreateElementForExecCommand(textToClipboard);
    /* Select the contents of the element
     (the execCommand for 'copy' method works on the selection) */

    SelectContent(forExecElement);
    var supported = true; // UniversalXPConnect privilege is required for clipboard access in Firefox

    try {
      if (window.netscape && netscape.security) {
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
      } // Copy the selected content to the clipboard
      // Works in Firefox and in Safari before version 5


      success = document.execCommand('copy', false, null);
    } catch (e) {
      success = false;
    } // remove the temporary element


    document.body.removeChild(forExecElement);
  }

  if (success) {
    alert('复制成功');
  } else {
    alert('复制失败，请手动复制该链接');
  }
}

console.log(1);

function CreateElementForExecCommand(textToClipboard) {
  var forExecElement = document.createElement('div'); // place outside the visible area

  forExecElement.style.position = 'absolute';
  forExecElement.style.left = '-10000px';
  forExecElement.style.top = '-10000px'; // write the necessary text into the element and append to the document

  forExecElement.textContent = textToClipboard;
  document.body.appendChild(forExecElement); // the contentEditable mode is necessary for the  execCommand method in Firefox

  forExecElement.contentEditable = true;
  return forExecElement;
}

function SelectContent(element) {
  // first create a range
  var rangeToSelect = document.createRange();
  rangeToSelect.selectNodeContents(element); // select the contents

  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(rangeToSelect);
}

function f() {
  console.log(1);
}

var Copy = {
  CopyToClipboard: CopyToClipboard,
  CreateElementForExecCommand: CreateElementForExecCommand,
  SelectContent: SelectContent
};
var _default = Copy;
exports["default"] = _default;