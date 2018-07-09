import util from './util.js'
/**
 * 封封微信的的request
 */
export default function  request(url, data = {}, method = "POST") {
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
        'content-type': 'application/x-www-form-urlencoded',
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
            console.log(res.data)
            loginByWeixin().then(({ code, userInfo }) => {
              return request(
                api.authAutoLogin, {
                  code: code,
                  userInfo: JSON.stringify(userInfo),
                })
            }).then(ajaxData => {
              wx.setStorageSync('userInfo', ajaxData.data.employeeVo);
              wx.setStorageSync('token', ajaxData.data['ERP-WX-TOKEN']);
              wx.setStorageSync('companyList', ajaxData.data.companyList);
            })
          }
          //自动登录失败（-15）
          else if (res.data.result == -15) {
            console.log(res.data)
            wx.reLaunch({
              url: '/pages/login/login',
              success: (res) => {

              }
            })
          } else {
            util.showErrorToast(res.data.desc)
            reject(res.data);
          }
        } else {
          util.showErrorToast('操作异常！')
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        wx.hideLoading()
        util.showErrorToast()
        reject(err)
      }
    })
  });
}
