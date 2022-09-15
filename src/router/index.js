/*
 * @Description: 路由配置
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-16 11:00:19
 */
import Vue from 'vue'
import Router from 'vue-router'
import layoutIndex from '@/components/layout/layoutIndex'

Vue.use(Router)

const routes = [

    {
        path: '/',
        name: '首页',
        mate: { title: 'layoutIndex' },
        component: layoutIndex,
        children: [{
                path: "/",
                mate: { title: 'index' },
                name: '首页',
                component: () =>
                    import ('@/views/'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            }, {
                path: '/error',
                name: 'Error',
                component: () =>
                    import ('../components/Error.vue')
            },
            {
                path: '/goods',
                name: 'Goods',
                component: () =>
                    import ('../views/Goods.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: '/goods/details',
                name: 'Details',
                component: () =>
                    import ('../views/Details.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: '/shoppingCart',
                name: 'ShoppingCart',
                component: () =>
                    import ('../views/ShoppingCart.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: '/collect',
                name: 'Collect',
                component: () =>
                    import ('../views/Collect.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: '/order',
                name: 'Order',
                component: () =>
                    import ('../views/Order.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: '/confirmOrder',
                name: 'ConfirmOrder',
                component: () =>
                    import ('../views/ConfirmOrder.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: '/index',
                name: 'index',
                component: () =>
                    import ('../views/index.vue')
            },
            {
                path: '/person',
                name: 'person',
                component: () =>
                    import ('../views/person.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: '/account',
                name: 'account',
                component: () =>
                    import ('../views/account.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },
            {
                path: '/address',
                name: 'address',
                component: () =>
                    import ('../views/address.vue'),
                meta: {
                    requireAuth: true // 需要验证登录状态
                }
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue'),
        meta: {
            requireAuth: false // 需要验证登录状态
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/register.vue'),
        meta: {
            requireAuth: false // 需要验证登录状态
        }
    },

]

const router = new Router({
    // mode: 'history',
    routes
})


router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.path == '/login' || to.path == '/register') {
        next()
    } else {
        if (!localStorage.getItem("Online-token")) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    }
})

/* 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。*/
// 禁止全局路由错误处理打印
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject)
//         return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }

export default router