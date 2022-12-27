import {ajaxGet, ajaxPost} from '@/api/api'

export function doLogin(param, callback) {
    ajaxPost('system/login', param, callback)
}

export function getUser(id, callback) {
    ajaxGet('system/user/getUser', {id:id}, callback)
}