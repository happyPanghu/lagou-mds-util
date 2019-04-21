export function formatData(data) {
    if (typeof data === 'string') {
        let obj = null;
        fetch(data).then((response) => response.json()).then(res => {
            if (res.state === 1) {
                obj = res;
            }
        }).done();
        return obj;
    } else {
        return getArray(data);
    }
}
export  function getArray(arr) {
    if (arr.length === 0) {
        return [];
    }
    arr = arr.map(function(item) {
        if (typeof item !== 'object') {
            return { text: item, value: item };
        } else {
            return item;
        }
    });
    return arr;
}

export function contain(arr, item) {
    if (!(arr instanceof Array)) {
        return false;
    }
    for (let i in arr) {
        return arr[i] === item ? true : false;
    }
}

// 判断一个字符串数组是否另一个字符串数组的子集
// ['a', 'b'] in ['a', 'b', 'c'] => true
// ['a', 'b', '!c'] in ['a', 'b', 'c'] => false
export function subset(current, target) {
    if (!(current instanceof Array)) {
        if (current[0] === '!') {
            return target.indexOf(current.slice(1)) < 0;
        }
        return target.indexOf(current) > -1;
    }
    return current.reduce((res, item) => {
        let currentRes;
        if (item[0] === '!') {
            currentRes = target.indexOf(item.slice(1)) < 0;
        } else {
            currentRes = target.indexOf(item) > -1;
        }
        return res && currentRes;
    }, true);
}

