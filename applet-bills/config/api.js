let NewApiRootUrl = ''
let baseApiRootUrl
//NewApiRootUrl = 'http://127.0.0.1:8080/wxapi/'; // 预生产的接口
//NewApiRootUrl = 'http://192.168.0.62/wxapi/'; // 后台联调的接口
 // 提交测试的接口
// NewApiRootUrl = 'https://branch.phoneerp.com/wxapi/';
// baseApiRootUrl = 'https://branchapi.phoneerp.com/';


// 预生产的接口
//NewApiRootUrl = 'https://pre.phoneerp.com/wxapi/'; 

// 线上的接口
NewApiRootUrl = 'https://www.phoneerp.com/wxapi/';
baseApiRootUrl = 'https://api.phoneerp.com/';


// 模拟接口地址
// NewApiRootUrl = 'http://rap2api.taobao.org/app/mock/13207/wxapi/'; 
// baseApiRootUrl = 'http://rap2api.taobao.org/app/mock/13207/wxapi/';


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
  getMyRankingStatistics: NewApiRootUrl + 'common/getMyRankingStatistics', //    我的排行

  getDetailImeiVo: NewApiRootUrl + 'common/getDetailImeiVo', //    串号跟踪 / 串号操作详情查询(串号精确匹配或串号id查询)
  getSimpleImeiVoPageList: NewApiRootUrl + 'common/getSimpleImeiVoPageList', //    串号跟踪 / 串号分页模糊查询(预览)

  //开单
  getAccessSectionVoList: NewApiRootUrl + 'common/getAccessSectionVoList', //获取可使用门店
  getVipVo: NewApiRootUrl + 'common/getVipVo', //    会员信息查询
  getImeiGoodsVoByImeiId: NewApiRootUrl + 'common/getImeiGoodsVoByImeiId', //开单 / 零售开单通过串号id查询串号商品信息
  getNumberGoodsVoByGoodsId: NewApiRootUrl + 'common/getNumberGoodsVoByGoodsId', //零售开单通过商品id,仓库id查询唯一数量商品信息
  getNumberGoodsVoListByGoodsId: NewApiRootUrl + 'common/getNumberGoodsVoListByGoodsId', //零售开单通过商品id查询数量商品信息集合
  getScanResultVo: NewApiRootUrl + 'common/getScanResultVo', //    开单 / 零售开单扫描(串号|条码)获取扫描接口
  getSimpleImeiGoodsVoPageList: NewApiRootUrl + 'common/getSimpleImeiGoodsVoPageList', //零售开单串号分页查询
  getSimpleGoodsVoPageList: NewApiRootUrl + 'common/getSimpleGoodsVoPageList', // 零售开单选商品(预览)分页查询
  getImeiGoodsMultiVoByGoodsId: NewApiRootUrl + 'common/getImeiGoodsMultiVoByGoodsId', // 通过商品id查询串号商品信息
  saveDraftRetailVo: NewApiRootUrl + 'common/saveDraftRetailVo', // 保存草稿单
  getDraftRetailOrderVoPageList: NewApiRootUrl + 'common/getDraftRetailOrderVoPageList', // 零售草稿单
  getRetailOrderVoPageList: NewApiRootUrl + 'common/getRetailOrderVoPageList', // 零售草稿单
  deleteDraftRetailOrderVo: NewApiRootUrl + 'common/deleteDraftRetailOrderVo', //  删除零售草稿单
  getSectionAccountVoList: NewApiRootUrl + 'common/getSectionAccountVoList', // 获取部门可使用资金账户
  saveAndPostDraftRetailVo: NewApiRootUrl + 'common/saveAndPostDraftRetailVo', // 保存草稿单并过账
  getRetailDraftOrderVo: NewApiRootUrl + 'common/getRetailDraftOrderVo', // 查询草稿单
  updateRetailRemarkById: NewApiRootUrl + 'common/updateRetailRemarkById', // 修改零售单备注
  print: baseApiRootUrl + 'api/v1/ws/clerk/assistant/retail/print', // 打印零售单
}