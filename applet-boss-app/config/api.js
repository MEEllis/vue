let NewApiRootUrl = ''
//NewApiRootUrl = 'http://127.0.0.1:8080/wxapi/'; // 预生产的接口
//NewApiRootUrl = 'http://192.168.0.62/wxapi/'; // 后台联调的接口
//NewApiRootUrl = 'https://branch.phoneerp.com/wxapi/'; // 提交测试的接口
//NewApiRootUrl = 'https://pre.phoneerp.com/wxapi/'; // 预生产的接口

//NewApiRootUrl = 'https://www.phoneerp.com/wxapi/'; // 线上的接口
NewApiRootUrl = 'http://rap2api.taobao.org/app/mock/21285/'; // 模拟接口地址


module.exports = {
  getFirstGoodsClassVoList: NewApiRootUrl +'component/goods/getFirstGoodsClassVoList',
  getStockDistrData: NewApiRootUrl + 'boss/report/storage/getStockDistrData',// 库存分布报表 主页
  getCurrentStockData: NewApiRootUrl + 'boss/report/storage/getCurrentStockData',// 实时库存报表 主页

}