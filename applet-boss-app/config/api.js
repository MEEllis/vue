let loginRootUrl = ''
let bossRootUrl = ''

// 明杰后台联调的接口
loginRootUrl = 'http://192.168.0.9:8801/api/v1/common/';
bossRootUrl = 'http://192.168.0.9:8802/api/v1/boss/';
// 黎超
//loginRootUrl = 'http://192.168.0.62:8801/api/v1/common/';
//bossRootUrl = 'http://192.168.0.62:8802/api/v1/boss/';

// 提交测试的接口
//loginRootUrl = 'https://branchapi.phoneerp.com/api/v1/common/';
//bossRootUrl = 'https://branchapi.phoneerp.com/api/v1/boss/';

// 预生产的接口
//loginRootUrl = 'https://pre.phoneerp.com/api/v1/common/';
//bossRootUrl = 'https://pre.phoneerp.com/api/v1/common/'; 

// 线上的接口
//loginRootUrl = 'https://www.phoneerp.com/api/v1/common/';
//bossRootUrl = 'https://www.phoneerp.com/api/v1/boss/'; 

// 模拟接口地址
// loginRootUrl = 'http://rap2api.taobao.org/app/mock/21285/api/v1/common/'; 
// bossRootUrl = 'http://rap2api.taobao.org/app/mock/21285/api/v1/boss/'; 


