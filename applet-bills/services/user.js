/**
 * 用户相关服务
 */
import util from '../utils/util.js'
import api from '../config/api.js'

/**
 * 调用微信登录
 */
function loginByWeixin() {

  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      code = res.code;
      return util.getUserInfo();
    }).then((userInfo) => {
      resolve({ code, userInfo});
    }).catch((err) => {
      reject(err);
    })
  });
}



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
  loginByWeixin,
  checkLogin,
};











