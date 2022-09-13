<!--
 * @Description: 我的订单页面组件
 * @Author: hai-27
 * @Date: 2020-02-20 17:21:54
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:36:27
 -->
<template>
  <div class="order">
    <!-- 我的订单头部 -->
    <header-page :showHeader="headerTitle"></header-page>
    <!-- 我的订单头部END -->

    <!-- 我的订单主要内容 -->
    <div class="order-content" v-if="isOrder">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="margin-bottom: 30px"
      >
        <el-tab-pane label="全部" name="first">
          <el-table :data="orders">
            <el-table-column label="商品" align="center" min-width="300px" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row.orderGoods"
                  :key="index" class="orderprovos"
                >

                    <div class="orderprovos-img">
                      <img :src="$target+item.picSavepath" alt="" />
                    </div>
                    <div class="orderprovos-font">
                      <p class="multi-ellipsis--l1">商品名称：{{ item.goodsName }}</p>
                      <p>
                        单价:--
                      </p>
                    </div>
                    <div>
                      <p>
                        数量：{{item.goodsNum}}
                      </p>
                    </div>
                </div>
              </template>
            </el-table-column>
           <el-table-column prop="orderTime" label="下单时间" align="center" >
            </el-table-column>
            <el-table-column prop="status" label="订单状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">未发货</span>
                <span v-else-if="scope.row.status == 1">已发货</span>
                <span v-else>已取消</span>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单编号" align="center" min-width="100px">
            </el-table-column>
             <el-table-column
              label="收货信息"
              min-width="120px"
            >
              <template slot-scope="scope">
                <p>收货人:{{scope.row.orderName}}</p>
                 <p>手机号:{{scope.row.orderTel}}</p>
                 <p>收货地址:{{scope.row.orderAddress}}</p>
                 
              </template>
            </el-table-column>
            
            
            <el-table-column label="快递单号" align="center" min-width="200px">
              <template slot-scope="scope">
                <ul v-if="scope.row.status == 1">
                  <li v-for="item in scope.row.express" :key="item.id">
                    <p>{{ item.logisticsCompany }}</p>
                    <p>
                      {{ item.courierNumber }}
                    </p>
                  </li>
                </ul>
                <p v-else>--</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="140px">
              <template slot-scope="scope">
                <p v-if="scope.row.status == 0">
                  <el-popconfirm
                    :title="'确定要取消该订单吗？'"
                    @confirm="handleCancel(scope)"
                  >
                    <el-button slot="reference" type="text"
                      >取消订单|</el-button
                    >
                  </el-popconfirm>
                  <el-button
                    type="text"
                    @click="handleEdit(scope)"
                    style="margin-left: 0"
                    >修改地址</el-button
                  >
                </p>
                <p v-else-if="scope.row.status == 1"><el-button type="text" @click="handleViewLogistic(scope.row)">查看物流</el-button></p>
                <p v-else>--</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="未发货" name="second">
          <el-table :data="ordersSecond">
            <el-table-column label="商品" align="center" min-width="250px" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row.orderGoods"
                  :key="index" class="orderprovos"
                >

                    <div class="orderprovos-img">
                      <img :src="$target+item.picSavepath" alt="" />
                    </div>
                    <div class="orderprovos-font">
                      <p class="multi-ellipsis--l1">商品名称：{{ item.goodsName }}</p>
                      <p>
                        单价:--
                      </p>
                    </div>
                    <div>
                      <p>
                        数量：{{item.goodsNum}}
                      </p>
                    </div>
                </div>
              </template>
            </el-table-column>
           <el-table-column prop="orderTime" label="下单时间" align="center" >
            </el-table-column>
            <el-table-column prop="status" label="订单状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">未发货</span>
                <span v-else-if="scope.row.status == 1">已发货</span>
                <span v-else>已取消</span>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单编号" align="center" min-width="100px">
            </el-table-column>
             <el-table-column
              label="收货信息"
              min-width="120px"
            >
              <template slot-scope="scope">
                <p>收货人:{{scope.row.orderName}}</p>
                 <p>手机号:{{scope.row.orderTel}}</p>
                 <p>收货地址:{{scope.row.orderAddress}}</p>
                 
              </template>
            </el-table-column>
            
            
            <el-table-column label="查看物流" align="center" min-width="100px">
              <template slot-scope="scope">
                <ul v-if="scope.row.status == 1">
                  <li v-for="item in scope.row.express" :key="item.id">
                    <p style="color: #ff6700">{{ item.logisticsCompany }}</p>
                    <p>
                      <el-button
                        type="text"
                        @click="handleView(item)"
                        v-if="scope.row.status == 1"
                        >{{ item.courierNumber }}</el-button
                      >
                    </p>
                  </li>
                </ul>
                <p v-else>--</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="150px">
              <template slot-scope="scope">
                <p v-if="scope.row.status == 0">
                  <el-popconfirm
                    :title="'确定要取消该订单吗？'"
                    @confirm="handleCancel(scope)"
                  >
                    <el-button slot="reference" type="text">取消订单|</el-button>
                  </el-popconfirm>
                  <el-button
                    type="text"
                    @click="handleEdit(scope)"
                    style="margin-left: 0"
                    >修改地址</el-button
                  >
                </p>
                <p v-else>--</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已发货" name="third">
          <el-table :data="ordersThird">
            <el-table-column label="商品" align="center" min-width="250px" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row.orderGoods"
                  :key="index" class="orderprovos"
                >

                    <div class="orderprovos-img">
                      <img :src="$target+item.picSavepath" alt="" />
                    </div>
                    <div class="orderprovos-font">
                      <p class="multi-ellipsis--l1">商品名称：{{ item.goodsName }}</p>
                      <p>
                        单价:--
                      </p>
                    </div>
                    <div>
                      <p>
                        数量：{{item.goodsNum}}
                      </p>
                    </div>
                </div>
              </template>
            </el-table-column>
           <el-table-column prop="orderTime" label="下单时间" align="center" >
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单编号" align="center" min-width="100px">
           
            </el-table-column>
             <el-table-column prop="status" label="订单状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">未发货</span>
                <span v-else-if="scope.row.status == 1">已发货</span>
                <span v-else>已取消</span>
              </template>
            </el-table-column>
             <el-table-column
              label="收货信息"
              min-width="120px"
            >
              <template slot-scope="scope">
                <p>收货人:{{scope.row.orderName}}</p>
                 <p>手机号:{{scope.row.orderTel}}</p>
                 <p>收货地址:{{scope.row.orderAddress}}</p>
                 
              </template>
            </el-table-column>
            
            
            <el-table-column label="快递单号" align="center" min-width="200px">
              <template slot-scope="scope">
                <ul v-if="scope.row.status == 1">
                  <li v-for="item in scope.row.express" :key="item.id">
                    <p>{{ item.logisticsCompany }}</p>
                    <p>
                      {{ item.courierNumber }}
                    </p>
                  </li>
                </ul>
                <p v-else>--</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="140px">
              <template slot-scope="scope">
                <p v-if="scope.row.status == 0">
                  <el-popconfirm
                    :title="'确定要取消该订单吗？'"
                    @confirm="handleCancel(scope)"
                  >
                    <el-button slot="reference" type="text"
                      >取消订单|</el-button
                    >
                  </el-popconfirm>
                  <el-button
                    type="text"
                    @click="handleEdit(scope)"
                    style="margin-left: 0"
                    >修改地址</el-button
                  >
                </p>
                <p v-else-if="scope.row.status == 1"><el-button type="text" @click="handleViewLogistic(scope.row)">查看物流</el-button></p>
                <p v-else>--</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已取消" name="fourth">
         <el-table :data="ordersFour">
           <el-table-column label="商品" align="center" min-width="250px" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row.orderGoods"
                  :key="index" class="orderprovos"
                >

                    <div class="orderprovos-img">
                      <img :src="$target+item.picSavepath" alt="" />
                    </div>
                    <div class="orderprovos-font">
                      <p class="multi-ellipsis--l1">商品名称：{{ item.goodsName }}</p>
                      <p>
                        单价:--
                      </p>
                    </div>
                    <div>
                      <p>
                        数量：{{item.goodsNum}}
                      </p>
                    </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="orderTime" label="下单时间" align="center" >
            </el-table-column>
            <el-table-column prop="status" label="订单状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">未发货</span>
                <span v-else-if="scope.row.status == 1">已发货</span>
                <span v-else>已取消</span>
              </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="订单编号" align="center" min-width="100px">
            </el-table-column>
             <el-table-column
              label="收货信息"
              min-width="120px"
            >
              <template slot-scope="scope">
                <p>收货人:{{scope.row.orderName}}</p>
                 <p>手机号:{{scope.row.orderTel}}</p>
                 <p>收货地址:{{scope.row.orderAddress}}</p>
                 
              </template>
            </el-table-column>
            
            

            


            <el-table-column label="查看物流" align="center" min-width="100px">
              <template slot-scope="scope">
                <ul v-if="scope.row.status == 1">
                  <li v-for="item in scope.row.express" :key="item.id">
                    <p style="color: #ff6700">{{ item.logisticsCompany }}</p>
                    <p>
                      <el-button
                        type="text"
                        @click="handleView(item)"
                        v-if="scope.row.status == 1"
                        >{{ item.courierNumber }}</el-button
                      >
                    </p>
                  </li>
                </ul>
                <p v-else>--</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="150px">
              <template slot-scope="scope">
                <p v-if="scope.row.status == 0">
                  <el-popconfirm
                    :title="'确定要取消该订单吗？'"
                    @confirm="handleCancel(scope)"
                  >
                    <el-button slot="reference" type="text">取消订单|</el-button>
                  </el-popconfirm>
                  <el-button
                    type="text"
                    @click="handleEdit(scope)"
                    style="margin-left: 0"
                    >修改地址</el-button
                  >
                </p>
                <p v-else>--</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待退货" name="fifth">
              <el-table :data="ordersFifth">
                  <el-table-column label="商品" align="center" min-width="250px" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                          <div
                                  v-for="(item, index) in scope.row.orderGoods"
                                  :key="index" class="orderprovos"
                          >

                              <div class="orderprovos-img">
                                  <img :src="$target+item.picSavepath" alt="" />
                              </div>
                              <div class="orderprovos-font">
                                  <p class="multi-ellipsis--l1">商品名称：{{ item.goodsName }}</p>
                                  <p>
                                      单价:--
                                  </p>
                              </div>
                              <div>
                                  <p>
                                      数量：{{item.goodsNum}}
                                  </p>
                              </div>
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column prop="orderTime" label="下单时间" align="center" >
                  </el-table-column>
                  <el-table-column prop="status" label="订单状态" align="center">
                      <template slot-scope="scope">
                          <span v-if="scope.row.status == 0">未发货</span>
                          <span v-else-if="scope.row.status == 1">已发货</span>
                          <span v-else>已取消</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="orderNumber" label="订单编号" align="center" min-width="100px">
                  </el-table-column>
                  <el-table-column
                          label="收货信息"
                          min-width="120px"
                  >
                      <template slot-scope="scope">
                          <p>收货人:{{scope.row.orderName}}</p>
                          <p>手机号:{{scope.row.orderTel}}</p>
                          <p>收货地址:{{scope.row.orderAddress}}</p>

                      </template>
                  </el-table-column>






                  <el-table-column label="查看物流" align="center" min-width="100px">
                      <template slot-scope="scope">
                          <ul v-if="scope.row.status == 1">
                              <li v-for="item in scope.row.express" :key="item.id">
                                  <p style="color: #ff6700">{{ item.logisticsCompany }}</p>
                                  <p>
                                      <el-button
                                              type="text"
                                              @click="handleView(item)"
                                              v-if="scope.row.status == 1"
                                      >{{ item.courierNumber }}</el-button
                                      >
                                  </p>
                              </li>
                          </ul>
                          <p v-else>--</p>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" min-width="150px">
                      <template slot-scope="scope">
                          <p v-if="scope.row.status == 0">
                              <el-popconfirm
                                      :title="'确定要取消该订单吗？'"
                                      @confirm="handleCancel(scope)"
                              >
                                  <el-button slot="reference" type="text">取消订单|</el-button>
                              </el-popconfirm>
                              <el-button
                                      type="text"
                                      @click="handleEdit(scope)"
                                      style="margin-left: 0"
                              >修改地址</el-button
                              >
                          </p>
                          <p v-else>--</p>
                      </template>
                  </el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="待换货" name="six">
              <el-table :data="ordersSix">
                  <el-table-column label="商品" align="center" min-width="250px" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                          <div
                                  v-for="(item, index) in scope.row.orderGoods"
                                  :key="index" class="orderprovos"
                          >

                              <div class="orderprovos-img">
                                  <img :src="$target+item.picSavepath" alt="" />
                              </div>
                              <div class="orderprovos-font">
                                  <p class="multi-ellipsis--l1">商品名称：{{ item.goodsName }}</p>
                                  <p>
                                      单价:--
                                  </p>
                              </div>
                              <div>
                                  <p>
                                      数量：{{item.goodsNum}}
                                  </p>
                              </div>
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column prop="orderTime" label="下单时间" align="center" >
                  </el-table-column>
                  <el-table-column prop="status" label="订单状态" align="center">
                      <template slot-scope="scope">
                          <span v-if="scope.row.status == 0">未发货</span>
                          <span v-else-if="scope.row.status == 1">已发货</span>
                          <span v-else>已取消</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="orderNumber" label="订单编号" align="center" min-width="100px">
                  </el-table-column>
                  <el-table-column
                          label="收货信息"
                          min-width="120px"
                  >
                      <template slot-scope="scope">
                          <p>收货人:{{scope.row.orderName}}</p>
                          <p>手机号:{{scope.row.orderTel}}</p>
                          <p>收货地址:{{scope.row.orderAddress}}</p>

                      </template>
                  </el-table-column>






                  <el-table-column label="查看物流" align="center" min-width="100px">
                      <template slot-scope="scope">
                          <ul v-if="scope.row.status == 1">
                              <li v-for="item in scope.row.express" :key="item.id">
                                  <p style="color: #ff6700">{{ item.logisticsCompany }}</p>
                                  <p>
                                      <el-button
                                              type="text"
                                              @click="handleView(item)"
                                              v-if="scope.row.status == 1"
                                      >{{ item.courierNumber }}</el-button
                                      >
                                  </p>
                              </li>
                          </ul>
                          <p v-else>--</p>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" min-width="150px">
                      <template slot-scope="scope">
                          <p v-if="scope.row.status == 0">
                              <el-popconfirm
                                      :title="'确定要取消该订单吗？'"
                                      @confirm="handleCancel(scope)"
                              >
                                  <el-button slot="reference" type="text">取消订单|</el-button>
                              </el-popconfirm>
                              <el-button
                                      type="text"
                                      @click="handleEdit(scope)"
                                      style="margin-left: 0"
                              >修改地址</el-button
                              >
                          </p>
                          <p v-else>--</p>
                      </template>
                  </el-table-column>
              </el-table>
          </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 我的订单主要内容END -->
    <!-- 订单为空的时候显示的内容 -->
    <empty-page :showTitle="emptyTitle" v-else></empty-page>
    <!-- 订单为空的时候显示的内容END -->
    <!-- 查看物流的弹框 -->
    <el-dialog title="查看物流" :visible.sync="dialogVisibleView" width="60%">
      <div class="dialogDiv">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.time"
            :color="activity.color"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
    <!-- 查看物流的弹框END -->
    <!-- 修改地址的弹窗 -->
    <el-dialog
      title="修改地址"
      :visible.sync="dialogVisibleAddress"
      width="80%"
    >
      <div class="dialogDiv">
        <address-page
          v-bind:getSelected="true"
          v-on:getNewAddress="getNewAddress"
        ></address-page>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelNewAddress">取 消</el-button>
        <el-button type="primary" @click="editNewAddress">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改地址的弹窗END -->
    <!-- 查看多个物流的弹框 -->
      <el-dialog 
        title="查看物流"
        :visible.sync="dialogVisiblelogisticsMany"
        width="60%" height="700px">
        <div class="company">
          <ul>
          <li v-for="item in logisticsInformation" :key="item.id" style="float:left">
                    <p>快递公司：{{ item.logisticsCompany }}</p>
                    <p>快递单号：
                      <el-button
                        type="primary"
                        @click="handleView(item)">{{ item.courierNumber }}</el-button>
                    </p>
          </li>
        </ul>
        </div>
        <div class="dialogDiv" v-if="showTime">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.time"
              :color="activity.color"
            >
              {{ activity.context }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import headerPage from "../components/header.vue";
import emptyPage from "../components/empty.vue";
import addressPage from "../components/address.vue";
export default {
  data() {
    return {
      headerTitle: "我的订单",
      emptyTitle: "订单",
      orders: [], // 刚开始渲染页面获得的订单列表
      total: [], // 每个订单的商品数量及总价列表
      activeName: "first", //刚开始显示的第几个tab标签
      isOrder: true, //是否显示订单页面
      //getSpanArr方法中要用到的方法
      spanArr: [],
      pos: 0,
      //未发货
      ordersSecond: [], //未发货的list
      ordersThird: [], //已发货的list
      ordersFour: [], //已取消的List
        ordersFifth: [], //已取消的List
        ordersSix: [], //已取消的List
        ordersList: [], //转换中的list
      ordersTrueList: [], //转换完成后的list
      logisitic_List: [],
      stringlist: {},
      dialogVisibleView: false, //查看物流的Dialog
      dialogVisibleAddress: false, //添加地址的Dialog
      query: {
        pageNum: 1,
        pageSize: 20,
      },
      //物流信息假数据
      activities: [],
      newAddress: [], //获取子组件传过来的新地址
      newOrderTel:'',//获取子组件传过来的新电话
      newOrderName:'',//获取子组件传过来的新电环
      orderId: "", //修改的地址
       dialogVisiblelogisticsMany:false,
       //底下那个显示物流的信息是否存在
      showTime:false,
    };
  },
  components: {
    headerPage,
    emptyPage,
    addressPage,
  },
  methods: {
    //查看物流的事件
    handleViewLogistic(e){
      this.dialogVisiblelogisticsMany=true;
      this.logisticsInformation=e.express;
      this.activities=[];//查看物流前，将物流信息置为空
    },
    //获取选择的新地址
    getNewAddress(val) {
      console.log(val);
      this.newAddress = val.areaName + val.addrContent;
      this.newOrderName=val.receiverName;
      this.newOrderTel=val.receiverPhone;
    },
    //确定修改地址
    editNewAddress() {
      this.$request
        .post(this.base.editAddress, {
          orderId: this.orderId,
          orderAddress: this.newAddress,
          orderName:this.newOrderName,
          orderTel:this.newOrderTel,
        })
        .then((res) => {
          if (res.resultCode == 20000) {
            this.$message.success("操作成功！");
            this.dialogVisibleAddress = false;
            this.getUnOrders();
            this.getOrders();
          } else {
            this.$message.error("操作失败，请稍后重试！");
          }
        });
    },
    //取消修改地址
    cancelNewAddress() {
      this.dialogVisibleAddress = false;
    },
    //状态栏切换的事件
    handleClick(tab) {
      if(tab.name=='first'){
        this.getOrders();
      }else if(tab.name=='second'){
        this.getUnOrders();
      }else if(tab.name=='third'){
        this.getAlOrders();
      }else if(tab.name=='fourth'){
        this.getCancelOrders();
      }else if(tab.name=='fifth'){
          this.getRollBackOrders();
      }else if(tab.name=='six'){
          this.getSwitchOrders();
      }
    },
    //合并表格
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (
        columnIndex == 0 ||
        columnIndex == 1 ||
        columnIndex == 2 ||
        columnIndex == 3 ||
        columnIndex == 9 ||
        columnIndex == 10
      ) {
        //columnIndex表示合并第几列
        const _row = this.spanArr[rowIndex]; //遍历spanArr这个数组，spanArr数组和要合并的数组ordersTrueList,行数相同。
        const _col = _row > 0 ? 1 : 0;
        return {
          // _row = 0，_col = 0 表示这一次不合并，不显示，
          // _row = 2，_col = 1 表示这一次合并两行为一行数据
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    getSpanArr() {
      // data就是我们从后台拿到的数据
      for (var i = 0; i < this.ordersTrueList.length; i++) {
        if (i === 0) {
          this.spanArr.push(1); //push 1表示第一次不进行合并
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          //这里的orderNumber是第一列的属性，我用来判断是否相同。
          if (
            this.ordersTrueList[i].orderNumber ==
            this.ordersTrueList[i - 1].orderNumber
          ) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1); //push 1 表示第一次不进行合并，
            this.pos = i;
          }
        }
      }
    },
    //查看物流的事件
    handleView(item) {
      // this.dialogVisibleView = true;
      this.showTime=true;
      //调请求物流信息的接口
      this.$request
        .get(this.base.getOrderLogistic, { orderId: item.courierNumber })
        .then((res) => {
          if (res.resultCode == 20000) {
             this.activities = JSON.parse(res.data);
             this.activities[0].color = "#ff6700";
          }else{
            this.$message.error('暂无物流信息！');
          }
        });
    },
    //取消订单
    handleCancel(scope) {
      this.$request
        .get(this.base.cancelOrder+scope.row.orderId)
        .then((res) => {
          if (res.resultCode == 20000) {
            this.$message.success("操作成功！");
            this.getUnOrders();
          } else {
            this.$message.error("操作失败，请稍后再试");
          }
        });
    },
    //修改地址
    handleEdit(val) {
      this.orderId = val.row.orderId;
      this.dialogVisibleAddress = true;
    },
    // 获取全部订单数据
    getOrders() {
      this.$request
        .post(this.base.getOrderList, this.query)
        .then((res) => {
          if (res.resultCode == 20000) {
            this.orders = res.data;
          } else {
            this.$message.error("请求超时！");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
        
    },
    //获取未发货订单的数据
    getUnOrders(){
      this.$request
        .post(this.base.getOrderList, {pageNum:1,pageSize:20,status:0})
        .then((res) => {
          if (res.resultCode == 20000) {
            this.ordersSecond = res.data;
          } else {
            this.$message.error("请求超时！");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //获取已发货的订单的数据
    getAlOrders(){
       this.$request
        .post(this.base.getOrderList, {pageNum:1,pageSize:20,status:1})
        .then((res) => {
          if (res.resultCode == 20000) {
            this.ordersThird = res.data;
          } else {
            this.$message.error("请求超时！");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    //获得已取消的商品数据
    getCancelOrders(){
      this.$request
        .post(this.base.getOrderList, {pageNum:1,pageSize:20,status:2})
        .then((res) => {
          if (res.resultCode == 20000) {
            this.ordersFour = res.data;
          } else {
            this.$message.error("请求超时！");
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
      //获得已取消的商品数据
      getRollBackOrders(){
          this.$request
              .post(this.base.getOrderList, {pageNum:1,pageSize:20,status:3})
              .then((res) => {
                  if (res.resultCode == 20000) {
                      this.ordersFour = res.data;
                  } else {
                      this.$message.error("请求超时！");
                  }
              })
              .catch((err) => {
                  return Promise.reject(err);
              });
      },

      //获得已取消的商品数据
      getSwitchOrders (){
          this.$request
              .post(this.base.getOrderList, {pageNum:1,pageSize:20,status:4})
              .then((res) => {
                  if (res.resultCode == 20000) {
                      this.ordersFour = res.data;
                  } else {
                      this.$message.error("请求超时！");
                  }
              })
              .catch((err) => {
                  return Promise.reject(err);
              });
      }
  },
  created() {
    this.getOrders();
  },
};
</script>
<style scoped>

.order {
  background-color: #fff;
  /* #f5f5f5; */
  width: 100%;
  height: 100%;
}

.order .order-content {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
.el-tabs >>> .el-tabs__item:hover {
  color: #ff6700 !important;
}
.el-tabs >>> .el-tabs__item.is-active {
  color: #ff6700 !important;
}

.el-tabs >>> .el-tabs__active-bar {
  background-color: #ff6700;
}
/* 订单列表CSS */
.order .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.order .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 80px;
}
.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.order .content ul .pro-name {
  float: left;
  width: 380px;
}
.order .content ul .pro-name a {
  color: #424242;
}
.order .content ul .pro-name a:hover {
  color: #ff6700;
}
.order .content ul .pro-price {
  float: left;
  width: 160px;
  padding-right: 18px;
  text-align: center;
}
.order .content ul .pro-num {
  float: left;
  width: 190px;
  text-align: center;
}
.order .content ul .pro-total {
  float: left;
  width: 160px;
  padding-right: 81px;
  text-align: right;
}
.order .content ul .pro-total-in {
  color: #ff6700;
}

.order .order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #ff6700;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.order .order-bar .order-bar-left {
  float: left;
}
.order .order-bar .order-bar-left .order-total {
  color: #757575;
}
.order .order-bar .order-bar-left .order-total-num {
  color: #ff6700;
}
.order .order-bar .order-bar-right {
  float: right;
}
.order .order-bar .order-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.order .order-bar .order-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
/* 订单列表CSS END */

/* 订单为空的时候显示的内容CSS */
.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}
.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.order .order-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
.dialogDiv {
  height: 500px;
  overflow: auto;
}
/* 订单为空的时候显示的内容CSS END */
/* 订单样式
 */
 .orderprovos{
   display: flex;
   justify-content: space-between;
 }
 .orderprovos-img{
   width: 100px;
   height: 100px;
   /* padding:20px; */
 }
 .orderprovos-img img{
   width: 100%;
 }
 .orderprovos-font{
   width: 200px;
   height: 100px;
   /* padding: 20px; */
 }
 /* 超过一行。。。显示 */

.multi-ellipsis--l1 {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1
}
.company{
  height: 150px;
}
.dialogDiv{
  height: 400px;
  overflow-y:auto;
}
</style>