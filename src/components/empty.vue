<!--
 * @Author: your name
 * @Date: 2021-10-26 10:08:15
 * @LastEditTime: 2021-11-22 14:23:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\components\empty.vue
-->

<template>
  <div class="container">
    <div class="empty">
      <!-- <div class="empty-img">
        <img src="../assets/imgs/cart-empty.png" alt="" />
      </div>
      <div class="empty-tips">
        <h2>您的{{showTitle}}还是空的！</h2>
        <p>快去购物吧！</p>
      </div> -->
      <el-empty class="empty-size" :description="showTitle+'还是空的！'"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    showTitle: {
      type: String,
      default: "-",
    },
  },
};
</script>

<style scoped>
.container {
  height: 50vh;
}
.empty-size{
  width: 100%;
}
.empty {
  height: 100%;
  width: 100%;
  color: #b0b0b0;
  display: flex;
}

.empty-img {
  display: flex;
  align-self: center;
}

.empty-tips {
  margin-left: 50px;
  align-self: center;
}

.empty h2 {
  left: 50px;
  font-size: 36px;
}
.empty p {
  font-size: 20px;
}
</style>