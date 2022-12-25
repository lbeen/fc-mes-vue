import axios from 'axios'
import {ajaxGet, ajaxPost} from '@/api/axios'

export function login(param, callback) {
    ajaxPost('cockpit/lifetimeGt150', param, callback)
}