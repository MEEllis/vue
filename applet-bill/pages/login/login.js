
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pwd: '',
    companyList:[],//公司列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.thridModal = this.selectComponent("#thridModal");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  ,
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  clearName: function (e) {
    this.setData({
      name: ""
    });
  },
  inputPwd: function (e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  clearPwd: function (e) {
    this.setData({
      pwd: ""
    });
  },
  loginSubmit: function (e) {
    const _this = this;
    const { name, pwd } = this.data
    wx.authorize({
      scope: 'scope.userInfo',
      success:()=> {
        // 用户已经同意小程序使用用户信息
        wx.getUserInfo({
          success(user) {
            // 登录
            wx.login({
              success: res => {
                if (res.code){
                  //发起网络请求
                  wx.request({
                    method: 'POST',
                    url: 'http://192.168.0.62/wxapi/auth/getAccessCompanyList',
                    data: {
                      userName: name,
                      password: pwd
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: (ajaxData) => {
                      console.log(ajaxData)
                      _this.setData({
                        companyList: ajaxData.data.data.companyList
                      });
                      _this.thridModal.show();
                    }
                  })

              
                }
              }
            })
          }
        })
      }
    })
  },
  tapCompany: function (e){
    // 用户已经同意小程序使用用户信息
    const { name, pwd } = this.data;
    const companyId = e.currentTarget.dataset.id;
    wx.getUserInfo({
      success(user) {
        // 登录
        wx.login({
          success: res => {
            if (res.code) {
              //发起网络请求
              wx.request({
                method: 'POST',
                url: 'http://192.168.0.62/wxapi/auth/login',
                data: {
                  userName: name,
                  password: pwd,
                  companyId,
                  code: res.code,
                  userInfo: JSON.stringify(user),
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: (ajaxData) => {
           
                  wx.setStorageSync('userInfo', ajaxData.data.data.employeeVo);
                  wx.setStorage({
                    key: "token",
                    data: ajaxData.data.data['ERP-WX-TOKEN'],
                    success: function () {
                      wx.switchTab({
                        url: '/pages/stock/stock'
                      });
                    }
                  });
                }
              })


            }
          }
        })
      }
    })
  }
})