<template>
  <div class="container">
    <!-- 头部 -->
    <header-page :showHeader="headerTitle"></header-page>
    <!-- 地址管理 -->
    <div class="content">
      <address-page v-on:getAddress="getAddress"  v-if="isShow" v-bind:getSelected="getSelected"></address-page>
      <empty-page :showTitle="emptyTitle" v-else></empty-page>
    </div>
    <!-- 地址信息END -->
  </div>
</template>
<script>
import headerPage from "../components/header.vue";
import emptyPage from "../components/empty.vue";
import addressPage from "../components/address.vue"
export default {
  data() {
    return {
      headerTitle: "地址管理",
      emptyTitle: "地址",
      isShow: "",
      address:[],//用来获取子组件传过来的值
      getSelected:false,//向子组件中传值
      
    };
  },
  components: {
    headerPage,
    emptyPage,
    addressPage
  },
  methods: { 
    //用来获取子组件传过来的参数的方法
    getAddress(val){
      this.address=val;//addres就获取了子组件中传过来的值
    },
    //是否显示为空的样式
    isShowHandle() {
      if (this.address) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  created() {
    this.isShowHandle();
  },
  mounted(){
    this.getAddress();
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  background-color: white;
}
/* 内容css */
.content {
  background-color: white;
  width: 80%;
  margin: 0 auto;
}

/* 内容css结束 */

.el-button {
  color: rgb(255, 103, 0);
}
.el-button--primary {
  background-color: white;
  border-color: rgb(255, 103, 0);
}
.el-descriptions__header {
  margin-bottom: 5px;
}
</style>