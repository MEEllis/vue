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
                password: pwd
              }
            )
          }
        }
      ).catch(() => {
        reject(false);
      }).then(ajaxData => {
        wx.setStorageSync('companyList', ajaxData.data.companyList)
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
        }
      )
    }).then(ajaxData => {
      wx.setStorageSync('userInfo', ajaxData.data.employeeVo);
      wx.setStorageSync('token', ajaxData.data['ERP-WX-TOKEN']);
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
      return request(
        api.autoLogin, {
          code: res.code,
          userInfo: JSON.stringify(res.userInfo),
        },
        "POST", {
          hideLoading: true
        }
      )
    }).catch(res => {
      reject(false)
      reLaunchLogin()
    }).then(ajaxData => {
      wx.setStorageSync('userInfo', ajaxData.data.employeeVo);
      wx.setStorageSync('token', ajaxData.data['ERP-WX-TOKEN']);
      wx.setStorageSync('companyList', ajaxData.data.companyList);
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
        },
      )
    }).then(ajaxData => {
      wx.setStorageSync('userInfo', ajaxData.data.employeeVo);
      wx.setStorageSync('token', ajaxData.data['ERP-WX-TOKEN']);
       wx.setStorageSync('companyList', ajaxData.data.companyList);
      resolve(ajaxData)
    }).catch(res => {
      reject(false)
    })
  })
}

module.exports = {
  checkLogin,
  getCompanyVoList,
  login,
  autoLogin,
  changeLoginCompany,
};