// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pwd: ''
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
    const { name, pwd } = this.data

    //  获取商城名称
    wx.request({
      method: 'POST',
      url: 'http://192.168.0.62/wxapi/auth/getAccessCompanyList',
      data: {
        userName: name,
        password: pwd,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showModal({
          content: '弹窗内容1',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      },
      fail:function (res) {
        wx.showModal({
          content: '弹窗内容2',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      },
    })

  },
})