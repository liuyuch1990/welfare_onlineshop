<!--
 * @Description: 项目根组件
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-01 11:15:22
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
              北方华创2022年三八女神节发货时间截止至2022年3月15日。库存有限，请您尽快兑换！
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
                    <el-tab-pane label="全部" name="全部">
                      <div id="myList" class="myList">
                        <ul>
                          <li v-for="item in list" :key="item.id">
                            <router-link
                            target="_blank"
                              :to="{
                                path: '/goods/details',
                                query: { id: item.goodsId,typeName: item.typeName},
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
                        </ul>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane
                      v-for="(tabItem, index) in catList"
                      :label="tabItem.value"
                      :name="tabItem.key"
                      :key="index"
                    >
                      <div id="myList" class="myList">
                        <ul>
                          <li
                            v-for="item in list"
                            v-show="item.goodsType == tabItem.key"
                            :key="item.id"
                          >
                            <router-link
                              :to="{
                                path: '/goods/details',
                                query: { id: item.goodsId,typeName: item.typeName },
                              }"
                            >
                              <img :src="$target + item.coverPath" alt />
                              <h2>{{ item.goodsName }}</h2>
                              <h3>商品种类：{{ tabItem.value }}</h3>
                              <p>
                                <span>库存：{{ item.goodsSum }}</span>
                              </p>
                            </router-link>
                          </li>
                        </ul>
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
import { GoodsTypeVariable } from "@/utils/Variable";
export default {
  data() {
    return {
      list: [], //全部商品的列表
      activeName: "全部", //刚开始显示分类一
      activeIndex: "", // 头部导航栏选中的标签
      search: "", // 搜索条件
      images: [
        {
          imgPath: require("@/assets/imgs/01.jpg"),
          id: "1",
        },
        {
          imgPath: require("@/assets/imgs/02.jpg"),
          id: "2",
        }
      ],
      //商品的分类
      catList: [],
    };
  },
  created() {
    // 获取各类商品数据
    this.getPromo();
  },
  methods: {
    // 点击搜索按钮
    searchClick() {
      if (this.search != "") {
        // 跳转到全部商品页面,并传递搜索条件
        this.$router.push({ path: "/goods", query: { search: this.search } });
        this.search = "";
      }
    },
    // 获取各类商品数据方法封装
    getPromo() {
      this.$request
        .post(this.base.getList, { pageNum: 1, pageSize: 1000 })
        .then((res) => {
          if (res.resultCode == 20000) {
            this.list = res.data.rows;
            //箭头函数用来解决问题Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'catList')
            // at eval (index.vue?6ced:230)
            // at Array.forEach (<anonymous>)
            // at eval (index.vue?6ced:229)，因为他是异步处理的。

            // 根据后台商品种类名字
            //  this.list.forEach((v) => {
            //   const check = this.catList.every((j) => {
            //     if (j.key !== v.goodsType) {
            //       return true;
            //     } else {
            //       return false;
            //     }
            //   });
            //   if (check) {
            //     this.catList.push({
            //       key: v.goodsType,
            //       value: v.typeName,
            //     });
            //   }
            // });

            // 根据前台本地维护商品种类名字
            this.list.forEach((v) => {
              GoodsTypeVariable.forEach((k) => {
                if (v.goodsType == k.goodsType) {
                  v.typeName = k.typeName;
                  const check = this.catList.every((j) => {
                    if (j.key !== k.goodsType) {
                      return true;
                    } else {
                      return false;
                    }
                  });
                  if (check) {
                    this.catList.push({
                      key: k.goodsType,
                      value: k.typeName,
                    });
                  }
                }
              });
            });
          }
        });
    },
    //切换事件
    handleClick() {
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
.myList ul {
  margin-left: 20px;
}
.myList ul li {
  z-index: 1;
  float: left;
  width: 400px;
  height: 280px;
  padding: 15px 0;
  margin: 0 0 14.5px 6px;
  background-color: white;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  position: relative;
}
.myList ul li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.myList ul li img {
  display: block;
  width: 380px;
  height: 200px;
  background: url(../assets/imgs/placeholder.png) no-repeat 50%;
  margin: 0 auto;
}
.myList ul li h2 {
  margin: 10px 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li h3 {
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
.myList ul li p {
  margin: 10px 10px 10px;
  text-align: center;
  color: #ff6700;
}
.myList ul li p .del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
</style>