const TOKEN_KEY = 'token'
const USER_INFO_KEY = 'user_info'
const LAST_TIME_KEY = 'last_time'
const EXPIRE_DURATION = 1800000

export const setToken = token => {
    window.sessionStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => window.sessionStorage.getItem(TOKEN_KEY)
export const removeToken = () => {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.removeItem(USER_INFO_KEY)
    window.sessionStorage.removeItem(LAST_TIME_KEY)
}
export const setUserInfo = userInfo => {
    window.sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}
export const getUserInfo = () => {
    const userInfo = window.sessionStorage.getItem(USER_INFO_KEY)
    return userInfo ? JSON.parse(userInfo) : null
}

export const refreshLastTime = date => window.sessionStorage.setItem(LAST_TIME_KEY, date)

export const checkLoginExpire = () => {
    const lastTime = window.sessionStorage.getItem(LAST_TIME_KEY)
    if (!lastTime) {
        return true
    }
    return new Date().getTime() - new Date(lastTime).getTime() > EXPIRE_DURATION
}