import instance from '@/utils/axios'
import Tips from '@/utils/Tips'

/**
 * GET获取数据
 */
export function ajaxGet(url, params, callback, errorCallback) {
    handlePromise(instance.get(url, {params}), callback, errorCallback)
}

/**
 * post提交数据
 */
export function ajaxPost(url, data, callback, errorCallback) {
    handlePromise(instance.post(url, data), callback, errorCallback)
}

function handlePromise(promise, callback, errorCallback) {
    promise.then(response => {
        const result = response.data
        if (!result) {
            if (errorCallback) {
                errorCallback(result)
            }
            Tips.error('系统错误')
            return
        }
        if (result.code === 0) {
            if (result.message) {
                Tips.success(result.message)
            }
            if (callback) {
                callback(result.data)
            }
            return
        }
        if (result.message) {
            Tips.error(result.message)
        }
        if (errorCallback) {
            errorCallback(result)
        }
    }).catch(error => {
        console.log(error)
        if (errorCallback) {
            errorCallback()
        }
        Tips.error('系统错误')
    })
}