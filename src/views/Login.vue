<!--
 * @Author: 1vv
 * @Date: 2021-10-22 10:40:09
 * @LastEditTime: 2022-03-09 18:48:55
 * @LastEditors: Please set LastEditors
 * @Description: 登录
 * @FilePath: \online-shop\src\views\Login.vue
-->


<template>
  <!-- 注册 -->
  <div class="container relative">
    <div class="header">
      <!-- <img src="../assets/logo.png" alt="" /> -->
      <span>福利电商平台</span>
    </div>
    <div class="content">
      <div class="content-login relative">
        <img
          class="container_image absolute"
          src="../assets/980.jpg"
          alt=""
        />
        <div class="content-login-form">
          <p class="flex-around">
            <span class="login-title">登录</span>
          </p>
          <p class="login-title-ENG">LOGIN</p>
          <div class="login-input-div">
            <el-form
              :model="LoginUser"
              :rules="rules"
              status-icon
              ref="ruleForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="userPhone">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入手机号"
                  clearable=""
                  size="small"
                  v-model="LoginUser.userPhone"
                ></el-input>
              </el-form-item>
               <el-form-item prop="userCom">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入公司码"
                  clearable=""
                  size="small"
                  v-model="LoginUser.userCom"
                ></el-input>
              </el-form-item>
               <el-form-item prop="giftCardNum">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入礼品卡号"
                  clearable=""
                  size="small"
                  v-model="LoginUser.giftCardNum"
                ></el-input>
              </el-form-item>
              <el-form-item prop="giftCardNum">
                <el-select v-model="LoginUser.userDept" placeholder="请选择体系">
                  <el-option
                          v-for="item in deptList"
                          :key="item.id"
                          :label="item.departmentName"
                          :value="item.departmentName">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <p class="text-right">
                <router-link to="./register">
                  <span class="go-login-btn">暂无账号，去注册</span>
                </router-link>
              </p> -->
            </el-form>
          </div>
          <el-button class="login-btn" type="primary" @click="handleLogin"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyLogin",
  data() {
    // 手机号校验方法
    let validateUserPhone = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/;
      if (!value) {
        callback(new Error("请输入手机号"));
      } else {
        if (!reg.test(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      }
    };
    return {
      LoginUser: {
        userPhone: "",
        userCom: "",
        userDept: "",
        giftCardNum:""
      },
      deptList: [],
      rules: {
        userPhone: [{ validator: validateUserPhone, trigger: "blur" }],
      },
    };
  },
  created() {
    this.queryDeptList();
    this.enterHandleLogin();
  },
  methods: {
    enterHandleLogin() {
      document.onkeydown = () => {
        let key = window.event.keyCode;
        if (key == 13) {
          this.handleLogin();
        }
      };
    },
    queryDeptList() {
      this.$request.getDeptList(this.api.queryDept,this.LoginUser).then((res) => {
        if (res.resultCode == 20000) {
          this.deptList = res.data
        }
      });
    },
    handleLogin() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate((valid) => {
        //如果通过校验开始登录
        if (valid) {
          this.$request.postNoneToken(this.api.login,this.LoginUser).then((res) => {
            if (res.resultCode == 20000) {
              const tempUserInfo = {
                userCom: res.data.user.userCom,
                userName: res.data.user.userName,
                userNo: res.data.user.userNo,
                userPhone: res.data.user.userPhone,
                userId: res.data.user.userId,
              };
              if (!res.data.map.token) {
                this.$message.error("服务器异常，请稍后再试!");
              } else {
                localStorage.setItem("Online-token", res.data.map.token);
                localStorage.setItem("userInfo", JSON.stringify(tempUserInfo));
                  this.$message.success("登录成功");
                  setTimeout(() => {
                    this.$router.push("/");
                  }, 1500);
                }
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    }
  },
};
</script>
<style scoped>
.container {
  min-width: 1225px;
  height: 100vh;
}
.content {
}
.header {
  height: 60px;
  display: flex;
  align-items: center;
  color: #292929;
  margin-left: 20px;
}
.header > img {
  height: 40px;
  margin-right: 6px;
}
.header > span {
  font-size: 26px;
}

.content-login {
  min-height: 80vh;
  display: flex;
  align-items: center;
}
.container_image {
  width: 100%;
  height: 100%;
  z-index: -10;
  opacity: 0.8;
}
.content-login-form {
  padding: 20px;
  width: 390px;
  height: 510px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: #e99c0d6b 2px 6px 40px 0;
  margin: 0 auto;
}
.login-title {
  font-size: 20px;
  text-align: center;
  border-bottom: 2px solid #f25807;
  border-radius: 5%;
  margin-top: 20px;
}
.login-title-ENG {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}
.login-input-div {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
.login-input-username,
.login-input-password {
  margin-top: 30px;
}
.login-btn {
  display: block;
  margin: 0 auto;
  margin-top: 100px;
  width: 300px;
  background: #ff6700;
  border: 0;
}
.login-btn:hover {
  background: #f25807;
}
.go-login-btn {
  color: #ff8d1a;
  text-decoration: underline;
  font-size: 14px;
  text-align: right;
  margin-top: 20px;
  margin-right: 0;
  cursor: pointer;
}
</style>