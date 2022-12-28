import {ElMessage, ElMessageBox} from 'element-plus'

function success(message) {
    ElMessage({
        type: 'success',
        message: message,
        duration: 5000,
        showClose: true
    })
}

function error(message) {
    ElMessage({
        type: 'error',
        message: message,
        duration: 5000,
        showClose: true
    })
}

function alert(message, okFun, title, okText) {
    ElMessageBox.alert(message, title || '提示', {
        confirmButtonText: okText || '确定',
        callback: () => {
            if (okFun) {
                okFun()
            }
        }
    })
}

export default {
    success,
    error,
    alert
}