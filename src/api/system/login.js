import {ajaxPost} from '@/api/api'

export function doLogin(param, callback) {
    ajaxPost('cockpit/lifetimeGt150', param, callback)
}