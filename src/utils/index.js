export function setLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage(key) {
    return window.localStorage.getItem(key)
}

export function removeLocalStorage(key) {
    window.localStorage.removeItem(key)
}