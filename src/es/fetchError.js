
import Modal from '../Modal';
import { Serialize } from './string.jsx';
const Confirm = Modal.confirm;

export function shenceErrorData(data) {
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
export function fetchCatch(fetchObj, catchCallback) {
    return fetchObj.catch(function (e) {
        console.log(e);
        // shenceErrorData(e);
        catchCallback && catchCallback(e);
        // const sysConfirm = Confirm({
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
export function fetchData(action, path, data, type, code) {
    return dispatch => {
        if (type === 'post') {
            return fetchCatch(fetch(`${path}`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Anit-Forge-Code': window.X_Anti_Forge_Code || '',
                    'X-Anit-Forge-Token': window.X_Anti_Forge_Token || ''
                },
                body: Serialize(data)
            }).then(response => response.json())
                .then(res => {
                    res.submitCode && (window.X_Anti_Forge_Code = res.submitCode);
                    res.submitToken && (window.X_Anti_Forge_Token = res.submitToken);
                    return dispatch(action(res, data));
                }
                ));
        } else {
            return fetchCatch(fetch(`${path}?${Serialize(data)}`, {
                headers: {
                    'X-Anit-Forge-Code': window.X_Anti_Forge_Code || '',
                    'X-Anit-Forge-Token': window.X_Anti_Forge_Token || ''
                },
                credentials: 'include'
            }).then(response => response.json())
                .then(res => {
                    if (code == undefined) {
                        res.submitCode && (window.X_Anti_Forge_Code = res.submitCode);
                        res.submitToken && (window.X_Anti_Forge_Token = res.submitToken);
                    }

                    if (parseInt(res.state, 10) === 1997) {
                        const sysConfirm = Confirm({
                            content: '页面已失效，请刷新后重试',
                            onOK: () => {
                                window.location.reload();
                                sysConfirm.destroy();
                            },
                            okText: '确定',
                            onlyOKBtn: true
                        });
                    }

                    return dispatch(action(res, data));
                }
                ));
        }
    };
}
