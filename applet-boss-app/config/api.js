let LoginNewApiRootUrl = ''
let NewApiRootUrl = ''
//NewApiRootUrl = 'http://127.0.0.1:8080/wxapi/'; // 预生产的接口
// 后台联调的接口
//LoginNewApiRootUrl = 'http://192.168.0.9:8801/';
//NewApiRootUrl = 'http://192.168.0.9:8802/';
// 黎超
//LoginNewApiRootUrl = 'http://192.168.0.62:8801/';
//NewApiRootUrl = 'http://192.168.0.62:8802/';

// 提交测试的接口
LoginNewApiRootUrl = 'https://branch.phoneerp.com/common/';
NewApiRootUrl = 'https://branch.phoneerp.com/boss/';

//NewApiRootUrl = 'https://pre.phoneerp.com/wxapi/'; // 预生产的接口

//NewApiRootUrl = 'https://www.phoneerp.com/wxapi/'; // 线上的接口
//NewApiRootUrl = 'http://rap2api.taobao.org/app/mock/21285/'; // 模拟接口地址


module.exports = {
  getAccessCompanyVoList: LoginNewApiRootUrl + 'login/getAccessCompanyVoList', //获取可使用公司
  login: LoginNewApiRootUrl + 'login/login', //使用账号密码登录
  autoLogin: LoginNewApiRootUrl + 'login/autoLogin', //微信自动登录
  changeLoginCompany: LoginNewApiRootUrl + 'login/changeLoginCompany', //切换登录公司
  
  getFirstGoodsClassVoList: NewApiRootUrl + 'common/getGoodsClassList', //获取商品一级类别集合
  getGoodsClassList: NewApiRootUrl + 'common/getGoodsClassList', //获取商品一级类别集合
  getGoodsBrandVoList: NewApiRootUrl + 'common/getGoodsBrandList', //获取商品品牌集合
  getGoodsBrandList: NewApiRootUrl + 'common/getGoodsBrandList', //获取商品品牌集合
  getBossAuthValidate: NewApiRootUrl + 'common/getBossAuthValidate',
  getCompanySectionList: NewApiRootUrl + 'common/getCompanySectionList', //获取商品品牌集合
  getContactUnitList: NewApiRootUrl + 'common/getContactUnitList', //获取往来单位
  getBossMenuList: NewApiRootUrl + 'common/getBossMenuList', //获取Boss小程序菜单集合

  getGoodsDetailVo: NewApiRootUrl + 'report/storage/currentStock/getGoodsDetailVo', // 商品详情页


  getStockDistrData: NewApiRootUrl + 'report/storage/stockDistribution/getStockDistrData', // 库存分布报表 主页
  getStockDistrDetailData: NewApiRootUrl + 'report/storage/stockDistribution/getStockDistrDetailData', // 库存分布报表 主页


  getImeiTrackingMainData: NewApiRootUrl + 'report/storage/imeiTrackingMain/getImeiTrackingMainData', // 串号跟踪主页
  getImeiTrackingDetailData: NewApiRootUrl + 'report/storage/imeiTrackingMain/getImeiTrackingDetailData', // 串号跟踪详情页



  getCurrentStockData: NewApiRootUrl + 'report/storage/currentStock/getCurrentStockData', // 实时库存报表 主页
  getCurrentStockTotalVo: NewApiRootUrl + 'report/storage/currentStock/getCurrentStockTotalVo', // 实时库存 主页(总计行对象)
  getCurrentStockDetailData: NewApiRootUrl + 'report/storage/currentStock/getCurrentStockDetailData', // 实时库存报表 (库存分布详情页)





  getMySalesData: NewApiRootUrl + 'report/sales/mySales/getMySalesData', // 我的销量报表主页
  getMySalesTotalVo: NewApiRootUrl + 'report/sales/mySales/getMySalesTotalVo', // 我的销量报表主页总计行对象
  getMySalesDetailData: NewApiRootUrl + 'report/sales/mySales/getMySalesDetailData', // 我的销量报表(公司或部门详情页) 
  getMySalesDetailTotalVo: NewApiRootUrl + 'report/sales/mySales/getMySalesDetailTotalVo', //我的销量 详情页总计行




  getGrossProfitData: NewApiRootUrl + 'report/sales/getGrossProfitData', // 毛利战报 主页
  getGrossProfitTotalVo: NewApiRootUrl + 'report/sales/getGrossProfitTotalVo', // 毛利战报 主页总计行对象
  getGrossProfitDetailData: NewApiRootUrl + 'report/sales/getGrossProfitDetailData', // 毛利战报 主页总计行对象 


  getPurchaseCollectData: NewApiRootUrl + 'report/purchase/purchaseCollect/getPurchaseCollectData', // 采购汇总报表
  getPurchaseCollectTotalVo: NewApiRootUrl + 'report/purchase/purchaseCollect/getPurchaseCollectTotalVo', // 采购汇总报表获取总计行对象

  getGrossProfitData: NewApiRootUrl + 'report/sales/grossProfit/getGrossProfitData', // 毛利战报 主页
  getGrossProfitTotalVo: NewApiRootUrl + 'report/sales/grossProfit/getGrossProfitTotalVo', // 毛利战报 主页总计行对象
  getGrossProfitDetailData: NewApiRootUrl + 'report/sales/grossProfit/getGrossProfitDetailData', // 毛利战报 详情页
  getGrossProfitDetailTotalVo: NewApiRootUrl + 'report/sales/grossProfit/getGrossProfitDetailTotalVo', // 毛利战报 详情页总计行接口
}