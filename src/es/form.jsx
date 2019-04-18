import { Serialize } from './string.jsx';

/**
 *通过相关参数获取form表单
 * @param params
 * @param name
 * @param id
 * @param url
 * @param target
 * @returns {Element}
 */
export function getFormByKeys(params, name, id, url, target) {
    let form = document.createElement('form');
    form.setAttribute('name', name);
    form.setAttribute('id', id);
    form.setAttribute('action', url);
    form.setAttribute('target', target || '_blank');
    // var itemsText = '';
    for (var item in params) {
        if (typeof params[item] != 'function' && params[item] != undefined) {
            if (params[item].constructor == Object) {
                // itemsText += '<input value="'+ Serialize(params[item])+'" name="'+item+'" />'
                let newInput = document.createElement('input');
                newInput.name = item;
                newInput.value = JSON.stringify((params[item]));
                form.appendChild(newInput);
            } else {
                let newInput = document.createElement('input');
                newInput.name = item;
                newInput.value = params[item];
                form.appendChild(newInput);
                // itemsText += '<input value="'+params[item]+'" name="'+item+'" />'
            }
        }
    }
    // itemsText += '<input type="submit" name="submit" value="Sumbit" />';
    let inputSubmit = document.createElement('input');
    inputSubmit.name = 'submit';
    inputSubmit.value = 'Sumbit';
    inputSubmit.type = 'submit';
    form.appendChild(inputSubmit);
    // form.innerHTML += itemsText||'';
    return form;
}



/*
 * 通过id删除form表单
 * */
export function delForm(element) {
    if (element != undefined && element.parentNode) {
        const toDel = element;
        element.parentNode.removeChild(toDel);
    }
}

