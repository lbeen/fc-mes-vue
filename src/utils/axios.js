import axios from 'axios'
import {ElMessage, ElMessageBox} from 'element-plus'
import router from '@/router/index'
import {getLocalStorage, removeLocalStorage} from './index'
// import {useRouter} from 'vue-router'
// import config from '~/config'

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = 'api'
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
// axios.defaults.withCredentials = true
// // 请求头，headers 信息
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = getLocalStorage('token') || ''
// // 默认 post 请求，使用 application/json 形式
// axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use(config => {
        config.headers.Authorization = getLocalStorage('token') || ''
        return config
    },
    error => Promise.reject(error)
)
axios.interceptors.response.use(response => {
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
    const status = error.response.status
    if (status === 401) {
        removeLocalStorage()
        ElMessageBox.alert('未登录或者登录过期，请重新登录', 'Title', {
            confirmButtonText: 'OK',
            callback: () => {
                router.replace('/login')
            }
        })
    }
    return Promise.reject(error)
})

export default axios