import axios from 'axios'
import {ElMessage, ElMessageBox} from 'element-plus'
import router from '@/router/index'
import {getLocalStorage, removeLocalStorage} from './index'
import {getToken, refreshLastTime, checkLoginExpire} from './auth'

axios.defaults.baseURL = 'api'
axios.interceptors.request.use(config => {
        config.headers.Authorization = getToken() || ''
        return config
    },
    error => Promise.reject(error)
)
axios.interceptors.response.use(response => {
    const responseTime = response.headers.response_time

    refreshLastTime()

    const result = response.data
    if (result.code === 0) {
        if (result.message) {
            ElMessage.success(result.message)
        }
        return Promise.resolve(result.data)
    }
    if (result.message) {
        ElMessage.error(result.message)
    }

    return Promise.reject(response)
}, error => {

        removeLocalStorage()
        ElMessageBox.alert('未登录或者登录过期，请重新登录', 'Title', {
            confirmButtonText: 'OK',
            callback: () => router.replace('/login')
        })
    }
    return Promise.reject(error)
})

export default axios