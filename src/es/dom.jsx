
/**
 * 常用dom操作
 */

export function addClass(ele, className) {
    let currClass = ele.getAttribute('class');


    let classArr = currClass ? currClass.split(' ') : [];


    let index = classArr.indexOf(className);
    if (index === -1) {
        classArr.push(className);
    }
    let newClass = classArr.join(' ');
    ele.setAttribute('class', newClass);
}

export function removeClass(ele, className) {
    let currClass = ele.getAttribute('class');


    let classArr = currClass ? currClass.split(' ') : [];


    let index = classArr.indexOf(className);
    if (index > -1) {
        classArr.splice(index, 1);
    }
    let newClass = classArr.join(' ');
    ele.setAttribute('class', newClass);
}

export function hasClass(ele, className) {
    let classArr = ele.classList || [];
    return classArr.length ? classArr.contains(className) : false;
}
// 移除兄弟元素的className，并给自己加上className
export function removeSiblingsClass(ele, className) {
    let parentNode = ele.parentNode;
    let arr = parentNode.children;
    for (let i = 0, len = arr.length; i < len; i++) {
        removeClass(arr[i], className);
    }
    addClass(ele, className);
}

export function isClickInner(ele, parentEle) {
    let node = ele.parentNode;
    while (node !== null) {
        if (node == parentEle) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

export function getCSSAttr(ele, attr) {
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    } else {
        return document.defaultView.getComputedStyle(ele, null)[attr];
    }
}


export function getText(ele) {
    return (typeof ele.textContent == 'string') ? ele.textContent : ele.innerText;
}
export function setText(ele, text) {
    if (ele.textContent) {
        ele.textContent = text;
    } else {
        ele.innerText = text;
    }
}

/**
 * 获取制定元素左上角距离window左侧的距离
 * @param elem
 * @returns {*}
 */
export function getpageX(elem) {
    // 检查我们是否已经到了根元素
    return elem.offsetParent ?
        // 如果我们还能往上，则将当前偏移与向上递归的值相加
        elem.offsetLeft + getpageX(elem.offsetParent) :
        // 否则，取当前偏移
        elem.offsetLeft;
}
/**
 * 获取制定元素左上角距离window顶部的距离
 * @param elem
 * @returns {*}
 */
// 计算元素的Y(垂直，顶)位置
export function getpageY(elem) {
    // 检查我们是否已经到了根元素
    return elem.offsetParent ?
        // 如果我们还能往上，则将当前偏移与向上递归的值相加
        elem.offsetTop + getpageY(elem.offsetParent) :
        // 否则，取当前偏移
        elem.offsetTop;
}

// 函数节流 隔 wait 后执行
// 应用于window的scroll事件，resize事件以及普通元素的mousemove事件，因为这些事件由于鼠标或滚轮操作很频繁，会导致回调连续触发
export function throttle(fn, threshhold) {
    var last;
    var timer;
    threshhold || (threshhold = 250);
    return function() {
        var context = this;
        var args = arguments;
        var now = Number(new Date());
        // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
        // 执行 fn，并重新计时
        if (last && now < last + threshhold) {
            clearTimeout(timer);
            // 保证在当前时间区间结束后，再执行一次 fn
            timer = setTimeout(function() {
                last = now;
                fn.apply(context, args);
            }, threshhold);
            // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

// 函数节流 在 delay 后执行
// 用户频繁操作，比如 监听keyUp,keyDown,keyPress,resize等事件
export function debounce(func, delay) {
    var timer = null;
    return function() {
        var self = this;


        var args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
            return typeof func === 'function' && func.apply(self, args);
        }, delay);
    };
}

/**
 * 查询最近的元素
 * @param source
 * @param selector
 * @returns {*}
 */
export function closest(source, selector) {
    if (!source || !selector) {
        return null;
    }
    window.Element && (function(ElementPrototype) {
        ElementPrototype.matches = ElementPrototype.matches ||
            ElementPrototype.matchesSelector ||
            ElementPrototype.webkitMatchesSelector ||
            ElementPrototype.msMatchesSelector ||
            function(selector) {
                var node = window;


                var nodes = (node.parentNode || node.document).querySelectorAll(selector);


                var i = -1;
                while (nodes[++i] && nodes[i] != node)
                    ;
                return !!nodes[i];
            };
    })(Element.prototype);

    // closest polyfill
    window.Element && (function(ElementPrototype) {
        ElementPrototype.closest = ElementPrototype.closest ||
            function(selector) {
                var el = this;
                while (el.matches && !el.matches(selector))
                { el = el.parentNode }
                return el.matches ? el : null;
            };
    })(Element.prototype);
    return source.closest(selector);
}