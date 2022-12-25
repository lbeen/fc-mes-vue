const TOKEN_KEY = 'token'
const LAST_TIME_KEY = 'last_time'
const EXPIRE_DURATION = 30000

export const setToken = token => window.sessionStorage.setItem(TOKEN_KEY, token)

export const getToken = () => window.sessionStorage.getItem(TOKEN_KEY)

export const refreshLastTime = response_time => window.sessionStorage.setItem(LAST_TIME_KEY, response_time)

export const checkLoginExpire = () => {
    const lastTime = window.sessionStorage.getItem(LAST_TIME_KEY)
    if (!lastTime) {
        return true
    }
    return new Date().getTime() - Number(lastTime) <= EXPIRE_DURATION
}