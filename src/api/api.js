/*
 * @Author: your name
 * @Date: 2021-10-25 16:48:10
 * @LastEditTime: 2021-12-16 11:21:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\api\api.js
 */

import {
    service,
    serviceNoneToken
} from '@/utils/request'
import {
    APIV
} from './1vv'
import { APID } from './base'

export const base = APID
export const api = APIV

// 请求方法
export const $request = {
    get(url, parameter) {
        return service({
            url: url,
            method: 'get',
            params: parameter,
        })
    },
    post(url, parameter) {
        return service({
            url: url,
            method: 'post',
            data: parameter,
        })
    },
    put(url, parameter) {
        return service({
            url: url,
            method: 'put',
            data: parameter
        })
    },
    delete(url, parameter) {
        return service({
            url: url,
            method: 'delete',
            params: parameter
        })
    },
    postNoneToken(url, parameter) {
        return serviceNoneToken({
            url: url,
            method: 'post',
            data: parameter,
        })
    },
    getNoneToken(url, parameter) {
        return serviceNoneToken({
            url: url,
            method: 'get',
            data: parameter,
        })
    },
    getDeptList(url, parameter) {
        return serviceNoneToken({
            url: url,
            method: 'get',
            data: parameter,
        })
    },
}