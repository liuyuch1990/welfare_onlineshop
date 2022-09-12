<!--
 * @Author: your name
 * @Date: 2021-10-25 10:00:18
 * @LastEditTime: 2021-10-26 17:03:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\components\layout\layoutIndex.vue
-->
<template>
  <div>
    <el-container  class="layout-container">
        <el-header><menu-list></menu-list></el-header>
        <el-main>
          <!-- <keep-alive> -->
            <router-view class='el-main-content'></router-view>
          <!-- </keep-alive> -->
        </el-main>
        <el-footer><footer-index></footer-index></el-footer>
      </el-container>
  </div>
</template>

<script>
// import Breadcrumb from './breadcrumb.vue';
import MenuList from "./menuList.vue";
import FooterIndex from "./footerIndex.vue";
// import navigation from "./navigation.vue";
export default {
  data() {
    return {
      menuWidth: "200",
    };
  },
  mounted(){

  },
  components: {  MenuList, FooterIndex},
};
</script>   

<style>
.el-container {
  height:100%
}
.layout-container .el-header{
  height:auto !important;
  text-align: center;
  padding: 0;
}
.layout-container .el-main{
  min-width: 1225px;
  height: 100%;
  /* min-height: 100%; */
  padding: 0;
  background-color:white;
}
.el-main .el-main-content{
  height: 100%;
}
.layout-container .el-footer{
  padding: 0;
}
</style>
<style scoped>
.layout-container {
  background: #f2f3f5;
  min-width: 1225px;
  min-height: 100vh;
  
}

</style>