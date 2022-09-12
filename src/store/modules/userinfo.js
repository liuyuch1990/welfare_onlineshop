/*
 * @Author: your name
 * @Date: 2021-11-04 13:54:26
 * @LastEditTime: 2021-11-04 14:15:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\store\modules\userinfo.js
 */

export default {
    state: {
        user: "" || localStorage.getItem('user'), // 登录的用户
    },
    getters: {
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
            localStorage.setItem('user', JSON.stringify(data))
        }
    },
    actions: {
        setUser({ commit }, data) {
            commit('setUser', data);
        }
    }
}