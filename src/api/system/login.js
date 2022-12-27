import {ajaxPost} from '@/api/api'

export function doLogin(param, callback) {
    ajaxPost('system/login', param, callback)
}