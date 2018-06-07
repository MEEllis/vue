function formatTime(date, fmt = 'yyyy-MM-dd') {
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "POST") {
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '小云拼命加载中...',
      mask: true,
      icon: 'loading'
    })
    console.log(url)

    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'ERP-WX-TOKEN': wx.getStorageSync('token')
      },
      success: function (res) {
        wx.hideLoading()

        if (res.statusCode == 200) {
          if (res.data.result == 1) {
            resolve(res.data);
          }
          // 未登录时（-1），先调用自动登录
          else if (res.data.result == -1) {
            util.request(
              api.authAutoLogin,
              {
                code: code,
                userInfo: JSON.stringify(userInfo),
              }).then(ajaxData => {
                wx.setStorageSync('userInfo', ajaxData.data.employeeVo);
                wx.setStorageSync('token', ajaxData.data['ERP-WX-TOKEN']);
                wx.setStorageSync('companyList', ajaxData.data.companyList);
              })

          }
          //自动登录失败（-15）
          else if (res.data.result == -15) {
            wx.reLaunch({
              url: '/pages/login/login',
              success: (res) => {

              }
            })
          }
          else {
            showErrorToast(res.data.desc)
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

function showErrorToast(msg) {
  wx.showToast({
    title: msg || '服务君繁忙~',
    icon: 'none',
  })
}

//获取滚动高度
function getScrollHeight(subHeight) {
  return new Promise(function (resolve, reject) {
    wx.getSystemInfo({
      success: function (res) {
        let scrollHeight
        if (Array.isArray(subHeight)) {
          scrollHeight = []
          for (let i = 0; i < subHeight.length; i++) {
            //误差调控5
            scrollHeight.push(res.windowHeight - ((res.windowWidth / 750) * (subHeight[i] * 2)) + 5)
          }
        } else {
          //误差调控5
          scrollHeight = res.windowHeight - ((res.windowWidth / 750) * (subHeight * 2)) + 5
        }
        resolve(scrollHeight);
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}


module.exports = {
  formatTime,
  request,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
  getScrollHeight,
}
