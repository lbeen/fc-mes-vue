import axios from 'axios'
import {getToken, removeToken, refreshLastTime, checkLoginExpire, setToken, getUserInfo} from './auth'
import {ElMessageBox} from 'element-plus'
import router from '@/router'
import Tips from '@/utils/Tips'

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
        return instance.post('/system/refreshToken', getUserInfo()).then(response2 => {
            const token = response2.data.data
            if (token) {
                setToken(token)
                response.config.headers.token = token
                return instance(response.config)
            }

            jumpToLogin()
        }).catch(jumpToLogin)
    }

    refreshLastTime(response.headers.date)
    return Promise.resolve(response)
}, error => {
    const status = error.response.status
    if (status === 401) {
        jumpToLogin()
        return
    }
    return Promise.reject(error)
})

function jumpToLogin() {
    removeToken()
    Tips.alert('未登录或者登录过期，请重新登录', () => router.replace('/login'))
}

export default instance