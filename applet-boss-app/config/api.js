let NewApiRootUrl = ''
//NewApiRootUrl = 'http://127.0.0.1:8080/wxapi/'; // 预生产的接口
//NewApiRootUrl = 'http://192.168.0.62/wxapi/'; // 后台联调的接口
//NewApiRootUrl = 'https://branch.phoneerp.com/wxapi/'; // 提交测试的接口
//NewApiRootUrl = 'https://pre.phoneerp.com/wxapi/'; // 预生产的接口

//NewApiRootUrl = 'https://www.phoneerp.com/wxapi/'; // 线上的接口
NewApiRootUrl = 'http://rap2api.taobao.org/app/mock/21285/'; // 模拟接口地址


module.exports = {
  getAccessCompanyVoList: NewApiRootUrl + 'login/getAccessCompanyVoList', //获取可使用公司
  login: NewApiRootUrl + 'login/login', //使用账号密码登录
  autoLogin: NewApiRootUrl + 'login/autoLogin', //微信自动登录
  changeLoginCompany: NewApiRootUrl + 'login/changeLoginCompany', //切换登录公司

  getFirstGoodsClassVoList: NewApiRootUrl + 'component/goods/getFirstGoodsClassVoList', //获取商品一级类别集合
  getGoodsBrandVoList: NewApiRootUrl + 'component/goods/getGoodsBrandVoList', //获取商品品牌集合
  getBossAuthValidate: NewApiRootUrl + 'boss/common/getBossAuthValidate', 
  getCompanySectionList: NewApiRootUrl + 'boss/common/getCompanySectionList', //获取商品品牌集合

  getGoodsDetailData: NewApiRootUrl + 'boss/report/storage/getGoodsDetailData', //获取商品品牌集合
  getStockDistrData: NewApiRootUrl + 'boss/report/storage/getStockDistrData', // 库存分布报表 主页
  stockDistrDetailData: NewApiRootUrl + 'boss/report/storage/stockDistrDetailData', // 库存分布报表 主页


  getCurrentStockData: NewApiRootUrl + 'boss/report/storage/getCurrentStockData', // 实时库存报表 主页
  getCurrentStockTotalVo: NewApiRootUrl + 'boss/report/storage/getCurrentStockTotalVo', // 实时库存 主页(总计行对象)
  getCurrentStockDetailData: NewApiRootUrl + 'boss/report/storage/getCurrentStockDetailData', // 实时库存报表 (库存分布详情页)


  getImeiTrackingMainData: NewApiRootUrl + 'boss/report/storage/getImeiTrackingMainData', // 串号跟踪主页
  getImeiTrackingDetailData: NewApiRootUrl + 'boss/report/storage/getImeiTrackingDetailData', // 串号跟踪详情页




}