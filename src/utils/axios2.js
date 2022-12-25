import axios from 'axios'
import { getToken, setToken, getRefreshToken } from '@utils/auth'

// 刷新 access_token 的接口
const refreshToken = () => {
    return instance.post('/auth/refresh', { refresh_token: getRefreshToken() }, true)
}

// 创建 axios 实例
const instance = axios.create({
    baseURL:  process.env.GATSBY_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
})

instance.interceptors.response.use(response => {
    return response
}, error => {
    if (!error.response) {
        return Promise.reject(error)
    }
    // token 过期或无效，返回 401 状态码，在此处理逻辑
    return Promise.reject(error)
})

// 给请求头添加 access_token
const setHeaderToken = (isNeedToken) => {
    const accessToken = isNeedToken ? getToken() : null
    if (isNeedToken) { // api 请求需要携带 access_token
        if (!accessToken) {
            console.log('不存在 access_token 则跳转回登录页')
        }
        instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
}

// 有些 api 并不需要用户授权使用，则不携带 access_token；默认不携带，需要传则设置第三个参数为 true
export const get = (url, params = {}, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance({
        method: 'get',
        url,
        params,
    })
}

export const post = (url, params = {}, isNeedToken = false) => {
    setHeaderToken(isNeedToken)
    return instance({
        method: 'post',
        url,
        data: params,
    })
}