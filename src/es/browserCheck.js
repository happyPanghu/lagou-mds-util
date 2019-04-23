export const browserCheck = {
    isWin32: navigator.platform == 'Win32' ? true : false,
    isWindows: navigator.platform == 'Windows' ? true : false,
    isWin2000: /Windows NT 5.0/i.test(navigator.userAgent) ? true : false,
    isWinXP: /Windows NT 5.1/i.test(navigator.userAgent) ? true : false,
    isWin2003: /Windows NT 5.2/i.test(navigator.userAgent) ? true : false,
    isWinVista: /Windows NT 6.0/i.test(navigator.userAgent) ? true : false,
    isWin7: /Windows NT 6.1/i.test(navigator.userAgent) ? true : false,
    isMac: /Mac/i.test(navigator.userAgent) ? true : false,
    isUnix: navigator.platform == 'X11' ? true : false,
    isLinux: /Linux/i.test(navigator.userAgent) ? true : false,
    isAndorid: (/Linux/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent.toLowerCase())) ? true : false,
    isWeixin: navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger' ? true : false,
    isOpera: navigator.userAgent.indexOf('Opera') > -1 ? true : false,
    isFirefox: navigator.userAgent.indexOf('Firefox') > -1 ? true : false,
    isChrome: navigator.userAgent.indexOf('Chrome') > -1 ? true : false,
    isSafari: navigator.userAgent.indexOf('Safari') > -1 ? true : false,
    isIE: (navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1 && !(navigator.userAgent.indexOf('Opera') > -1)) ? true : false,
    is360: is360()
};
export function is360() {

    // application/vnd.chromium.remoting-viewer 可能为360特有
    var is360 = _mime('type', 'application/vnd.chromium.remoting-viewer');

    if (isChrome() && is360) {
        is360 = true;
    }
    return is360;
}
// 检测是否是谷歌内核(可排除360及谷歌以外的浏览器)
export function isChrome() {
    var ua = navigator.userAgent.toLowerCase();

    return ua.indexOf('chrome') > 1;
}
// 测试mime
export function _mime(option, value) {
    var mimeTypes = navigator.mimeTypes;
    for (var mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
            return true;
        }
    }
    return false;
}