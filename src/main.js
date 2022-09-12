/*
 * 入口文件
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 10:14:35
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { api, base, $request } from './api/api'
Vue.prototype.api = api;
Vue.prototype.base = base;
Vue.prototype.$request = $request;

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
Vue.use(ElementUI);


import md5 from 'js-md5';
Vue.prototype.$md5 = md5;


import '@/assets/css/public.css'

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.prototype.$target = process.env.VUE_APP_LINK + "/wsp-boot";

// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
    var time = new Date(dataStr);

    function timeAdd0(str) {
        if (str < 10) {
            str = '0' + str;
        }
        return str;
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

//全局组件
import MyMenu from './components/MyMenu';
Vue.component(MyMenu.name, MyMenu);
import MyList from './components/MyList';
Vue.component(MyList.name, MyList);
import MyLogin from './components/MyLogin';
Vue.component(MyLogin.name, MyLogin);
import MyRegister from './components/MyRegister';
Vue.component(MyRegister.name, MyRegister);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')