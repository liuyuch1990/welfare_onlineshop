<!--
 * @Author: 1vv
 * @Date: 2021-10-25 10:00:18
 * @LastEditTime: 2021-12-21 10:13:53
 * @LastEditors: Please set LastEditors
 * @Description: 充值页面
 * @FilePath: \online-shop\src\views\account.vue
-->

<template>
  <div class="account">
    <header-page :showHeader="headerTitle"></header-page>
    <div class="account-content">
      <div class="content-info">
        <el-form
          :model="form"
          :rules="rules"
          status-icon
          ref="ruleForm"
          class="account-ruleForm"
        >
          <el-form-item label="绑定手机号">
            <span>{{ form.userPhone }}</span>
          </el-form-item>
          <el-form-item label="公司编号：">
            <span>{{ form.userCom }}</span>
          </el-form-item>
          <el-form-item label="账户余额：">
            <span v-if="!Haswallet">0</span>
            <span v-else v-for="item in walletList"
              :key="item.id"
              class="account-ruleForm-wallet"><span v-html="form.wallet">{{ form.wallet }}</span>
              </span>
           
          </el-form-item>
          <!--切换充值隐藏信息 -->
          <div v-if="!showPayInput">
            <p v-if="Haswallet" class="content-tips">
              请尽快进行兑换，以免过期失效
            </p>
            <p v-if="!Haswallet" class="content-tips">
              请输入礼品卡编号进行充值
            </p>
            <el-button
              v-if="!showPayInput&&!Haswallet"
              class="submit-btn"
              type="primary"
              @click="showPay"
              >充值</el-button
            >
          </div>

          <!-- 展示输入input -->
          <div v-if="showPayInput">
            <el-form-item prop="giftCardNum" label="礼品卡卡号">
              <el-input
                style="width: 16.25rem"
                placeholder="请输入"
                clearable=""
                v-model="form.giftCardNum"
              ></el-input>
            </el-form-item>

            <el-button class="submit-btn" type="primary" @click="submit"
              >确认充值</el-button
            >
          </div>
        </el-form>
      </div>
      <empty-page v-if="isEmpty" :showTitle="emptyTitle"></empty-page>
    </div>
  </div>
</template>
<script>
import emptyPage from "../components/empty.vue";
import headerPage from "../components/header.vue";
import { GoodsTypeVariable } from "@/utils/Variable";
export default {
  data() {
    // 手机号校验方法
    let validateGiftCardNum = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入兑换码"));
      } else {
        // 发请求
        // -------------------------------------------------------------------------
        // if(状态返回失败){
        //   callback(new Error("兑换码错误，请重新输入"));
        // }else{
        callback();
        // }
      }
    };
    return {
      form: {},
      walletList: [],
      isEmpty: false,
      Haswallet: false,
      headerTitle: "账户余额",
      emptyTitle: "账户余额",
      showPayInput: false,
      rules: {
        giftCardNum: [{ validator: validateGiftCardNum, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getUserInfo();
    this.getWallet();
    // 文字过长显示小文字
    // const document=document.getElementsByClassName("account-ruleForm-wallet")
    // console.log(document)
    // document.forEach(v => {
    //   console.log("---------",v)
    // });

    // if (this.money.length > 0 && this.money.length < 25) {
    //   document.getElementsByClassName(
    //     "account-ruleForm-wallet"
    //   )[0].style.fontSize = "1.375rem";
    // } else if (this.money.length > 26 && this.money.length < 35) {
    //   document.getElementsByClassName(
    //     "account-ruleForm-wallet"
    //   )[0].style.fontSize = "1.125rem";
    // } else {
    //   document.getElementsByClassName(
    //     "account-ruleForm-wallet"
    //   )[0].style.fontSize = ".875rem";
    // }
  },
  methods: {
    getUserInfo() {
      this.form = JSON.parse(localStorage.getItem("userInfo"));
    },
    getWallet() {
      this.$request.get(this.api.getWallet).then((res) => {
        this.walletList = res.data;
        if (this.walletList.length <= 0) {
          this.Haswallet = false;
        } else {
          this.Haswallet = true;
        }
        this.form.wallet = "";
        var walletTips = "";
        res.data.forEach((v) => {
          GoodsTypeVariable.forEach((k) => {
            Object.keys(v).forEach((j) => {
              if (k.key == j && v[j] != null) {
                console.log(k.typeName);
                walletTips += k.typeName + "：" + v[k.key] + "件；</br>";
              }
            });
          });
          this.form.wallet = `<span style='font-size:16px'>${v.giftCardName}，有效期至${v.validDate}<p>
          <span style="font-size:18px">说明，您的每份礼品卡可以从以下礼品中选择任意一类进行兑换：<span>
          </br>
          ${walletTips}
          </p></span>`;
          // this.form.wallet =
          //   v.giftCardName +
          //   "，份数:" +
          //   v.quotaMultiple +
          //   "，有效期至" +
          //   v.validDate;
          // });
          // 原可多选需求
          //  this.form.wallet = v.giftCardName
          // GoodsTypeVariable.forEach((k) => {
          //   Object.keys(v).forEach((j) => {
          //     if (k.key == j && v[j] != null) {
          //       console.log(this.form.wallet);
          //       this.form.wallet += k.typeName + v[k.key] + "份，";
          //     }
          //   });
          // });
          // this.form.wallet += "有效期至：" + v.validDate;
        });
        // console.log(this.walletList);
      });
    },
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$request
            .get(this.api.exchangeCard + this.form.giftCardNum)
            .then((res) => {
              if (res.resultCode == 20000) {
                this.$message.success("兑换成功");
                this.getWallet();
              } else {
                this.$message.error(res.message);
              }
            });
          this.showPayInput = false;
          this.$refs["ruleForm"].resetFields();
        } else {
          return false;
        }
      });
    },
    showPay() {
      this.showPayInput = true;
    },
  },
  components: {
    emptyPage,
    headerPage,
  },
};
</script>
<style>
.account-ruleForm .el-form-item__label {
  font-size: 16px;
  color: #888;
}
.account-ruleForm .el-form-item {
  margin-bottom: 0px !important;
}
span {
  font-size: 16px !important;
}
p {
  font-size: 16px !important;
}
</style>
<style scoped>
@import "../assets/css/index.css";
.account {
  /* min-height: inherit; */
  /* min-height:80vh; */
}
.account-content {
  width: 76.5625rem;
  margin: 0 auto;
  height: calc(100%);
  /* min-height:calc(100% - 5.5rem); */
  background: #fff;
}
.content-info {
  /* margin-top: 3.125rem; */
  padding: 3.125rem 0 0 0;
}
.content-tips {
  font-size: 1rem;
  color: red;
  font-weight: 700;
}
.account-ruleForm {
  width: 25rem;
  margin: 0 auto;
  padding: 3.125rem;
  border: 0.125rem dotted #ff8d1a;
}
.account-ruleForm span {
  font-size: 1.5rem;
  color: #606266;
}
.submit-btn {
  display: block;
  width: 18.75rem;
  background: #ff6700;
  border: 0;
  margin: 0 auto;
  margin-top: 3.125rem;
}
.submit-btn:hover {
  background: #f25807;
}
</style>