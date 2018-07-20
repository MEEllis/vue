let LoginNewApiRootUrl = ''
let NewApiRootUrl = ''
//NewApiRootUrl = 'http://127.0.0.1:8080/wxapi/'; // 预生产的接口

LoginNewApiRootUrl = 'http://192.168.0.9:8801/'; // 后台联调的接口
NewApiRootUrl = 'http://192.168.0.9:8802/'; // 后台联调的接口

//NewApiRootUrl = 'https://branch.phoneerp.com/wxapi/'; // 提交测试的接口
//NewApiRootUrl = 'https://pre.phoneerp.com/wxapi/'; // 预生产的接口

//NewApiRootUrl = 'https://www.phoneerp.com/wxapi/'; // 线上的接口
//NewApiRootUrl = 'http://rap2api.taobao.org/app/mock/21285/'; // 模拟接口地址


module.exports = {
  getAccessCompanyVoList: LoginNewApiRootUrl + 'login/getAccessCompanyVoList', //获取可使用公司
  login: LoginNewApiRootUrl + 'login/login', //使用账号密码登录
  autoLogin: LoginNewApiRootUrl + 'login/autoLogin', //微信自动登录
  changeLoginCompany: LoginNewApiRootUrl + 'login/changeLoginCompany', //切换登录公司

  getFirstGoodsClassVoList: NewApiRootUrl + 'boss/common/getGoodsClassList', //获取商品一级类别集合
  getGoodsClassList: NewApiRootUrl + 'boss/common/getGoodsClassList', //获取商品一级类别集合
  getGoodsBrandVoList: NewApiRootUrl + 'boss/common/getGoodsBrandList', //获取商品品牌集合
  getGoodsBrandList: NewApiRootUrl + 'boss/common/getGoodsBrandList', //获取商品品牌集合
  getBossAuthValidate: NewApiRootUrl + 'boss/common/getBossAuthValidate',
  getCompanySectionList: NewApiRootUrl + 'boss/common/getCompanySectionList', //获取商品品牌集合
  getContactUnits: NewApiRootUrl + 'boss/common/getContactUnits', //获取往来单位
  getBossMenuList: NewApiRootUrl + 'boss/common/getBossMenuList', //获取Boss小程序菜单集合
  getGoodsDetailData: NewApiRootUrl + 'boss/report/storage/getGoodsDetailData', //


  getStockDistrData: NewApiRootUrl + 'boss/report/storage/stockDistribution/getStockDistrData', // 库存分布报表 主页
  stockDistrDetailData: NewApiRootUrl + 'boss/report/storage/stockDistrDetailData', // 库存分布报表 主页


  getCurrentStockData: NewApiRootUrl + 'boss/report/storage/getCurrentStockData', // 实时库存报表 主页
  getCurrentStockTotalVo: NewApiRootUrl + 'boss/report/storage/getCurrentStockTotalVo', // 实时库存 主页(总计行对象)
  getCurrentStockDetailData: NewApiRootUrl + 'boss/report/storage/getCurrentStockDetailData', // 实时库存报表 (库存分布详情页)


  getImeiTrackingMainData: NewApiRootUrl + 'boss/report/storage/getImeiTrackingMainData', // 串号跟踪主页
  getImeiTrackingDetailData: NewApiRootUrl + 'boss/report/storage/getImeiTrackingDetailData', // 串号跟踪详情页


  getMySalesData: NewApiRootUrl + 'boss/report/sales/getMySalesData', // 我的销量报表主页
  getMySalesTotalVo: NewApiRootUrl + 'boss/report/sales/getMySalesTotalVo', // 我的销量报表主页总计行对象
  getMySalesDetailData: NewApiRootUrl + 'boss/report/sales/getMySalesDetailData', // 我的销量报表(公司或部门详情页) 
  getMySalesDetailTotalVo: NewApiRootUrl + 'boss/report/sales/mySales/getMySalesDetailTotalVo', //我的销量 详情页总计行




  getGrossProfitData: NewApiRootUrl + 'boss/report/sales/getGrossProfitData', // 毛利战报 主页
  getGrossProfitTotalVo: NewApiRootUrl + 'boss/report/sales/getGrossProfitTotalVo', // 毛利战报 主页总计行对象
  getGrossProfitDetailData: NewApiRootUrl + 'boss/report/sales/getGrossProfitDetailData', // 毛利战报 主页总计行对象 


  getPurchaseCollectData: NewApiRootUrl + 'boss/report/purchase/purchaseCollect/getPurchaseCollectData', // 采购汇总报表
  getPurchaseCollectTotalVo: NewApiRootUrl + 'boss/report/purchase/purchaseCollect/getPurchaseCollectTotalVo', // 采购汇总报表获取总计行对象

  getGrossProfitData: NewApiRootUrl + 'boss/report/sales/grossProfit/getGrossProfitData', // 毛利战报 主页
  getGrossProfitTotalVo: NewApiRootUrl + 'boss/report/sales/grossProfit/getGrossProfitTotalVo', // 毛利战报 主页总计行对象
  getGrossProfitDetailData: NewApiRootUrl + 'boss/report/sales/grossProfit/getGrossProfitDetailData', // 毛利战报 详情页
  getGrossProfitDetailTotalVo: NewApiRootUrl + 'boss/report/sales/grossProfit/getGrossProfitDetailTotalVo', // 毛利战报 详情页总计行接口
}