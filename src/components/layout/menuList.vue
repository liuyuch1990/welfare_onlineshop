<template>
  <div class="topbar">
        <div class="nav">
          <ul>
            <li>
              <span>{{userInfo.userName}}</span>
            </li>
            <li>
              <el-popover placement="top" width="180" v-model="visible">
                <p>确定退出登录吗？</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button size="mini" type="text" @click="visible = false"
                    >取消</el-button
                  >
                  <el-button type="primary" size="mini" @click="logout"
                    >确定</el-button
                  >
                </div>
                <el-button class="nav-logout" type="text" slot="reference">退出登录</el-button>
              </el-popover>
            </li>
            
          </ul>
        </div>
        <div class="navLeft">
          <ul>
            <li>
              <router-link to="/index">首页</router-link>
            </li>
            <li>
              <router-link to="/order">我的订单</router-link>
            </li>
            <!-- <li :class="shopCarNum.length > 0 ? 'shopCart-full' : 'shopCart'"> -->
            <li class="shopCart">
              <router-link to="/shoppingCart">
                <i class="el-icon-shopping-cart-full"></i> 购物车
                <!-- <span class="num">({{ shopCarNum.length }})</span> -->
              </router-link>
            </li>
            <li>
              <router-link to="/person">个人信息</router-link>
            </li>
            <li>
              <router-link to="/address">地址管理</router-link>
            </li>
            <li>
              <router-link to="/account">账户余额</router-link>
            </li>
          </ul>
        </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
      userInfo:{},
      visible: false, // 是否退出登录
      shopCarNum:JSON.parse(sessionStorage.getItem("shopCar"))
    };
  },
  created(){
    this.userInfo=JSON.parse(localStorage.getItem("userInfo")) 
  //  如果调取用户信息失败后，显示默认用户名
   if(!this.userInfo){
     this.userInfo={
       userName:""
     }
   }
  },
  methods: {
    // 退出登录
    logout() {
      this.visible = false;
      // 清空本地登录信息
      localStorage.removeItem("Online-token");
      this.$message.success('退出成功')
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000);
    },
  }
};
</script>

<style scoped>
/* 顶部导航栏CSS */
.topbar {
  height: 44px;
  padding: 11px 0;
  background-color: #3d3d3d;
  min-width: 1225px;
  /* margin-bottom: 20px; */
}
.topbar .nav {
  margin: 0 auto;
}
.topbar .navLeft ul {
  float: left;
}
.topbar .navLeft li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .navLeft li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .navLeft a:hover {
  color: #fff;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.topbar .nav .shopCart-full a {
  color: white;
}
.nav-logout{
  margin-right: 20px;
}
</style>
