<!--
 * @Author: your name
 * @Date: 2021-10-26 10:57:23
 * @LastEditTime: 2021-10-26 15:01:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\components\header.vue
-->

<template>
  <div class="container">
   <!-- 我的订单头部 -->
    <div class="header">
      <div class="header-content">
        <p>
          <i
            class="el-icon-s-order"
            style="font-size: 30px; color: #ff6700"
          ></i>
         {{showHeader}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return{
        }
    },
    mounted() {
    },
    props:{
        showHeader:{
            type:String,
            default:"-"
        }
    }
};
</script>

<style scoped>
/* 我的订单头部CSS */
.header {
  height: 64px;
  border-bottom: 2px solid #ff6700;
  background-color: #fff;
  margin-bottom: 20px;
}
.header .header-content {
  width: 1225px;
  margin: 0 auto;
}
.header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}

</style>