module.exports = {
  getAccessCompanyVoList: loginRootUrl + 'login/getAccessCompanyVoList', //可使用公司
  login: loginRootUrl + 'login/login', //使用账号密码登录
  autoLogin: loginRootUrl + 'login/autoLogin', //微信自动登录
  changeLoginCompany: loginRootUrl + 'login/changeLoginCompany', //切换登录公司

  getFirstGoodsClassVoList: bossRootUrl + 'common/getGoodsClassList', //商品一级类别集合
  getGoodsClassList: bossRootUrl + 'common/getGoodsClassList', //商品一级类别集合
  getGoodsBrandVoList: bossRootUrl + 'common/getGoodsBrandList', //商品品牌集合
  getGoodsBrandList: bossRootUrl + 'common/getGoodsBrandList', //商品品牌集合
  getBossAuthValidate: bossRootUrl + 'common/getBossAuthValidate',
  getCompanySectionList: bossRootUrl + 'common/getCompanySectionList', //商品品牌集合
  getContactUnitList: bossRootUrl + 'common/getContactUnitList', //往来单位
  getBossMenuList: bossRootUrl + 'common/getBossMenuList', //Boss小程序菜单集合
  getOperatorsList: bossRootUrl + 'common/getOperatorList', //运营商名称集合
  getOperatorUnitsList: bossRootUrl + 'common/getOperatorUnitList', //运营商单位
  getOperatorNameList: bossRootUrl + 'common/getOperatorNameList', //运营商业务名称
  getInstallmentfeesList: bossRootUrl + 'common/getInstallmentfeesList', //分期商名称
  getInstallmentBusinessList: bossRootUrl + 'common/getInstallmentBusinessList', //分期业务名称
  getDeductionUnitsList: bossRootUrl + 'common/getDeductionUnitsList', //抵扣单位集合
  getActivityNamesList: bossRootUrl + 'common/getActivityNamesList', //抵扣活动集合
  getCompanyList: bossRootUrl + 'common/getCompanyList', //公司集合
  getAccountTypeList: bossRootUrl + 'common/getAccountTypeList', //分期业务名称
  getAddValueServiceNameList: bossRootUrl + 'common/getAddValueServiceNameList', //增值服务名称集合


  getGoodsDetailVo: bossRootUrl + 'report/storage/currentStock/getGoodsDetailVo', // 商品详情页
  getStockDistrData: bossRootUrl + 'report/storage/stockDistribution/getStockDistrData', // 库存分布报表 主页
  getStockDistrDetailData: bossRootUrl + 'report/storage/stockDistribution/getStockDistrDetailData', // 库存分布报表 主页


  getImeiTrackingMainData: bossRootUrl + 'report/storage/imeiTrackingMain/getImeiTrackingMainData', // 串号跟踪主页
  getImeiTrackingDetailData: bossRootUrl + 'report/storage/imeiTrackingMain/getImeiTrackingDetailData', // 串号跟踪详情页



  getCurrentStockData: bossRootUrl + 'report/storage/currentStock/getCurrentStockData', // 实时库存报表 主页
  getCurrentStockTotalVo: bossRootUrl + 'report/storage/currentStock/getCurrentStockTotalVo', // 实时库存 主页(总计行对象)
  getCurrentStockDetailData: bossRootUrl + 'report/storage/currentStock/getCurrentStockDetailData', // 实时库存报表 (库存分布详情页)

  getMySalesData: bossRootUrl + 'report/sales/mySales/getMySalesData', // 我的销量报表主页
  getMySalesTotalVo: bossRootUrl + 'report/sales/mySales/getMySalesTotalVo', // 我的销量报表主页总计行对象
  getMySalesDetailData: bossRootUrl + 'report/sales/mySales/getMySalesDetailData', // 我的销量报表(公司或部门详情页) 
  getMySalesDetailTotalVo: bossRootUrl + 'report/sales/mySales/getMySalesDetailTotalVo', //我的销量 详情页总计行

  getGrossProfitData: bossRootUrl + 'report/sales/getGrossProfitData', // 毛利战报 主页
  getGrossProfitTotalVo: bossRootUrl + 'report/sales/getGrossProfitTotalVo', // 毛利战报 主页总计行对象
  getGrossProfitDetailData: bossRootUrl + 'report/sales/getGrossProfitDetailData', // 毛利战报 主页总计行对象 

  getPurchaseCollectData: bossRootUrl + 'report/purchase/purchaseCollect/getPurchaseCollectData', // 采购汇总报表
  getPurchaseCollectTotalVo: bossRootUrl + 'report/purchase/purchaseCollect/getPurchaseCollectTotalVo', // 采购汇总报表总计行对象

  getGrossProfitData: bossRootUrl + 'report/sales/grossProfit/getGrossProfitData', // 毛利战报 主页
  getGrossProfitTotalVo: bossRootUrl + 'report/sales/grossProfit/getGrossProfitTotalVo', // 毛利战报 主页总计行对象
  getGrossProfitDetailData: bossRootUrl + 'report/sales/grossProfit/getGrossProfitDetailData', // 毛利战报 详情页
  getGrossProfitDetailTotalVo: bossRootUrl + 'report/sales/grossProfit/getGrossProfitDetailTotalVo', // 毛利战报 详情页总计行接口

  // v1.2
  getSalesRankingData: bossRootUrl + 'report/sales/salesRanking/getPageData', //销售排行主页分页集合

  getPurchaseSalesCompareData: bossRootUrl + 'report/purchase/purchaseSalesCompare/getPageData', // 进销对比主页分页集合
  getPurchaseSalesCompareTotalVo: bossRootUrl + 'report/purchase/purchaseSalesCompare/getTotalVo', //进销对比主页总计行对象

  getMyMoneyData: bossRootUrl + 'report/contact/myMoney/getPageData', //我的资金主页分页集合
  getMyMoneyTotalVo: bossRootUrl + 'report/contact/myMoney/getTotalVo', //我的资金主页总计行对象

  getOperatorServiceData: bossRootUrl + 'report/retail/operatorService/getPageData', //运营商战报主页分页集合
  getOperatorServiceTotalVo: bossRootUrl + 'report/retail/operatorService/getTotalVo', //我的资金主页总计行对象

  getInstallMentfeeData: bossRootUrl + 'report/retail/installMentfee/getPageData', //分期业务战报主页分页集合
  getInstallMentfeeTotalVo: bossRootUrl + 'report/retail/installMentfee/getTotalVo', //分期业务战报主页总计行对象

  // v1.3
  getTodayReportData: bossRootUrl + 'report/retail/todayReport/getDataList', //今日战报主页(不分页)集合
  getTodayReportTotalVo: bossRootUrl + 'report/retail/todayReport/getTotalVo', //今日战报主页总计行对象

  getTodayPurchaseData: bossRootUrl + 'report/purchase/todayPurchase/getPageData', //今日采购主页分页集合
  getTodayPurchaseTotalVo: bossRootUrl + 'report/purchase/todayPurchase/getTotalVo', //今日采购主页总计行对象

  getStockRatioData: bossRootUrl + 'report/storage/stockRatio/getDataList', //库存占比(不分页)数据集合

  getUnsalableStockData: bossRootUrl + 'report/storage/unsalableStock/getPageData', //滞销库存主页分页集合
  getUnsalableStockTotalVo: bossRootUrl + 'report/storage/unsalableStock/getTotalVo', //滞销库存主页总计行对象
  getUnsalableStockDetailTotalVo: bossRootUrl + 'report/storage/unsalableStock/getDetailPageData', //滞销库存详情页分页集合

  getThirdPartyDeductionReportData: bossRootUrl + 'report/retail/thirdPartyDeductionReport/getPageData', //第三方抵扣战报主页分页集合
  getThirdPartyDeductionReportTotalVo: bossRootUrl + 'report/retail/thirdPartyDeductionReport/getTotalVo', //第三方抵扣战报主页总计行对象

  getValueAddedReportData: bossRootUrl + 'report/retail/valueAddedReport/getPageData', //增值服务战报主页分页集合
  getValueAddedReportTotalVo: bossRootUrl + 'report/retail/valueAddedReport/getTotalVo', //增值服务战报主页总计行

  getAssetProfileData: bossRootUrl + 'report/contact/assetProfile/getDataList', //资产概要集合
  getAssetProfileTotalVo: bossRootUrl + 'report/contact/assetProfile/getTotalVo', //资产总额
}