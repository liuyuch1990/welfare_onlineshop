<template>
  <div class="content">
    <div class="address-body">
      <el-button
        type="primary"
        size="small"
        style="font-size: 20px; margin-left: -5px"
        @click="addAddress">新增地址</el-button>
      <el-table
        ref="listTableRef"
        :data="address"
        @selection-change="handleCurrentChange"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" v-if="getSelected"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-descriptions
              class="margin-top"
              :title="scope.row.addrName"
              :column="3"
              border
            >
              <template slot="extra">
                <el-button
                  type="text"
                  size="small"
                  @click="handleEdit(scope.row)"
                  >编辑|</el-button
                >
                <el-popconfirm
                  
                    :title="'确定要取消该订单吗？'"
                    @confirm="handledelete(scope.row)"
                  >
                    <el-button slot="reference" size="small" type="text">删除</el-button>
                </el-popconfirm>
              </template>
              <el-descriptions-item>
                <template slot="label"> 是否是默认地址 </template>
                <el-tag type="warning" v-if="scope.row.isDef == 1"
                  >默认地址</el-tag
                >
                <el-button v-else @click="handleClick(scope.row)"
                  >设为默认地址</el-button
                >
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  姓名
                </template>
                {{ scope.row.receiverName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  手机号
                </template>
                {{ scope.row.receiverPhone }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  收货地址
                </template>
                {{ scope.row.areaName }}{{ scope.row.addrContent }}
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
      </el-table>

      <!-------------------------- -->
    </div>
    <!-- 弹框 -->
    <el-dialog
      title="新增/编辑地址"
      :visible.sync="dialogVisible"
      width="50%"
     @close="handleClose"
      append-to-body
    >

      <el-form
        ref="addressFormRef"
        :model="addressForm"
        :rules="addressRules"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="地址名称" prop="addrName">
          <el-input
            v-model="addressForm.addrName"
            placeholder="建议常用名称家里、父母家、公司"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="receiverName">
          <el-input
            v-model="addressForm.receiverName"
            placeholder="请输入收货人名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="员工号" prop="userNo">
          <el-input
                  v-model="addressForm.userNo"
                  placeholder="请输入员工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="userName">
          <el-input
                  v-model="addressForm.userName"
                  placeholder="请输入员工姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="receiverPhone">
          <el-input
            v-model="addressForm.receiverPhone"
            placeholder="请输入收货人手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select
            v-model="valueProvince"
            placeholder="请选择省市"
            @change="handleProvinceSelected"
          >
            <el-option
              v-for="item in province"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="valueCity"
            placeholder="请选择城市"
            @change="handleCitySelected"
          >
            <el-option
              v-for="item in city"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="valueArea"
            placeholder="请选择县"
            @change="handleAreaSelected"
          >
            <el-option
              v-for="item in area"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="addrContent">
            <el-input
            v-model="addressForm.addrContent"
            placeholder="具体到门牌号"
          ></el-input>
          <!-- <el-autocomplete
          style="width:488px"
            class="inline-input"
            v-model="addressForm.addrContent"
            :fetch-suggestions="querySearchAsync"
            placeholder="具体到门牌号"
            @select="selectedAddress"
          ></el-autocomplete> -->
        </el-form-item>

        <el-form-item label="设为默认地址">
          <el-switch
            v-model="addressForm.isDef"
            active-color="#ff6700"
            inactive-color="rgb(234,236,240)"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹框END -->
  </div>
</template>
<script>
export default {
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
      radio: "", //默认radio的选中值
      editIsShow: false, //编辑按钮是否展示
      address: [], //地址的数据
      isShow: "",
      dialogVisible: false, //控制弹框是否显示
      addressForm: {
        addrName: "",
        receiverName: "",
        userNo: '',
        userName: '',
        receiverPhone: "",
        isDef: false,
        addrContent: "",
      }, //编辑或者新增的表单
      addressFormTrue: {}, //要的数据
      valueProvince: "", //选择的省市
      valueCity: "", //选择的城市
      valueArea: "", //选择的县
      province: [
        {
          value: "北京",
          label: "北京",
          id: 1,
        },
        {
          value: "天津",
          label: "天津",
          id: 2,
        },
      ], //从数据库中获得的省
      city: [
        {
          value: "北京市区",
          label: "北京市区",
          id: 1,
        },
      ], //从数据库中获得的市
      area: [
        { value: "西城区", label: "西城区", id: 1 },
        { value: "东城区", label: "东城区", id: 2 },
      ], //从数据库中获得的县
      showAddress: false, //显示输入数据获得的地址框
      //表单手机号的验证
      addressRules: {
        addrName: [{ required: true, message: "请输入备注", trigger: "blur" }],
        userName: [{ required: true, message: "请输入备注", trigger: "blur" }],
        userNo: [{ required: true, message: "请输入备注", trigger: "blur" }],
        receiverPhone: [
          {  required:true, validator: validateUserPhone, trigger: "blur" }
        ],
        receiverName: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
        ],
      },
      //获得选择的市
      citySelected: "",
      //选择更改的地址
      selectedNewAddress: [],
      //选择默认地址的中转值
      addressChange: {},
    };
  },
  props: {
    // 属性名
    getSelected: {
      type: Boolean, //属性的类型
      required: false, // 属性的默认值，如果页面没有给这个getSelected赋值，就使用这个value,//selection是否显示,从页面中传过来
    },
  },
  
  methods: {
    //切换设为默认地址
    handleClick(row) {
      console.log(row);
      (row.isDef = 1), console.log(11, row);
      this.$request.post(this.base.addressUpdate, row).then((res) => {
        if (res.resultCode == "20000") {
          this.$message.success("编辑成功！");
          this.getList();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    //地址选择发生变化
    handleCurrentChange(val) {
      if (val.length > 1) {
        this.$refs.listTableRef.clearSelection();
        this.$refs.listTableRef.toggleRowSelection(val[val.length - 1]); //只显示选中最后一个 这时val还是多选的列表(就是你选中的几个数据)
      } else if (val.length === 1) {
        this.selectedNewAddress = val[val.length - 1];
      } else {
        this.selectedNewAddress = []; //this.multipleTable是选中行的最后一条数据
      }
      this.$emit("getNewAddress", this.selectedNewAddress);
    },
    //选中复选框
    handleRowClick(row) {
      this.$refs.listTableRef.toggleRowSelection(row);
    },
    //初始化数据的方法
    getList() {
      //1.获取数据库中的地址
      this.$request.get(this.base.getAddressList).then((res) => {
        if (res.resultCode == "20000") {
          this.address = res.data;
        }
      });
      //3.获取数据之后，用$emit向父组件中传递数据
      this.$emit("getAddress", this.address);
    },
    //获得数据库中的省份
    getListprovince() {
      this.$request.get(this.base.getProvince).then((res) => {
        if (res.resultCode == "20000") {
          this.province = res.data;
        }
      });
    },
    //页面省份发生变化时的值
    handleProvinceSelected(value) {
      //省份发生变化，如何城市有值，自动给他清空
      if(this.valueCity!=""){
        this.valueCity="";
      }
      if(this.valueArea!=""){
        this.valueArea=""
      }
      // 1.获得选中的值id
      this.addressForm.provinceCode = value;
      console.log(value);
      this.$request.get(this.base.getCity + value).then((res) => {
        if (res.resultCode == "20000") {
          this.city = res.data;
        }
      });
      // 2.用它来请求城市的接口
      //3.将城市的数据赋给城市的数组，回显到页面
    },
    //页面城市发生变化之后
    handleCitySelected(val) {
      //如果城市发生变化,地区置为空
      if(this.valueArea!=""){
        this.valueArea=""
      }
      // 1.获得城市的数据
      // console.log(11, val);
      this.addressForm.cityCode = val;
      this.$request.get(this.base.getArea + val).then((res) => {
        if (res.resultCode == "20000") {
          this.area = res.data;
        }
      });
      // 2.用城市的id来请求县市区的接口
      // 3.县市区的label显示到页面中去
      this.city.map((item) => {
        if (item.value === val) {
          this.citySelected = item.label;
        }
      });
    },
    //页面地区发生变化
    handleAreaSelected(val) {
      this.addressForm.areaCode = val;
      console.log(11, val.code);
      console.log(22, val.name);
    },
    //新增地址
    addAddress() {
      this.dialogVisible = true;
    },
    //编辑地址
    handleEdit(row) {
      this.dialogVisible = true;
      console.log(row.addrId);
      // this.addressForm=row;
      this.$request.get(this.base.getPersonAddress + row.addrId).then((res) => {
        //城市数据的回显
        if (res.resultCode == "0") {
          this.addressForm = res.data;
          this.valueArea = this.addressForm.areaCode;
          this.valueProvince = this.addressForm.provinceCode;
          this.valueCity = this.addressForm.cityCode;
          this.$request
            .get(this.base.getCity + this.valueProvince)
            .then((res) => {
              if (res.resultCode == "20000") {
                this.city = res.data;
                console.log(this.city);
                this.$request
                  .get(this.base.getArea + this.valueCity)
                  .then((res) => {
                    if (res.resultCode == "20000") {
                      this.area = res.data;
                      console.log(this.area);
                    }
                  });
              }
            });
          if (this.addressForm.isDef == 1) {
            this.addressForm.isDef = true;
          } else {
            this.addressForm.isDef = false;
          }
        } else {
          this.$message.error("请求失败！");
        }
      });
    },
    //删除地址
    handledelete(row){
      console.log(row.addrId);
      this.$request.delete(this.base.deleteAddress+row.addrId).then((res)=>{
        if(res.resultCode==0){
          this.$message.success('操作成功！');
          this.getList();
        }else{
          this.$message.error('操作失败，请稍后重试！');
        }
      })
    },
    //是否显示为空的样式
    isShowHandle() {
      if (this.address) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    //确认编辑或者新增
    handleConfirm() {
      // 如果新增获取选择地址的值
      if (this.addressForm.addrId) {
        if (this.addressForm.isDef == false ||this.addressForm.isDef==null) {
          this.addressForm.isDef = 0;
        } else {
          this.addressForm.isDef = 1;
        }
        this.$request
          .post(this.base.addressUpdate, this.addressForm)
          .then((res) => {
            console.log(res);
            if (res.resultCode == "20000") {
              this.$message.success("编辑成功！");
              this.dialogVisible = false;
              this.getList();
              this.addressForm = {};
            } else {
              this.$message.warning(res.message);
            }
          });
      } else {
        this.addressFormTrue.addrName = this.addressForm.addrName;
        this.addressFormTrue.receiverPhone = this.addressForm.receiverPhone;
        this.addressFormTrue.receiverName = this.addressForm.receiverName;
        this.addressFormTrue.isDef = this.addressForm.isDef;
        this.addressFormTrue.addrContent = this.addressForm.addrContent;
        this.addressFormTrue.provinceCode = this.addressForm.provinceCode;
        this.addressFormTrue.cityCode = this.addressForm.cityCode;
        this.addressFormTrue.areaCode = this.addressForm.areaCode;
        this.addressFormTrue.userName = this.addressForm.userName;
        this.addressFormTrue.userNo = this.addressForm.userNo;
        if (this.addressForm.isDef == false || this.addressForm.isDef == null) {
          this.addressFormTrue.isDef = 0;
        } else {
          this.addressFormTrue.isDef = 1;
        }
        console.log(this.addressFormTrue);
        // 1.总共的地址
        //2.存的每一个字段的
        //3.请求增加地址的接口
        this.$refs.addressFormRef.validate((valid) => {
          if (valid) {
            this.$request
              .post(this.base.addressAdd, this.addressFormTrue)
              .then((res) => {
                console.log(res);
                if (res.resultCode == "20000") {
                  this.$message.success("操作成功！");
                  this.dialogVisible = false;
                  this.getList();
                  this.$refs.addressFormRef.resetFields();
                } else {
                  this.$message.error("操作失败，请稍后重试！");
                }
              });
          } else {
            return false;
          }
        });
      }
    },
    //关闭弹框之后的回调,取消编辑和新增
    handleClose() {
      this.dialogVisible = false;
      this.$refs["addressFormRef"].resetFields();
      this.valueProvince = "";
      this.valueCity = "";
      this.valueArea = "";
      this.addressForm.isDef = 0;
    },
    //选择地区后的地址
    handleChange(value) {
      console.log(value);
    },
    //queryString 为在框中输入的值
    //callback 回调函数,将处理好的数据推回
    // querySearchAsync(queryString, callback) {
    //   var list = [{}];
    //   //调用的后台接口
    //   let url =
    //     "/ws/place/v1/suggestion/?region="+this.citySelected+"&key=5QTBZ-CBNCJ-7C6F3-KLZ24-3Q2DE-E6B34&get_poi=1&region_fix=1&address_format=short&keyword=" +
    //     queryString;
    //   //从后台获取到对象数组
    //   this.$axios
    //     .get(url)
    //     .then((response) => {
    //       //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
    //       for (let i of response.data.data) {
    //         i.value = i.title; //将想要展示的数据作为value
    //       }
    //       list = response.data.data;
    //       callback(list);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    //地图中选择的地址
    selectedAddress(item) {
      this.addressForm.addrContent = item.title;
      console.log(11, this.addressForm.addrContent);
    },
  },
  created() {
    this.isShowHandle();
    this.getList();
    this.getListprovince();
  },
};
</script>
<style scoped>
.content {
  background-color: white;
  width: 80%;
  margin: 0 auto;
}
/* 内容css结束 */

/* .el-button {
  color: rgb(255, 103, 0);
} */
/* .el-button--primary {
  background-color: white;
  border-color: rgb(255, 103, 0);
} */
.el-descriptions__header {
  margin-bottom: 5px;
}
.el-select {
  margin-right: 8px;
  width: 155px;
}

</style>