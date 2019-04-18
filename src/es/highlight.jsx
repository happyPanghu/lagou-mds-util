/**
 * @param param 传入配置对象
 * @returns string
 */
const keywordHighlight = (param) => {

    // 初始化参数
    const defaultParam = Object.assign({
        className: '',      // 自定义传入样式 默认无
        color: '#00B38A',   // 高亮颜色 默认无className时展示
        keywordList: [],    // 关键词
        targetString: ''    // 待高亮 字符串
    }, param);

    // 用于临时接收
    let acceptArr = [];
    let { targetString, keywordList } = defaultParam;
    const { className, color } = defaultParam;

    if (keywordList && keywordList.length) {

        // 特殊字符 是否被目标关键词占用，占用会导致重复匹配造成混乱
        const reservedWordOccupy = keywordList.some((item) => {
            return '◐◑卍卐'.indexOf(item) > -1;
        });
        if (reservedWordOccupy) return defaultParam.targetString;

        // 去重
        keywordList = Array.from(new Set(keywordList));

        // 冒泡交换位置 存在包含逻辑的字符  长的在前面优先匹配
        for (let i = 0; i < keywordList.length; i++) {
            for (let j = i + 1; j < keywordList.length; j++) {
                if (keywordList[j].includes(keywordList[i])) {
                    const temp = keywordList[i];
                    keywordList[i] = keywordList[j];
                    keywordList[j] = temp;
                }
            }
        }

        try {

            // 匹配所有html标签
            const htmlReg = new RegExp('\<.*?\>', 'i');

            // 替换HTML标签 并临时存储
            for (let i = 0; true; i++) {
                let regRes =  htmlReg.exec(targetString);
                if (regRes) {
                    acceptArr.push(regRes);
                } else {
                    break;
                }
                targetString = targetString.replace(regRes, i % 2 ? '◐' : '◑');
            }

            // 替换关键字
            keywordList.forEach((item) => {
                const formatItem = item.replace(/(\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/)/g, '\\$1');
                const reg = new RegExp(formatItem, 'img');
                targetString = targetString.replace(reg, '卍$&卐');
            });

            // 还原原始标签
            acceptArr.forEach((item, i) => {
                const regStr = i % 2 ? '◐' : '◑';
                const reg = new RegExp(regStr, 'mg');
                targetString = targetString.replace(reg, item);
            });

            // 关键字添加样式
            return targetString
                .replace(/卍/ig, `<span ${className ? (`class="${className}"`) : (`style="color: ${color}"`)}>`)
                .replace(/卐/ig, '</span>');

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

export default keywordHighlight;