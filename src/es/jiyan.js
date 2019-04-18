// 极验

// 获取key
/**
 *
 * @param obj
 * 主要包含id 必须
 * target 指定对象 可选
 * successCallback  成功回调
 * errorCallback    失败回调
 * target 一般 应与 两种回调互斥
 * @returns {boolean}
 */
const getSenseKey = (obj) => {
    const { id, target, successCallback, errorCallback } = obj;
    if (typeof initSense !== 'undefined') {
        initSense({
            id: id,
            onError: function(err) {
                console.log(`极验initSense error: ${err}`);
            }
        }, function(sense) {
            sense.setInfos(function () {
                return {
                    interactive: 1
                };
            }).onSuccess(function (data) {
                if (successCallback) {
                    successCallback(data);
                } else {
                    target.setState({
                        challenge: data.challenge
                    });
                }
            }).onClose(function() {
                console.log(`极验onClose`);
            }).onError(function(err) {
                console.log(`极验onError: ${err}`);
                if (err && err.code === '1001') {
                    if (errorCallback) {
                        errorCallback();
                    } else {
                        target.setState({
                            challenge: ''
                        });
                    }

                }
            });
            sense.sense();
        });

    }
};

export default getSenseKey;