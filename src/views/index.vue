<!--
 * @Description: 项目根组件
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-31 15:45:21
 -->
<template>
  <div id="index" class="index">
    <el-container>
      <!-- 主要区域容器 -->
      <el-main>
        <div class="home" id="home" name="home">
          <!-- 轮播图 -->
          <div class="broadcast">
            <div class="block">
              <el-carousel height="200px">
                <el-carousel-item
                  class="lun_img"
                  v-for="item in images"
                  v-bind:key="item.id"
                >
                  <img
                    :src="item.imgPath"
                    style="height: 200px; width: 800px"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="title">
              {{ titleTips }}
            </div>
          </div>
          <!-- 轮播图END -->
          <div class="main-box">
            <div class="main">
              <!-- 手机商品展示区域 -->
              <div class="phone">
                <div class="box-bd">
                  <el-tabs
                    v-model="activeName"
                    @tab-click="handleClick"
                    style="margin: 0 auto"
                  >
                    <el-tab-pane
                      v-for="(tabItem, index) in tabList"
                      :label="tabItem.dictName"
                      :name="tabItem.dictCode"
                      :key="index"
                    >
                      <div id="myList" class="myList">
                        <el-row :gutter="10">
                          <el-col  class="myList_col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <li
                              class="goods-card"
                              v-for="item in list"
                              :key="item.id"
                            >
                              <router-link
                                :to="{
                                  path: '/goods/details',
                                  query: {
                                    id: item.goodsId,
                                    typeName: item.typeName,
                                  },
                                }"
                              >
                                <img :src="$target + item.coverPath" alt />
                                <h2>{{ item.goodsName }}</h2>
                                <h3>商品种类：{{ item.typeName }}</h3>
                                <p>
                                  <span>库存：{{ item.goodsSum }}</span>
                                </p>
                              </router-link>
                            </li>
                          </el-col>
                        </el-row>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
              <!-- 手机商品展示区域END -->
            </div>
          </div>
        </div>
      </el-main>
      <!-- 主要区域容器END -->
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [], //全部商品的列表
      activeName: "all", //刚开始显示分类一
      images: [],
      titleTips: "",
      //商品的分类
      tabList: [],
      queryParams: {
        pageNum: 1,
        pageSize: 1000,
      },
    };
  },
  created() {
    // 获取各类商品数据
    this.getPromo();
    this.getTab();
    this.getConfig();
  },
  methods: {
    getConfig() {
      this.$request.get(this.api.getConfigInfo).then((res) => {
        this.titleTips = res.data.indexText;
        var i = 0;
        for (const key in res.data) {
          i = i + 1;
          console.log(key);
          if (res.data["indexPic" + i]) {
            this.images.push({
              imgPath: res.data["indexPic" + i],
              id: i,
            });
          }
        }
      });
    },
    // 获取各类商品数据方法封装
    getPromo() {
      this.$request.post(this.base.getList, this.queryParams).then((res) => {
        this.list = res.data.rows;
      });
    },
    getTab() {
      this.tabList = [];
      this.$request.get(this.base.queryTab).then((res) => {
        this.tabList = [{ dictCode: "all", dictName: "全部" }];
        this.tabList.push(...res.data);
      });
    },
    //切换事件
    handleClick(e) {
      if (e.label == "全部") {
        delete this.queryParams.goodsType;
      } else {
        this.queryParams.goodsType = e.name;
      }
      this.getPromo();
    },
  },
};
</script>

<style>
@import "../assets/css/index.css";
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
  max-height: calc(100%);
}

#index .el-header {
  padding: 0;
}
#index .el-main {
  padding: 20px 0;
}
#index .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
.main-box {
  background-color: #f5f5f5;
  margin: 0 auto;
}
/* 全局CSS END */
/* 顶栏容器CSS */
.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
}
.el-tabs__header {
  background-color: white;
  margin: 0px;
}
.el-tabs__content {
  padding-top: 20px;
  background-color: #f5f5f5;
}
.el-header .logo {
  height: 60px;
  width: 189px;
  float: left;
  margin-right: 100px;
}
.el-header .so {
  margin-top: 10px;
  width: 300px;
  float: right;
}
/* 顶栏容器CSS END */
.myList {
  /* display: flex; */
  /* flex-wrap: wrap;
  justify-content: space-around; */
}
.myList_col{
  display: flex;
  justify-content:center;
  flex-wrap: wrap;
}
.goods-card {
  z-index: 1;
  /* float: left; */
  width: 400px;
  height: 280px;
  padding: 15px 0;
  margin: 0 0 14.5px 6px;
  background-color: white;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  position: relative;
}
.goods-card:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.goods-card img {
  display: block;
  width: 210px;
  /* height: 200px; */
  background: url(../assets/imgs/placeholder.png) no-repeat 50%;
  margin: 0 auto;
}
.goods-card h2 {
  margin: 10px 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.goods-card h3 {
  margin: 5px 10px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: #b0b0b0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.goods-card p {
  margin: 10px 10px 10px;
  text-align: center;
  color: #ff6700;
}
.goods-card p .del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
</style>