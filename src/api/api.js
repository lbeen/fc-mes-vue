import instance from '@/utils/axios'
import {ElMessage} from 'element-plus'

/**
 * GET获取数据
 */
export function ajaxGet(url, params, success, error) {
    handlePromise(instance.get(url, {params}), success, error)
}

/**
 * post提交数据
 */
export function ajaxPost(url, data, success, error) {
    handlePromise(instance.post(url, data), success, error)
}

function handlePromise(promise, success, error) {
    promise.then(response => {
        const result = response.data
        if (!result) {
            if (error) {
                error(result)
            }
            ElMessage.error('系统错误')
            return
        }
        if (result.code === 0) {
            if (result.message) {
                ElMessage.success(result.message)
            }
            if (success) {
                success(result.data)
            }
            return
        }
        if (result.message) {
            ElMessage.error(result.message)
        }
        if (error) {
            error(result)
        }
    }).catch(error => {
        if (error) {
            error()
        }
        ElMessage.error('系统错误')
    })
}