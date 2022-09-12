<template>
  <div class="navigation">
    <div class="navigation-width">
      <div class="navigation-left"  @click="jumpIndex()">
        <img class="navigation-logo" src="@/assets/logo.png" alt="" />
        <span class="navigation-title">SCADA Demo</span>
      </div>
      <div class="navigation-right">
        <img class="navigation-right-notice" src="@/assets/notice.svg" alt="" />
        <!-- <p class="navigation-right-line"></p> -->
        <el-popover
          placement="top-start"
          width="120"
          trigger="hover"
        >
        <div><span class="navigation-">退出登录</span></div>
          <div slot="reference" class="navigation-avatar">
            <img
              class="navigation-right-avatar"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              alt=""
            />
            <span class="navigation-right-nickname">王祎微王祎微</span>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
  methods:{
    jumpIndex(){
      this.$router.push('/')
      localStorage.setItem('path','/')
    }
  }
};
</script>
<style scoped>
.navigation-width {
  width: 100%;
  height: 48px;
  background: #323b5d;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgb(31 35 41 / 10%);
}
.navigation-left,
.navigation-right,.navigation-avatar {
  display: flex;
  align-items: center;
  cursor: default;
}
.navigation-logo {
  width: 24px;
  margin-left: 22px;
  margin-right: 5px;
}
.navigation-title {
  font-size: 22px;
  color: #ffffff;
}
.navigation-right {
  /* display: flex; */
  margin-right: 20px;
}
.navigation-right-notice {
  width: 20px;
  margin-right: 26px;
}
.navigation-right-line {
  height: 60px;
  border-right: 1px solid #ffffff;
  margin-right: 26px;
}
.navigation-right-avatar {
  width: 24px;
  height: 24px;
  border-radius: 10%;
  margin-right: 8px;
}
.navigation-right-nickname {
  font-size: 14px;
  color: #ffffff;
}
</style>