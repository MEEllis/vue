import util from './util.js'
import serviceUser from '../services/user.js';


/**
 * 封封微信的的request
 */
export default function request(url, data = {}, method = "POST", config) {
  return new Promise(function(resolve, reject) {
    config = config || {};
    if (config.hideLoading !== true) {
      wx.showLoading({
        title: '小云拼命加载中...',
        mask: true,
        icon: 'loading'
      })
    }
    let header;
    //是否权限
    if (config.isAuth === false){
      header = {
        'content-type': 'application/x-www-form-urlencoded',
        'MINI-APP-CODE': '0002'
      }
    }else{
      header = {
        'content-type': 'application/x-www-form-urlencoded',
        'ERP-WX-TOKEN': wx.getStorageSync('token')
      }
    }

    wx.request({
      url: url,
      data: data,
      method: method,
      header,
      success: function(res) {
        wx.hideLoading()
        const {
          code
        } = res.data;
        if (res.statusCode == 200) {
          if (code === '0000') {
            resolve(res.data);
          }
          // 未登录时（），先调用自动登录
          else if (code === '1000') {
            // serviceUser.autoLogin()
            console.log(serviceUser)
          }
          //自动登录失败（）
          else if (res.data.code == '1002') {
            console.log(res.data)
            wx.reLaunch({
              url: '/pages/login/login',
              success: (res) => {}
            })
          }
          //权限不足
          else if (res.data.code == 1100) {
            wx.switchTab({
              url: '/pages/report/index/index'
            });
          } 
          else {
            util.showErrorToast(res.data.desc)
            reject(res.data);
          }
        } else {
          util.showErrorToast('操作异常！')
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        wx.hideLoading()
        util.showErrorToast()
        reject(err)
      }
    })
  });
}