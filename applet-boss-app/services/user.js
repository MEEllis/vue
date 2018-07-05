/**
 * 用户相关服务
 */
import util from '../utils/util.js'

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    //检查是否有userInfo，token
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      // 检查微信会话是否过期
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}


module.exports = {
  checkLogin,
};











