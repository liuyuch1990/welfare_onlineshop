<template>
  <div>
    <div class="breadcrumb">
      <i
        class="transition-box"
        :class="{
          rotate360: this.showAnimate,
          'el-icon-s-unfold': this.isCollapse,
          'el-icon-s-fold': !this.isCollapse,
        }"
        @click="showMenu(isCollapse)"
        @animationend="reset()"
      ></i>

      <el-breadcrumb>
        <!-- <el-breadcrumb-item @click="jumpIndex()" :to="{ path: '/' }">首页</el-breadcrumb-item> -->
        <el-breadcrumb-item
          ><a @click="jumpIndex()">首页</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ this.pathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      showAnimate: false,
      pathName: "",
    };
  },
  mounted() {
    console.log(this.pathName);
    /** 监听localstorage路由变化，显示在菜单栏 */
    this.pathName = localStorage.getItem("pathName");
    this.$bus.$on("pathNameChange", (res) => {
      this.pathName = res;
    });
  },
  methods: {
    jumpIndex() {
      this.$router.push("/");
      localStorage.setItem("path", "/");
    },
    showMenu(e) {
      if (e) {
        this.$bus.$emit("foleMenu", (this.isCollapse = false));
      } else {
        this.$bus.$emit("foleMenu", (this.isCollapse = true));
      }
      this.showAnimate = true;
    },
    reset() {
      this.showAnimate = false;
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  background: #ffffff;
  height: 40px;
}
.el-icon-s-fold,
.el-icon-s-unfold {
  font-size: 24px;
  margin-left: 10px;
  margin-right: 20px;
}

@keyframes rorate360 {
  100% {
    transform: rotate(360deg);
  }
}
.rotate360 {
  animation: rorate360 1s;
}
</style>