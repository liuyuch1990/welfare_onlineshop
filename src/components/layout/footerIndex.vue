<!--
 * @Author: your name
 * @Date: 2021-10-22 10:40:09
 * @LastEditTime: 2021-10-26 09:59:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\components\layout\footerIndex.vue
-->
<template>
  <div class="footer">
    <div class="mod_help">
      <!-- <p>
        <router-link to="/index">首页</router-link>
        <span>|</span>
        <router-link to="/goods">全部商品</router-link>
      </p> -->
      <p class="coty">商城版权所有 &copy; 2012-2021</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
/* 底栏容器CSS */
.footer {
  text-align: center;
  background: #2f2f2f;
  padding: 0px;
  height: 60px;
  /* position: relative; */
  min-width: 1225px;
}
.footer .mod_help {
  text-align: center;
  color: #888888;
  width: 100%;
  padding-top: 1px;
}
.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}
.footer .mod_help p a:hover {
  color: #fff;
}
.footer .mod_help p span {
  padding: 0 22px;
}
/* 底栏容器CSS END */
</style>