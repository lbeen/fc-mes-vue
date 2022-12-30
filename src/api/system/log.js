import {ajaxGet} from '@/api/api'

export function queryLogPage(param, callback) {
    ajaxGet('system/log/queryLogPage', param, callback)
}

export function queryLogById(id, callback) {
    ajaxGet('system/log/queryLogById', {id}, callback)
}