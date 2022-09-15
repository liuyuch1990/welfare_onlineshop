export const APID = {
    getList: '/goods/list', //查询商品的列表
    getOrderList: '/order/get/getOrder', //查询用户订单
    getOrderLogistic: 'order/queryLogistics', //查看物流信息的接口
    getAddressList: 'addr/queryList', //获取用户地址的接口
    getProvince: 'addr/province', //请求省
    getCity: 'addr/city/', //请求市
    getArea: 'addr/area/', //请求县区
    addressAdd: 'addr/insert', //新增地址的接口
    addressUpdate: '/addr/update', //编辑地址的接口
    getPerson: 'user/queryById', //获取个人信息的接口
    editPerson: 'user/update', //编辑个人信息
    getPersonAddress: '/addr/get/', //获得个人的某个地址的信息
    editAddress: 'order/edit', //修改订单地址
    cancelOrder: 'order/cancelOrder/', //取消订单
    deleteAddress: '/addr/delete/', //删除地址管理中的地址
    queryTab: '/com/queryGoodsTypeDropDownList', // 查询公司商品分类
}