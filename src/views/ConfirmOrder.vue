<!--
 * @Author: 1vv
 * @Date: 2021-10-22 10:32:52
 * @LastEditTime: 2021-12-15 18:41:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\views\ConfirmOrder.vue
-->

<template>
  <div class="confirmOrder">
    <!-- 头部 -->
    <header-page :showHeader="headerTitle"></header-page>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="confirmOrder-content">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>收货信息</span>
        </div>
        <div class="address-card">
          <div class="address-content">
            <p>
              <span class="address-title">收货人：</span>
              <span class="address-font">{{ addressInfo.receiverName }}</span>
            </p>
            <p>
              <span class="address-title">联系方式：</span>
              <span class="address-font">{{ addressInfo.receiverPhone }}</span>
            </p>
            <p>
              <span class="address-title">收货地址：</span>
              <span class="address-font">{{ addressInfo.address }}</span>
            </p>
          </div>
          <div class="address-btns">
            <!-- <p class="checkout-address" @click="checkAddress">地址切换</p> -->

            <el-button class="address-addBtn" size="small" @click="checkAddress"
              >地址切换</el-button
            >
            <!-- <el-button class="address-addBtn" size="small">新增地址</el-button> -->
          </div>
        </div>
      </el-card>

      <!-- 商品列表 -->
      <div class="content-list">
        <el-table :data="tableData">
          <el-table-column label="商品图" align="center">
            <template slot-scope="scope">
              <!-- {{scope}} -->
              <div class="flex">
                <img
                  class="content-list-img"
                  :src="$target + scope.row.coverPath"
                  alt=""
                  style="width: 120px"
                />
                <div class="content-list-text-desc">
                  <p>
                    {{ scope.row.goodsName }}
                  </p>
                  <p class="content-list-tips-text">不支持无理由退换货</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="goodsNum" label="数量" align="center">
          </el-table-column>
        </el-table>
      </div>

      <div class="submit-btns">
        <!-- !paySuccess 支付失败-余额不足 -->
        <p v-if="!paySuccess" class="tips-text submit-btns-tips">
          账户余额不足，无法兑换以上商品
        </p>
        <el-button type="" @click="goShopCar">返回上一步</el-button>
        <el-button type="primary" v-if="paySuccess" @click="submit"
          >确定兑换</el-button
        >
        <el-button v-if="!paySuccess" type="info" disabled>确定兑换</el-button>
      </div>
    </div>
    <!-- 主要内容容器END -->
    <!-- 地址弹出框 -->
    <!-- 弹框 -->
    <el-dialog
      title="新增/编辑地址"
      :visible.sync="addListDialogVisible"
      width="50%"
    >
      <div class="dialogDiv">
        <address-page
          @getAddress="getAddress"
          @getNewAddress="getNewAddress"
          :getSelected="getSelected"
          v-if="isShow"
        ></address-page>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addListDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseAddress">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 地址弹出框END -->
  </div>
