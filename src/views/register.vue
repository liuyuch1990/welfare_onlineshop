<!--
 * @Author: 1vv
 * @Date: 2021-10-25 11:43:58
 * @LastEditTime: 2021-12-16 11:21:52
 * @LastEditors: Please set LastEditors
 * @Description: I注册页面
 * @FilePath: \online-shop\src\views\Register.vue
-->

<template>
  <!-- 注册 -->
  <div class="container relative">
    <div class="header">
      <img src="../assets/logo.png" alt="" />
      <span>福利电商平台</span>
    </div>
    <div class="content">
      <div class="content-register relative">
        <!-- <img
          class="container_image absolute"
          src="https://img.alicdn.com/imgextra/i4/O1CN01qjtOii1nbyDC5PMK9_!!6000000005109-0-tps-2500-600.jpg"
          alt=""
        /> -->
        <div class="content-register-form">
          <p class="flex-around">
            <span class="register-title">注册</span>
          </p>
          <p class="register-title-ENG">REFISTER</p>
          <div class="register-input-div">
            <el-form
              :model="registerUser"
              :rules="rules"
              status-icon
              ref="ruleForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="userCom">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入公司编号"
                  clearable=""
                  size="small"
                  v-model="registerUser.userCom"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userNo">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入工号"
                  clearable=""
                  size="small"
                  v-model="registerUser.userNo"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userName">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入姓名"
                  clearable=""
                  size="small"
                  v-model="registerUser.userName"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userPhone">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请输入11位手机号"
                  clearable=""
                  size="small"
                  v-model="registerUser.userPhone"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userCheckPhone">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  placeholder="请再次确认手机号"
                  clearable=""
                  size="small"
                  v-model="registerUser.userCheckPhone"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userPwd">
                <el-input
                  prefix-icon="el-icon-view"
                  type="password"
                  placeholder="6-16位密码"
                  clearable=""
                  size="small"
                  v-model="registerUser.userPwd"
                  @keydown.enter.native="enterHandleRegister()"
                ></el-input>
              </el-form-item>
              <p class="text-right">
                <router-link to="./login">
                  <span class="go-regist-btn">使用已有账户登录</span>
                </router-link>
              </p>
            </el-form>
          </div>
          <el-button class="register-btn" type="primary" @click="handleRegister"
            >注册</el-button
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
    // 公司编码校验方法
    let validateUserCom = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入公司编号"));
      } else {
        // callback();
        //   发请求
        // -------------------------------------------------------------------------
        this.$request
          .getNoneToken(this.api.checkCom + this.registerUser.userCom)
          .then((res) => {
            if (res.resultCode !== 20000) {
              callback(new Error("公司编号不正确"));
            } else {
              callback();
            }
          });
      }
    };
    // 用户名校验
    let validateUserName = (rule, value, callback) => {
      let reg = /^[\u2E80-\u9FFF]{2,6}$/;
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        if (!reg.test(value)) {
          callback([new Error("姓名输入不合法")]);
        } else {
          callback();
        }
      }
    };
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
    // 手机号二次验证校验方法
    let validateUserCheckPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入手机号"));
      } else if (value !== this.registerUser.userPhone) {
        callback(new Error("两次输入手机号不一致!"));
      } else {
        callback();
      }
    };
    // 密码验证校验方法
    let validateUserPwd = (rule, value, callback) => {
      let reg = /^(\d|\w|.){6,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码在6-16位之间"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {},
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { validator: validateUserName, trigger: "blur" },
        ],
        userCom: [{ validator: validateUserCom, trigger: "blur" }],
        userNo: [{ required: true, message: "请输入工号", trigger: "blur" }],
        userPhone: [{ validator: validateUserPhone, trigger: "blur" }],
        userCheckPhone: [
          { validator: validateUserCheckPhone, trigger: "blur" },
        ],
        userPwd: [{ validator: validateUserPwd, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.enterHandleRegister();
  },
  methods: {
    enterHandleRegister() {
      document.onkeydown = () => {
        let key = window.event.keyCode;
        if (key == 13) {
          this.handleRegister();
        }
      };
    },
    handleRegister() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          delete this.registerUser.userCheckPhone;
          const queryForm = this.registerUser;
          queryForm.userPwd = this.$md5(queryForm.userPwd) + "aab";
          this.$request.postNoneToken(this.api.register, queryForm).then((res) => {
            if (res.resultCode == 20000) {
              this.$message.success("注册成功，自动跳转登录页...");
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            } else {
              // 请求失败吧密码置空
              queryForm.userPwd = "";
              this.registerUser.userPwd = "";
              this.$message.error(res.message);
            }
          });
        } else {
          // return false;
        }
        //如果通过校验开始注册
      });
    },
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

.content-register {
  min-height: 80vh;
  display: flex;
  align-items: center;
}
.container_image {
  width: 100%;
  height: 100%;
  z-index: -10;
  opacity: 0.5;
}
.content-register-form {
  padding: 20px;
  width: 420px;
  height: 640px;
  background: #ffffff;
  border-radius: 4px;
  /* box-shadow: #e99c0d6b 2px 6px 40px 0; */
  border: 6px dotted #786e6e;
  /* border: 6px dotted #f25807; */
  margin: 0 auto;
}
.register-title {
  font-size: 20px;
  text-align: center;
  border-bottom: 2px solid #f25807;
  border-radius: 5%;
  margin-top: 20px;
}
.register-title-ENG {
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}
.register-input-div {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
.register-input-username,
.register-input-password {
  margin-top: 30px;
}
.register-btn {
  display: block;
  margin: 0 auto;
  margin-top: 60px;
  width: 300px;
  background: #ff6700;
  border: 0;
}
.register-btn:hover {
  background: #f25807;
}
.go-regist-btn {
  color: #ff8d1a;
  text-decoration: underline;
  font-size: 14px;
  text-align: right;
  margin-top: 20px;
  margin-right: 0;
  cursor: pointer;
}
</style>