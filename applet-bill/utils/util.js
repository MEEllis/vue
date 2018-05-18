const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "POST") {
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title:'小云拼命加载中...',
      mask:true,
      icon: 'loading'
    })
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Nideshop-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        wx.hideLoading()
     
        if (res.statusCode == 200) {
          if (res.data.result==1){
            resolve(res.data);
          }else{
            showErrorToast()
            reject(res.data);
          }
        } else {
          showErrorToast()
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        wx.hideLoading()
        showErrorToast()
        reject(err)
      }
    })
  });
}


/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast({ msg}) {
  wx.showToast({
    title: msg||'网络异常',
    icon: 'none',
  })
}

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
}
