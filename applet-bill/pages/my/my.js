// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    WXUserInfo:{} ,//微信用户信息
    ysUserInfo: {},//云盛用户信息
    companyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    });
    this.getWXUserInfo();
    this.getysUserInfo();
    this.getCompanyList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  },
  getWXUserInfo: function (cb) {
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              WXUserInfo: res.userInfo
            });
          }
        })
      }
    })
  },
  getysUserInfo: function (cb) {
    var that = this
    wx.getStorage({
      key:'userInfo',
      success: function (res) {
        that.setData({
          ysUserInfo: res.data
        });
      }
    })
  },
  getCompanyList: function (cb) {
    var that = this
    wx.getStorage({
      key: 'companyList',
      success: function (res) {
        that.setData({
          companyList: res.data
        });
      }
    })
  },
})