<!--
 * @Description: 首页组件
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:36:12
 -->
<template>
  <div class="container">
    <!-- 头部 -->
    <header-page :showHeader="headerTitle"></header-page>
    <!-- 个人信息 -->
    <div class="content">
      <div class="person">
        <el-form
          ref="form"
          label-position="left"
          :model="form"
          label-width="90px"
        >
          <el-form-item label="绑定手机号">
            <el-input v-model="form.userPhone" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司编号">
            <el-input v-model="form.userCom" disabled></el-input>
          </el-form-item>
        
          <el-form-item>
            <!-- <el-button @click="handleCancel" type="primary" plain size="small" >取消</el-button> -->
            <!-- <el-button @click="handleEdit" type="primary" size="small" style="width:100%;background-color:#ff6700;border-color:#ff6700;">修改</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 个人信息END -->
  </div>
</template>
<script>
import headerPage from "../components/header.vue";
export default {
  data() {
    return {
      headerTitle:'个人信息',
      form: {
        userName:'',
        userNo:'',
        userCom:'',
        userPhone:'',
        userId:'',
      }, //个人信息表单
      //修改后的表单
      editForm:{
        userName:'',
        userNo:'',
        userCom:'',
        userId:'',
      }
      
    };
  },
  components:{
    headerPage,
  },
  created() {
    this.getMessage();
  },
  methods: {
    //获取个人信息
    getMessage(){
     const tempUserInfo={};
     this.form=JSON.parse(localStorage.getItem('userInfo',tempUserInfo));
    },
  //编辑
   handleEdit(){
     this.editForm.userName=this.form.userName;
     this.editForm.userNo=this.form.userNo;
     this.editForm.userId=this.form.userId;
     this.editForm.userCom=this.form.userCom;
     this.editForm.userPhone=this.form.userPhone;
    //  console.log(this.editForm);
    
     this.$request.post(this.base.editPerson,this.editForm).then((res)=>{
       if(res.resultCode==20000){
         this.$message.success('操作成功！');
         const tempUserInfo={
                   userCom:this.editForm.userCom,
                   userName:this.editForm.userName,
                   userNo:this.editForm.userNo,
                   userPhone:this.editForm.userPhone,
                   userId:this.editForm.userId,
         }
        localStorage.setItem('userInfo',JSON.stringify(tempUserInfo))
       }else{
         this.$message.error(res.message);
       }
       
     })
   },
  //  取消编辑，重置表单
   handleCancel(){},
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  background-color: white;
}
/* 内容css */
.content {
  background-color: white;
 
}
.person  {
  width: 30%;
  top: 30%;
  left: 35%;
  position:relative;
}
/* 内容css结束 */
</style>