import {ajaxPost} from '@/api/api'

export function changePassword(param, callback) {
    ajaxPost('system/user/changePassword', param, callback)
}