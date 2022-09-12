/*
 * @Author: 1vv
 * @Date: 2021-10-25 16:37:32
 * @LastEditTime: 2021-12-16 11:18:49
 * @LastEditors: Please set LastEditors
 * @Description: axios请求封装
 * @FilePath: \online-shop\src\assets\utils\api.js
 */

// 导入axios
import axios from 'axios'
import router from '@/router'
import {
    Message,
    MessageBox
} from 'element-ui'
console.log(axios)
    //1. 创建新的axios实例，
export const service = axios.create({
        baseURL: "/wsp-boot",
        // 超时时间 单位是ms，这里设置了3s的超时时间
        timeout: 3 * 1000
    })
    // 2.请求拦截器
service.interceptors.request.use(config => {
    config.headers['token'] = localStorage.getItem('Online-token') // 让每个请求携带自定义token
        // 让每个请求携带自定义token
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
}, error => {
    Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(res => {
        // 是否需要设置 token
        const isToken = res.headers.token
        if (!isToken) {
            Message.error("服务器异常，请稍后再试!")
        } else if (isToken) {
            localStorage.setItem('Online-token', res.headers.token)
        }

        // 未设置状态码则默认成功状态
        const code = res.data.resultCode || 20000
            // 获取错误信息
            // const msg = errorCode[code] || res.data.msg || errorCode['default']
        if (code === 30000) {
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                setTimeout(() => {
                    router.push('/login')
                }, 1500);
            }).catch(() => {});
            // return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            Message.error("服务器异常")
            return Promise.reject(new Error('服务器异常'))
        } else {
            return res.data
        }
    },
    error => {
        console.log('err' + error)
        Message.error("服务器异常")
    }
)




export const serviceNoneToken = axios.create({
        baseURL: "/wsp-boot",
        // 超时时间 单位是ms，这里设置了3s的超时时间
        timeout: 3 * 1000
    })
    // 2.请求拦截器
serviceNoneToken.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
}, error => {
    Promise.reject(error)
})

// 3.响应拦截器
serviceNoneToken.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.resultCode || 20000
            // 获取错误信息
            // const msg = errorCode[code] || res.data.msg || errorCode['default']
        if (code === 30000) {
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                setTimeout(() => {
                    router.push('/login')
                }, 1500);
            }).catch(() => {});
            // return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            Message.error("服务器异常")
            return Promise.reject(new Error('服务器异常'))
        } else {
            return res.data
        }
    },
    error => {
        console.log('err' + error)
        Message.error("服务器异常")
    }
)