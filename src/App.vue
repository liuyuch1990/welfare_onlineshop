<!--
 * @Description: 登录组件
 * @Author: hai-27
 * @Date: 2020-02-19 20:55:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-22 13:39:49
 -->
<template>
  <div id="app" name="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      beforeUnload_time: 0,
      gap_time: 0,
    };
  },
  mounted() {
    // window.addEventListener("unload", (e) => this.unloadHandler(e));
    // window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
  },
  methods: {
    unloadHandler() {
      this.gap_time = new Date().getTime() - this.beforeUnload_time;
      this.$message.success(this.gap_time);
      if (this.gap_time <= 5) {
        // 关闭浏览器执行的方法
        localStorage.removeItem("shopCar");
      } else {
        // 刷新浏览器执行方法
        // this.$message.error("刷新")
      }
    },
    beforeunloadHandler() {
      this.beforeUnload_time = new Date().getTime();
    },
  },
  destroyed() {
    // window.removeEventListener("beforeunload", (e) =>
    //   this.beforeunloadHandler(e)
    // );
    //   window.removeEventListener("unload", (e) =>
    //   this.unloadHandler(e)
    // );
  },
};
</script>
<style>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
  max-height: calc(100%);
  text-decoration: none;
}
</style>