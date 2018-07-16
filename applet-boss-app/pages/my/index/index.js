import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceUser from '../../../services/user.js';
var appInstance = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    WXUserInfo: {},//微信用户信息
    ysUserInfo: {},//云盛用户信息
    companyIndex:0,
    companyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWXUserInfo();
    this.getysUserInfo();
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
            that.getCompanyList();
          }
        })
      }
    })
  },
  getysUserInfo: function (cb) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          ysUserInfo: res.data
        });
      }
    })
  },
  getCompanyList: function (cb) {
    var that = this;
    const { ysUserInfo } = this.data;
    wx.getStorage({
      key: 'companyList',
      success: function (res) {
        let companyIndex=0;
        for (let i = 0; i < res.data.length;i++){
          if (ysUserInfo.companyId == res.data[i].id){
            companyIndex=i;
            break;
          }
        }
        that.setData({
          companyList: res.data,
          companyIndex,
        });
      }
    })
  },
  bindPickerChange: function (e) {
    var that = this
    var index = e.detail.value;
    var companyId = this.data.companyList[index].id; // 这个id就是选中项的id
    util.loginByWeixin().then(({ code, userInfo }) => {
      return util.request(
        api.changeLoginCompany,
        {
          code: code,
          companyId,
          userInfo: JSON.stringify(userInfo),
        },
      )
    }).

      serviceUser.changeLoginCompany(companyId).then(ajaxData => {
        that.getysUserInfo();
        that.getCompanyList()
        appInstance.globalData.isChangeCompany = true;


    
      })
  },
  relogin: function (e) {
    try {
      wx.clearStorageSync()
    } catch (e) {

    }
    wx.reLaunch({
      url: '/pages/login/login',
      success: (res) => {

      }
    })
  }
})