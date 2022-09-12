<!--
 * @Author: 1vv
 * @Date: 2021-10-22 10:32:52
 * @LastEditTime: 2021-11-23 10:20:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\views\ShoppingCart.vue
-->

<template>
  <div class="shoppingCart">
    <!-- 购物车头部 -->
    <header-page :showHeader="headerTitle"></header-page>
    <!-- 购物车头部END -->

    <!-- 购物车主要内容区 -->
    <div v-if="!isEmpty" class="shoppingCart-content">
      <div class="shangpin">
        <!-- <el-table>
           <el-table-column type="selection" width="100"></el-table-column>
            <el-table-column align="center" label="图片"></el-table-column>
            <el-table-column align="center" label="标题"></el-table-column>
            <el-table-column align="center" label="数量"></el-table-column>
            <el-table-column align="center" label="金额"></el-table-column>
          </el-table> -->
        <div class="shop" v-for="(item, index) in shopCarData" :key="index">
          <p class="shoppingCart-type">
            {{ item.typeName }}
          </p>
          <el-table
            v-if="item.children.length > 0"
            ref="multipleTable"
            @select="handleSelectionChange"
            :data="item.children"
            style="width: 100%; overflow: visible"
            :show-header="true"
            row-key="goodsId"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="100"
            ></el-table-column>
            <el-table-column align="center" label="图片">
              <template slot-scope="scope">
                <img
                  :src="$target + scope.row.coverPath"
                  width="50"
                  height="50px;"
                  alt=""
                />
              </template>
            </el-table-column>

            <el-table-column prop="goodsName" label="标题" align="center">
            </el-table-column>
            <el-table-column prop="goodsPrice" label="单价" align="center">
              <template> - </template>
            </el-table-column>
            <el-table-column prop="number" label="数量" align="center">
              <template slot-scope="scope">
                <el-input-number
                  class="number"
                  size="mini"
                  :min="1"
                  v-model="scope.row.goodsNum"
                  @change="numChange(scope.row)"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="goodsPrice" label="小计" align="center">
              <!-- <template slot-scope="scope">
                {{ scope.row.goodsPrice }}
              </template> -->
              <template> - </template>
            </el-table-column>
            <el-table-column prop="goodsPrice" label="操作" align="center">
              <template slot-scope="scope">
                <el-popconfirm
                  :title="'确定要删除<' + scope.row.goodsName + '>吗？'"
                  @confirm="handleDelete(scope.row)"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="shopCar-footer flex-between">
          <div class="shopCar-footer-left">
            <el-checkbox v-model="checkedAll" @change="handleCheckedAll"
              >全选</el-checkbox
            >
            <span>（{{ orderData.length }}）</span>
          </div>
          <div class="shopCar-footer-right">
            <span class="footer-right-price-title">商品合计：</span>
            <span class="footer-right-price">-</span>
            <el-button
              :disabled="orderData.length <= 0"
              class="next-button"
              type="primary"
              @click="goConfirmOrder"
              >下一步</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车主要内容区END -->

    <!-- 购物车为空的时候显示的内容 -->
    <empty-page v-if="isEmpty" :showTitle="emptyTitle"></empty-page>
    <!-- 购物车为空的时候显示的内容END -->
  </div>
