/**
 * 用户相关服务
 */
import util from '../utils/util.js'
import request from '../utils/request.js'
import api from '../config/api.js'

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function(resolve, reject) {
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
// 获取公司
function getCompanyVoList(name, pwd) {
  return new Promise(function(resolve, reject) {
    util.login()
      .then(
        res => {
          if (res.code) {
            return request(
              api.getAccessCompanyVoList, {
                userName: name,
                password: pwd,
              }, "POST",{
                isAuth:false,
              }
            )
          }
        }
      ).catch(() => {
        reject(false);
      }).then(ajaxData => {
        wx.setStorageSync('companyList', ajaxData.data.dataList)
        resolve(ajaxData)
      }).catch(() => {
        reject(false);
      });;
  })

}
// 登录
function login(name, pwd, companyId) {
  return new Promise(function(resolve, reject) {
    util.loginByWeixin().then(({
      code,
      userInfo
    }) => {
      return request(
        api.login, {
          userName: name,
          password: pwd,
          companyId,
          code: code,
          userInfo: JSON.stringify(userInfo),
        }, "POST", {
          isAuth: false,
        }
      )
    }).then(ajaxData => {
      setUserInfo(ajaxData)
      resolve(ajaxData)
    }).catch(res => {
      reject(false)
    })
  })
}

// 微信自动登录
function autoLogin() {
  return new Promise(function(resolve, reject) {
    checkLogin().then(res => {
      return util.loginByWeixin()
      })
      .then(res => {
        return request(
          api.autoLogin, {
            code: res.code,
            userInfo: JSON.stringify(res.userInfo),
          },
          "POST", {
            hideLoading: true,
            isAuth: false,
          }
        )
      })
      .catch(res => {
        reject(false)
        reLaunchLogin()
      })
      .then(ajaxData => {
        setUserInfo(ajaxData)
        resolve(ajaxData)
      }).catch(res => {
        reject(false)
        reLaunchLogin()
      })
  })
}
function reLaunchLogin() {
  setTimeout(function() {
    wx.reLaunch({
      url: '/pages/login/login',
      success: (res) => {

      }
    })
  }, 80)
}

// 切换登录公司
function changeLoginCompany(companyId) {
  return new Promise(function(resolve, reject) {
    util.loginByWeixin().then((res) => {
      return request(
        api.changeLoginCompany, {
          code: res.code,
          companyId,
          userInfo: JSON.stringify(res.userInfo),
        } 
      )
    }).then(ajaxData => {
      setUserInfo(ajaxData)
      resolve(ajaxData)
    }).catch(res => {
      reject(false)
    })
  })
}

function getUpdateManager(){
  // 获取小程序更新机制兼容
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          wx.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
          })
        })
      }
    })
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

function setUserInfo(ajaxData){
  wx.setStorageSync('userInfo', ajaxData.data.loginEmployeeVo);
  wx.setStorageSync('token', ajaxData.data['ERP-WX-TOKEN']);
  wx.setStorageSync('companyList', ajaxData.data.accessCompanyVoList);
}

function clearUserInfo(){
  wx.removeStorageSync('userInfo');
  wx.removeStorageSync('token');
  wx.removeStorageSync('companyList');
}

module.exports = {
  checkLogin,
  getCompanyVoList,
  login,
  autoLogin,
  changeLoginCompany,
  clearUserInfo,
  getUpdateManager
};