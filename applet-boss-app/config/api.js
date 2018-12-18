import { loginRootUrl, bossRootUrl} from './path.js'

module.exports = {
  getAccessCompanyVoList: loginRootUrl + 'login/getAccessCompanyVoList', //可使用公司
  login: loginRootUrl + 'login/login', //使用账号密码登录
  autoLogin: loginRootUrl + 'login/autoLogin', //微信自动登录
  changeLoginCompany: loginRootUrl + 'login/changeLoginCompany', //切换登录公司

  getFirstGoodsClassVoList: bossRootUrl + 'common/getGoodsClassList', //商品一级类别
  getGoodsClassList: bossRootUrl + 'common/getGoodsClassList', //商品一级类别
  getGoodsBrandVoList: bossRootUrl + 'common/getGoodsBrandList', //商品品牌
  getGoodsBrandList: bossRootUrl + 'common/getGoodsBrandList', //商品品牌
  getBossAuthValidate: bossRootUrl + 'common/getBossAuthValidate',
  getCompanySectionList: bossRootUrl + 'common/getCompanySectionList', //商品品牌
  getContactUnitList: bossRootUrl + 'common/getContactUnitList', //往来单位
  getBossMenuList: bossRootUrl + 'common/getBossMenuList', //Boss小程序菜单
  getOperatorsList: bossRootUrl + 'common/getOperatorList', //运营商名称
  getOperatorUnitsList: bossRootUrl + 'common/getOperatorUnitList', //运营商单位
  getOperatorNameList: bossRootUrl + 'common/getOperatorNameList', //运营商业务名称
  getInstallmentfeesList: bossRootUrl + 'common/getInstallmentfeesList', //分期商名称
  getInstallmentBusinessList: bossRootUrl + 'common/getInstallmentBusinessList', //分期业务名称
  getDeductionUnitsList: bossRootUrl + 'common/getDeductionUnitsList', //抵扣单位
  getActivityNamesList: bossRootUrl + 'common/getActivityNamesList', //抵扣活动
  getCompanyList: bossRootUrl + 'common/getCompanyList', //公司
  getAccountTypeList: bossRootUrl + 'common/getAccountTypeList', //分期业务名称
  getAddValueServiceNameList: bossRootUrl + 'common/getAddValueServiceNameList', //增值服务名称


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
  getSalesRankingData: bossRootUrl + 'report/sales/salesRanking/getPageData', //销售排行主页分页

  getPurchaseSalesCompareData: bossRootUrl + 'report/purchase/purchaseSalesCompare/getPageData', // 进销对比主页分页
  getPurchaseSalesCompareTotalVo: bossRootUrl + 'report/purchase/purchaseSalesCompare/getTotalVo', //进销对比主页总计行对象

  getMyMoneyData: bossRootUrl + 'report/contact/myMoney/getPageData', //我的资金主页分页
  getMyMoneyTotalVo: bossRootUrl + 'report/contact/myMoney/getTotalVo', //我的资金主页总计行对象

  getOperatorServiceData: bossRootUrl + 'report/retail/operatorService/getPageData', //运营商战报主页分页
  getOperatorServiceTotalVo: bossRootUrl + 'report/retail/operatorService/getTotalVo', //我的资金主页总计行对象

  getInstallMentfeeData: bossRootUrl + 'report/retail/installMentfee/getPageData', //分期业务战报主页分页
  getInstallMentfeeTotalVo: bossRootUrl + 'report/retail/installMentfee/getTotalVo', //分期业务战报主页总计行对象

  // v1.3
  getTodayReportData: bossRootUrl + 'report/retail/todayReport/getDataList', //今日战报主页(不分页)
  getTodayReportTotalVo: bossRootUrl + 'report/retail/todayReport/getTotalVo', //今日战报主页总计行对象

  getTodayPurchaseData: bossRootUrl + 'report/purchase/todayPurchase/getPageData', //今日采购主页分页
  getTodayPurchaseTotalVo: bossRootUrl + 'report/purchase/todayPurchase/getTotalVo', //今日采购主页总计行对象

  getStockRatioData: bossRootUrl + 'report/storage/stockRatio/getDataList', //库存占比(不分页)数据

  getUnsalableStockData: bossRootUrl + 'report/storage/unsalableStock/getPageData', //滞销库存主页分页
  getUnsalableStockTotalVo: bossRootUrl + 'report/storage/unsalableStock/getTotalVo', //滞销库存主页总计行对象
  getUnsalableStockDetailTotalVo: bossRootUrl + 'report/storage/unsalableStock/getDetailPageData', //滞销库存详情页分页

  getThirdPartyDeductionReportData: bossRootUrl + 'report/retail/thirdPartyDeductionReport/getPageData', //第三方抵扣战报主页分页
  getThirdPartyDeductionReportTotalVo: bossRootUrl + 'report/retail/thirdPartyDeductionReport/getTotalVo', //第三方抵扣战报主页总计行对象

  getValueAddedReportData: bossRootUrl + 'report/retail/valueAddedReport/getPageData', //增值服务战报主页分页
  getValueAddedReportTotalVo: bossRootUrl + 'report/retail/valueAddedReport/getTotalVo', //增值服务战报主页总计行

  getAssetProfileData: bossRootUrl + 'report/contact/assetProfile/getPageData', //资产概要
  getAssetProfileTotalVo: bossRootUrl + 'report/contact/assetProfile/getTotalVo', //资产总额
  // v1.4                            
  getWholesaleReportData: bossRootUrl + 'report/sales/wholesaleReport/getPageData', //批发战报主页分页集合
  getWholesaleReportTotalVo: bossRootUrl + 'report/sales/wholesaleReport/getTotalVo', //批发战报主页总计行对象
 
  getSalesContrastData: bossRootUrl + 'report/sales/salesContrast/getDataList', //获取销售对比(不分页)
  salesProportionData: bossRootUrl + 'report/sales/salesProportion/getDataList', //获取销售占比(不分页)

  turnOverRateData: bossRootUrl + 'report/storage/turnOverRate/getDataList', //周转率分析top10

  getTodayAllotData: bossRootUrl + 'report/storage/todayAllot/getPageData', //获取今日调拨分页集合
  getSalesTrendData: bossRootUrl + 'report/sales/salesTrend/getDataList', //获取销售走势(不分页)集合

  getMyContactUnitData: bossRootUrl + 'report/contact/myContactUnit/getPageData', //获取今日调拨分页集合
  getMyContactUnitTotalVo: bossRootUrl + 'report/contact/myContactUnit/getTotalVo', //批发战报主页总计行对象

  getRetailPayData: bossRootUrl + 'report/contact/retailPay/getPageData', //营业款分页集合
  getRetailPayTotalVo: bossRootUrl + 'report/contact/retailPay/getTotalVo', //营业款总计行对象
}