</template>
<script>
import headerPage from "../components/header.vue";
import addressPage from "../components/address.vue";
// import { GoodsTypeVariable } from "@/utils/Variable";
export default {
  name: "",
  data() {
    return {
      headerTitle: "确认订单",
      tableData: [],
      paySuccess: true,
      addressInfo: {},
      getSelected: true,
      isShow: true,
      addListDialogVisible: false,
      tempAddressInfo: {},
      titleQuato: "",
      orderQuery:{}
    };
  },
  created() {
    this.tableData = JSON.parse(localStorage.getItem("orderData"));
    console.log(this.tableData);
  },
  mounted() {
    this.getDefultAddress();
  },
  methods: {
    // 兑换
    submit() {
      this.orderQuery = {
        orderName: this.addressInfo.receiverName,
        orderTel: this.addressInfo.receiverPhone,
        orderAddress: this.addressInfo.address,
        orderGoodsJson: this.tableData,
      };

      if (!this.addressInfo.address) {
        this.$message.error("请先选择地址！");
      } else {
        this.$request.post(this.api.checkOrder,  this.orderQuery).then((res) => {
          if (res.resultCode == 20000) {
            this.checkTrue()
          } else if (res.resultCode == 70000) {
            this.titleQuato = "您兑换的商品数量小于可兑换数量，此次兑换后余额清0，剩余的商品不可进行二次兑换，确认继续兑换吗？"
            // 原需求提示信息
            // this.titleQuato = "您可兑换";
            // GoodsTypeVariable.forEach((k) => {
            //   Object.keys(res.data).forEach((j) => {
            //     if (k.key == j && res.data[j] != null && res.data[j] != 0) {
            //       this.titleQuato += k.typeName + res.data[k.key] + "份，";
            //     }
            //   });
            // });
            // this.titleQuato +=
            //   "您此次兑换还有剩余，剩余商品不可进行二次兑换，确认继续兑换吗？";
            this.$confirm(this.titleQuato, {
              confirmButtonText: "继续兑换",
              cancelButtonText: "取消",
              type: "info",
              showClose: false,
              closeOnPressEscape: false,
              closeOnClickModal: false,
            })
              .then(() => {
                this.checkTrue()
              })
              .catch(() => {
                this.$router.push("/shoppingCart");
                //   // 清除下单数据
                // localStorage.removeItem("orderData");
              });
          }else{
            this.$message.error(res.message);
          }
        });
      }
    },
    checkTrue() {
      this.$request.post(this.api.createOrder,  this.orderQuery).then((res) => {
        if (res.resultCode == 20000) {
          this.$confirm("兑换成功", {
            confirmButtonText: "查看订单",
            cancelButtonText: "返回首页",
            type: "success",
            showClose: false,
            closeOnPressEscape: false,
            closeOnClickModal: false,
          })
            .then(() => {
              this.$router.push("./order");
            })
            .catch(() => {
              this.$router.push("/");
              //   // 清除下单数据
              // localStorage.removeItem("orderData");
            });

          // 下单商品从购物车清空
          const tempOrderData = JSON.parse(localStorage.getItem("orderData"));
          const tempShopCar = JSON.parse(localStorage.getItem("shopCar"));
          tempOrderData.forEach((v) => {
            tempShopCar.forEach((k, ik) => {
              if (v.goodsId == k.goodsId) {
                tempShopCar.splice(ik, 1);
              }
            });
          });
          localStorage.setItem("shopCar", JSON.stringify(tempShopCar));
          // 清除下单数据
          localStorage.removeItem("orderData");
        } else {
          this.$message.error(res.message);
        }
      });

      this.paySuccess = false;
    },
    getDefultAddress() {
      this.$request.get(this.api.getAddress).then((res) => {
        res.data.forEach((v) => {
          if (v.isDef == 1) {
            this.addressInfo = v;
          }
        });
        this.addressInfo.address =
          this.addressInfo.areaName + this.addressInfo.addrContent;
      });
    },
    // 选择单挑地址信息
    getNewAddress(v) {
      this.tempAddressInfo = v;
      console.log("=====================", v);
    },
    // 获取子组件地址列表
    getAddress(val) {
      this.address = val; //addres就获取了子组件中传过来的值
      console.log(val);
    },
    // 切换地址按钮
    checkAddress() {
      this.addListDialogVisible = true;
    },
    // 确认选择地址
    chooseAddress() {
      this.addListDialogVisible = false;
      this.addressInfo = this.tempAddressInfo;
      this.addressInfo.address =
        this.addressInfo.areaName + this.addressInfo.addrContent;
      console.log("确定选择地址：", this.addressInfo);
    },
    // 返回购物车
    goShopCar() {
      this.$router.push("./shoppingCart");
    },
  },
  components: {
    headerPage,
    addressPage,
  },
};
</script>
<style scoped>
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

/* 主要内容容器CSS */
.confirmOrder-content {
  width: 1225px;
  margin: 0 auto;
  /* background-color: #fff; */
}

/* 地址信息 */
.checkout-address {
  color: #ff8d1a;
  text-decoration: underline;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 10px;
}
.address-addBtn:hover {
  background: #ff670021 !important;
  border: 1px solid #ff670021 !important;
  color: #727272;
}
.address-card {
  display: flex;
  justify-content: space-between;
}
.address-content p {
  line-height: 30px;
  color: #606266;
}
.address-font {
  font-size: 18px;
}
.address-btns {
  border-left: 2px solid #ddd;
  padding-left: 15px;
  align-self: center;
}
/* 地址信息END */

/* 商品列表 */
.content-list {
  margin-top: 30px;
}
.content-list-text-desc {
  margin-left: 50px;
}
.content-list-img {
  width: 120px;
  height: 120px;
}
.tips-text {
  color: #f00;
}
.submit-btns {
  padding: 40px 20px 40px 20px;
  text-align: right;
}
.submit-btns-tips {
  margin-bottom: 20px;
}
/* 商品列表END */
.dialogDiv {
  height: 500px;
  overflow: auto;
}
</style>