/*
 * @Description: Vuex入口
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-04 14:14:33
 */
import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/userinfo'
import shoppingCart from './modules/shoppingCart'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        user,
        shoppingCart
    }
})