</template>
<script>
import emptyPage from "../components/empty.vue";
import headerPage from "../components/header.vue";
import { GoodsTypeVariable } from "@/utils/Variable";
export default {
  data() {
    return {
      headerTitle: "我的购物车",
      emptyTitle: "购物车",
      shopCarData: [],
      shopCarDataBefore: [],
      orderData: [],
      isAllCheck: false, //是否全选
      // 选中多个数组
      isEmpty: false, //购物车是否为空
      checkedAll: false,
      visibleDelete: false,
      checkLength: "",
    };
  },
  created() {
    /**
     * 如果localstorage中没有shopCar的值，页面显示空图片
     * 否则JSON.parse()
     */
    if (
      localStorage.getItem("shopCar") == null ||
      localStorage.getItem("shopCar") == "[]"
    ) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
      this.shopCarDataBefore = JSON.parse(localStorage.getItem("shopCar"));
      this.dataChange();
      this.checkTypetName();
    }
  },
  mounted() {},
  methods: {
    // 数据转换    按分类数据转换 用来循环分类
    dataChange() {
      let map = {};
      for (let i = 0; i < this.shopCarDataBefore.length; i++) {
        let ai = this.shopCarDataBefore[i];
        if (!map[ai.goodsType]) {
          map[ai.goodsType] = [ai];
        } else {
          map[ai.goodsType].push(ai);
        }
      }
      Object.keys(map).forEach((key) => {
        // console.log(map);
        this.shopCarData.push({
          goodsType: key,
          children: map[key],
        });
      });
    },
    checkTypetName() {
      console.log(this.shopCarData);
      this.shopCarData.forEach((v) => {
        GoodsTypeVariable.forEach((k) => {
          if (v.goodsType == k.goodsType) {
            v.typeName = k.typeName;
          }
        });
      });
    },
    // 全选按钮
    handleCheckedAll() {
      var checkLength = "";
      this.shopCarData.forEach((v) => {
        v.children.forEach(() => {
          checkLength++;
        });
      });
      var selectAll = this.orderData.length == checkLength; //true为清空，false为全选
      this.orderData = [];
      this.shopCarData.forEach((v, iv) => {
        v.children.forEach((k) => {
          this.$refs.multipleTable[iv].toggleRowSelection(k, !selectAll);
          if (!selectAll) {
            this.orderData.push(k);
          }
        });
      });
    },

    // 数量加减按钮
    numChange(row) {
      let shopCarDataOld = JSON.parse(localStorage.getItem("shopCar"));
      shopCarDataOld.forEach((v) => {
        if (v.goodsId == row.goodsId) {
          v.goodsNum = row.goodsNum;
        }
      });
      localStorage.setItem("shopCar", JSON.stringify(shopCarDataOld));
    },

    // 多选框选中数据
    handleSelectionChange(selection, item) {
      console.log(selection);
      console.log(this.shopCarData);

      if (this.orderData.includes(item)) {
        console.log("删除", this.orderData.indexOf(item));

        this.orderData.splice(this.orderData.indexOf(item), 1);
      } else {
        this.orderData.push(item);
      }

      /**
       * every全部条件通过才会返回true
       * 如果全部通过，全选按钮高亮
       */
      const tempChooseAll = this.$refs.multipleTable.every((v) => {
        if (v.selection.length == v.tableData.length) {
          return true;
        } else {
          return false;
        }
      });
      this.checkedAll = tempChooseAll;

      // console.log("orderdata:",this.orderData)
    },

    handleHead(row) {
      if (row.columnIndex === 0) {
        return "check-head";
      }
    },

    // 删除
    handleDelete(row) {
      // 删除localstorage中商品
      let shopCarDataOld = JSON.parse(localStorage.getItem("shopCar"));
      shopCarDataOld.forEach((v, iv) => {
        if (v.goodsId == row.goodsId) {
          shopCarDataOld.splice(iv, 1);
        }
      });
      localStorage.setItem("shopCar", JSON.stringify(shopCarDataOld));
      //  删除页面中商品数据
      this.shopCarData.forEach((v) => {
        v.children.forEach((k, ik) => {
          if (k.goodsId == row.goodsId) {
            v.children.splice(ik, 1);
          }
        });
      });
    },

    goConfirmOrder() {
      console.log("-----", this.orderData);
      localStorage.setItem("orderData", JSON.stringify(this.orderData));
      this.$router.push("/confirmOrder");
    },
  },
  components: {
    emptyPage,
    headerPage,
  },
};
</script>
<style scoped>
.shoppingCart {
  background-color: #ffffff;
  padding-bottom: 20px;
  height: 100%;
}

/* 购物车主要内容区CSS */
.shoppingCart-content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
}
.pro-name {
  margin-left: 20px;
}
.shoppingCart-table {
  margin-bottom: 20px;
}
.shoppingCart-type {
  background-color: #f5f5f5;
  height: 30px;
  padding: 5px 0 5px 30px;
  line-height: 30px;
  margin-top: 60px;
}
.shopcar-row {
  background-color: #f5f5f5;
}
/deep/ .el-table__header-wrapper .el-checkbox {
  display: none !important;
}
/* 购物车主要内容区CSS END */

/* 底部 footer去结算 */
.shopCar-footer {
  background-color: #f5f5f5;
  height: 50px;
  margin-top: 30px;
  align-items: center;
}
.footer-right-price-title {
  font-size: 14px;
  font-weight: 700;
}

.shopCar-footer-right {
  height: 100%;
}
.footer-right-price {
  color: darkolivegreen;
  font-weight: 700;
  margin-right: 50px;
}
.next-button {
  width: 120px;
  height: 100%;
}
.shopCar-footer-left {
  margin-left: 20px;
}
/* 底部 footer去结算END */
</style>