/*
 * @Description: 配置文件
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-21 10:14:53
 */
module.exports = {
    publicPath: './',
    productionSourceMap: false, //关闭线上源代码
    outputDir: process.env.VUE_APP_FILE_Name, // 打包文件名
    devServer: {
        open: false,
        // host: '192.168.1.104',
        host: 'localhost',
        port: 8001,
        proxy: {
            '/wsp-boot': {
                target: process.env.VUE_APP_LINK, // 线上后端地址
                changeOrigin: true, //允许跨域
                ws: true,
                pathRewrite: {
                    '^/wsp-boot': '/wsp-boot'
                },
            },
            '/ws': {
                target: 'https://apis.map.qq.com', //对应后端baseUrl
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/ws': '/ws'
                }
            },
        }
    }
}