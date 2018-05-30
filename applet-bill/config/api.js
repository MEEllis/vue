let NewApiRootUrl = ''
//NewApiRootUrl = 'http://192.168.0.62/wxapi/'; // 后台联调的接口
//NewApiRootUrl = 'https://branch.phoneerp.com/wxapi/'; // 提交测试的接口
NewApiRootUrl = 'http://rap2api.taobao.org/app/mock/13207/wxapi/'; // 模拟接口地址


module.exports = {
  authLogin: NewApiRootUrl + 'auth/login', //账号密码登录
  authAutoLogin: NewApiRootUrl + 'auth/autoLogin', //微信账号自动登录
  authGetAccessCompanyList: NewApiRootUrl + 'auth/getAccessCompanyList', //可使用公司列表
  changeLoginCompany: NewApiRootUrl + 'auth/changeLoginCompany', //切换登录公司
  getGoodsFirstClass: NewApiRootUrl + 'common/getGoodsFirstClass', //商品一级类别集合
  getStockSimpleGoodsVoPageList: NewApiRootUrl + 'common/getStockSimpleGoodsVoPageList', //在库商品查询(预览)
  getStockDetailGoodsVo: NewApiRootUrl + 'common/getStockDetailGoodsVo', //单个在库商品查询(详情)
  getImeiStockVoPageList: NewApiRootUrl + 'common/getImeiStockVoPageList', // 在库串号分页查询

  getMySalesStatistics: NewApiRootUrl + 'common/getMySalesStatistics', //  我的销量
  getGoodsSalesVoPageList: NewApiRootUrl + 'common/getGoodsSalesVoPageList', //   我的商品销售流水
  getOperatorSalesVoPageList: NewApiRootUrl + 'common/getOperatorSalesVoPageList', //   我的运营商业务流水
  getInstallmentSalesVoPageList: NewApiRootUrl + 'common/getInstallmentSalesVoPageList', //   我的分期业务流水
  getAddedServicesSalesVoPageList: NewApiRootUrl + 'common/getAddedServicesSalesVoPageList', //   我的增值服务流水
  getThirdPartySalesVoPageList: NewApiRootUrl + 'common/getThirdPartySalesVoPageList', //   我的第三方抵扣流水
  getRetailDeliveryOrderVo: NewApiRootUrl + 'common/getRetailDeliveryOrderVo', //    零售单详情
  getRetailRefundOrderVo: NewApiRootUrl + 'common/getRetailRefundOrderVo', //    零售退货单详情
  getMyReceiptsStatistics: NewApiRootUrl + 'common/getMyReceiptsStatistics', //    我的营业款
  getMyRankingStatistics: NewApiRootUrl + 'common/getMyRankingStatistics', //    我的营业款
};
