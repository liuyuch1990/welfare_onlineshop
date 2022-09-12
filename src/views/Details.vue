<!--
 * @Author:1vv
 * @Date: 2021-10-22 10:32:52
 * @LastEditTime: 2021-11-20 23:30:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \online-shop\src\views\Details.vue
-->

<template>
  <div id="details">
    <!-- 头部 -->
    <div class="page-header">
      <div class="title">
        <p>{{ productDetails.goodsName }}</p>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容 -->
    <div class="main">
      <!-- 上侧商品信息 -->
      <div class="main-top">
        <!-- 左侧商品轮播图 -->
        <div class="block">
          <!-- <el-carousel height="560px" v-if="productPicture.length > 1">
          <el-carousel-item v-for="item in productPicture" :key="item.id">
            <img
              style="height: 560px"
              :src="$target + item.productSavePath"
              :alt="item.intro"
            />
          </el-carousel-item>
        </el-carousel>
        <div v-if="productPicture.length == 1">
          <img
            style="height: 560px"
            :src="$target + productPicture[0].productSavePath"
            :alt="productPicture[0].intro"
          />
        </div> -->
          <img
            class="pro-cover-img"
            :src="this.$target + productDetails.coverPath"
          />
        </div>
        <!-- 左侧商品轮播图END -->

        <!-- 右侧内容区 -->
        <div class="content">
          <span class="pro-name pro-type">{{ typeName }}-</span>
          <span class="pro-name">{{ productDetails.goodsName }}</span>
          <p class="intro">{{ productDetails.goodsContent }}</p>
          <div class="price">
            <!-- <span class="pro-limit">此商品可选X件</span> -->
          </div>
          <div class="pro-list">
            <span>库存：</span>
            <span>{{ productDetails.goodsSum }}</span>
          </div>

          <div class="pro-list-num">
            <span>数量</span>
            <el-input-number
              class="pro-input-number"
              size="mini"
              v-model="goodsNum"
              :min="0"
              @change="inShopCarNum"
            ></el-input-number>
          </div>
          <!-- 内容区底部按钮 -->
          <div class="shop-cart">
            <!-- 两个按钮为了更好写disable颜色等样式 -->
            <el-button
              v-if="addShopDisable"
              class="shop-cart-button shop-cart-button-show"
              @click="addShoppingCart"
              icon="el-icon-shopping-cart-2"
              >加入购物车</el-button
            >
            <el-button
              v-else
              class="shop-cart-button"
              type="info"
              icon="el-icon-shopping-cart-2"
              disabled
              >加入购物车</el-button
            >
          </div>
          <!-- 内容区底部按钮END -->
        </div>
        <!-- 右侧内容区END -->
        <!-- 上侧商品信息END -->
      </div>
      <!-- 底部商品详情 -->
      <div class="main-bottom">
        <!-- <div>
          <span>商品详情：</span>
        </div> -->
        <div class="detail-img"  v-for="item in productDetails.pics" :key="item.goods">
 <img
          :src="$target+item.picSavepath"
          alt=""
        />
        </div>
       
      </div>
      <!-- 底部商品详情END -->
    </div>
    <!-- 主要内容END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsID: "", // 商品id
      addShopDisable: false,
      goodsNum: 0,
      productDetails: {}, // 商品详细信息
      productPicture: "", // 商品图片
      shopArrayData: [],
      typeName:'',
    };
  },
  // 通过路由获取商品id
  created() {
    if (this.$route.query.id != undefined) {
      this.goodsID = this.$route.query.id;
      this.typeName=this.$route.query.typeName
    }
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$request
        .get(this.api.goodsDetail + "/" + this.goodsID)
        .then((res) => {
          this.productDetails = res.data;
        });
    },
    // 加入购物车
    addShoppingCart() {
      // var tag = true;
      this.productDetails.goodsNum = this.goodsNum;
      if (
        localStorage.getItem("shopCar") == null ||
        localStorage.getItem("shopCar") == "[]"
      ) {
        this.shopArrayData.push(this.productDetails);
        localStorage.setItem("shopCar", JSON.stringify(this.shopArrayData));
      } else {
        var oldData = JSON.parse(localStorage.getItem("shopCar"));

        /**
         * 找出购物车中是否有相同的商品
         * 如果有数量相加
         * 如果没有返回false，结束当前循环
         *  */ 
        const tempSame = oldData.find((v) => {
          if (v.goodsId == this.productDetails.goodsId) {
            return v.goodsNum += this.productDetails.goodsNum;
          } else {
            return false
          }
        });
        
         /**
          * 没有相同商品，push进数组保存商品
          */
        if(!tempSame){
          oldData.push(this.productDetails);
        }
        localStorage.setItem("shopCar", JSON.stringify(oldData));
      }
      this.$confirm("加入购物车成功", "加购成功", {
        confirmButtonText: "继续购物",
        cancelButtonText: "去购物车结算",
        type: "success",
        showClose: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          this.$router.push("/shoppingCart");
        });
    },
    // 加入购车车数量
    inShopCarNum(value) {
      // value大于0时，加入购物车按钮才可点击；否则不可点击
      this.addShopDisable = value > 0;
    },
  },
};
</script>
<style>
</style>
<style scoped>
/* 头部CSS */
.page-header {
  height: 44px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
  width: 1225px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
  height: 64px;
  float: right;
}
#details .page-header .title .list li {
  float: left;
  margin-left: 20px;
}
#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
}
#details .page-header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 1225px;
  /* height: 560px; */
  padding-top: 30px;
  margin: 0 auto;
}
.main-top {
  display: flex;
  justify-content: space-between;
}
#details .main .block {
  width: 480px;
  height: 480px;
}
.pro-cover-img {
  width: 100%;
  height: 100%;
}
#details .main .content {
  width: 640px;
}
.pro-name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
.pro-type {
  font-weight: 700;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
.shop-cart {
  height: 55px;
  margin: 40px 0 20px 0;
  display: flex;
  justify-content: center;
}
.shop-cart-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
  width: 340px;
}
.shop-cart-button-show {
  background-color: #ff6700;
}

.shop-cart-button-show:hover {
  background-color: #f25807;
}

.pro-limit {
  color: #616161;
}
.pro-input-number {
  margin-left: 15px;
}
.pro-list-num {
  display: flex;
  justify-content: center;
}

.main-bottom {
  margin-top: 200px;
}
.main-bottom img {
  display: block;
  width: 80%;
  margin: 0 auto;
}
.detail-img{
  padding-bottom: 30px;
}

/* 主要内容CSS END */
</style>