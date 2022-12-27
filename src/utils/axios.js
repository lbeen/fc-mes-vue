import axios from 'axios'
import {getToken, removeToken, refreshLastTime, checkLoginExpire, setToken} from './auth'
import {ElMessageBox} from 'element-plus'
import router from '@/router'

const instance = axios.create({
    baseURL: '/api',
    timeout: 300000
})

instance.interceptors.request.use(config => {
        config.headers.token = getToken() || ''
        return config
    },
    error => Promise.reject(error)
)
instance.interceptors.response.use(response => {
    const code = response.data.code
    if (code === 401) {
        if (checkLoginExpire()) {
            jumpToLogin()
            return
        }
        return instance.post('/system/refreshToken').then(response2 => {
            const token = response2.data.token
            if (!token) {
                jumpToLogin()
                return
            }

            setToken(token)
            return instance(response.config)
        }).catch(jumpToLogin)
    }

    refreshLastTime()
    return Promise.resolve(response)
}, error => {
    const status = error.response.status
    if (status === 401) {
        jumpToLogin()
        return
    }
    return Promise.reject(error)
})

function jumpToLogin(){
    removeToken()
    ElMessageBox.alert('未登录或者登录过期，请重新登录', 'Title', {
        confirmButtonText: 'OK',
        callback: () => router.replace('/login')
    })
}

export default instance