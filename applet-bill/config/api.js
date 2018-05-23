let NewApiRootUrl = ''
  NewApiRootUrl = 'http://192.168.0.62/wxapi/'; // 后台联调的接口
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
};
