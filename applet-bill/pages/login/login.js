import util from '../../utils/util.js';
import api from '../../config/api.js';
import user from '../../services/user.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '15116201365',
    pwd: '123456',
    companyList: [],//公司列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '云盛店员助手'
    })
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

  inputPwd: function (e) {
    this.setData({
      pwd: e.detail.value
    });
  },

  formSubmit: function (e) {
    const wxUserInfo = e.detail;
    const _this = this;
    const { name, pwd } = this.data
    util.login().then(({ code }) => {
      if (code) {
        util.request(
          api.authGetAccessCompanyList,
          {
            userName: name,
            password: pwd
          },
        ).then(ajaxData => {
          _this.setData({
            companyList: ajaxData.data.companyList
          });
          _this.thridModal.show();
        }
          )
      }
    })
  },
  tapCompany: function (e) {
    // 用户已经同意小程序使用用户信息
    const { name, pwd } = this.data;
    const companyId = e.currentTarget.dataset.id;
    user.loginByWeixin().then(({ code, userInfo }) => {
      return util.request(
        api.authLogin,
        {
          userName: name,
          password: pwd,
          companyId,
          code: code,
          userInfo: JSON.stringify(userInfo),
        },
      )
    }).then(ajaxData => {
      wx.setStorageSync('userInfo', ajaxData.data.employeeVo);
      wx.setStorage({
        key: "token",
        data: ajaxData.data['ERP-WX-TOKEN'],
        success: function () {
          wx.switchTab({
            url: '/pages/stock/index/index'
          });
        }
      });
    })
  }
})