import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authObj:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getBossMenuList()
  },
  // 获取Boss小程序菜单集合
  getBossMenuList: function() {
    const that = this;
    request(api.getBossMenuList, {}, 'POST').then(res => {
      const authObj={}; 
      if (Array.isArray(res.data.dataList)) {
        for (let i = 0; i < res.data.dataList.length; i++) {
          var item = res.data.dataList[i];
          authObj[item.code] = item;
        }
      }
      that.setData({
        authObj,
      });  
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})