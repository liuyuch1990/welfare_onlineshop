/*
 * @Author: your name
 * @Date: 2021-11-01 15:20:10
 * @LastEditTime: 2021-11-17 14:48:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\api\1vv.js
 */

export const APIV = {
    login: '/user/login', //登录
    queryDept: '/dept/queryDeptList', //登录
    register: '/user/register', // 注册
    checkCom: '/com/check/', // 校验公司编码
    goodsDetail: '/goods/queryById', //商品详情
    getAddress: '/addr/queryList', //获取地址
    checkOrder: '/order/createOrderCheck', // 下单校验
    createOrder: '/order/createOrder', // 确认下单
    getWallet: '/gift/card/wallet', // 查询用户余额
    getUser: '/user/queryById', // 获取用户信息
    exchangeCard: '/gift/card/exchange/', // 兑换礼品卡
}