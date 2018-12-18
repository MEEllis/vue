let loginRootUrl = ''
let bossRootUrl = ''

// 明杰后台联调的接口
loginRootUrl = 'http://192.168.0.9:8801/api/v1/common/';
bossRootUrl = 'http://192.168.0.9:8802/api/v1/boss/';
// 黎超
//loginRootUrl = 'http://192.168.0.62:8801/api/v1/common/';
//bossRootUrl = 'http://192.168.0.62:8802/api/v1/boss/';

// 提交测试的接口
// loginRootUrl = 'https://branchapi.phoneerp.com/api/v1/common/';
// bossRootUrl = 'https://branchapi.phoneerp.com/api/v1/boss/';

// 预生产的接口
// loginRootUrl = 'https://preapi.phoneerp.com/api/v1/common/';
// bossRootUrl = 'https://preapi.phoneerp.com/api/v1/boss/'; 

// 线上的接口
// loginRootUrl = 'https://api.phoneerp.com/api/v1/common/';
// bossRootUrl = 'https://api.phoneerp.com/api/v1/boss/';

// 模拟接口地址
// loginRootUrl = 'http://rap2api.taobao.org/app/mock/21285/api/v1/common/';
// bossRootUrl = 'http://rap2api.taobao.org/app/mock/21285/api/v1/boss/';

module.exports = {
  loginRootUrl,
  bossRootUrl,
};