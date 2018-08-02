import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPayAmount: 0,
    billsId: '',
    success:null,
    message: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { totalPayAmount, billsId } = options;
    this.setData({
      totalPayAmount,
      billsId,
    });
    this.print()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  tapNew: function () {
    wx.redirectTo({
      url: '/pages/billing/newBilling/newBilling'
    })
  },
  tapCur: function () {
    const { billsId } = this.data;
    wx.navigateTo({
      url: `/pages/sales/RetailDeliveryOrderVo/RetailDeliveryOrderVo?billsId=${billsId}`
    })
  },
  tapIndex: function () {
    wx.switchTab({
      url: '/pages/billing/index/index'
    })
  },
  print:function(){
    const { billsId } = this.data;
    util.request(
      api.print,
      { billsId },
    ).then(res => {
      const { message, success } = res.data
      this.setData({
        message,
        success,
      });
    })
  },
})