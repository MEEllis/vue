import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billsId: '',
    orderVo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const billsId = options.billsId;
    this.setData({
      billsId
    });
    this.getDetail();
  },
  //拨打手机号
  tapTel:function(e){
    const tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  // 获取明细
  getDetail: function () {
    const _this = this;
    const { billsId } = this.data;
    util.request(api.getRetailDeliveryOrderVo, {
      billsId,
    }, 'GET').then(res => {
      _this.setData({
        orderVo: res.data.orderVo,
      });
    });
  },
})