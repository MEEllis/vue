import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billsId: '',
    orderVo: {},
    goodOn: true,
    operatorOn: false,
    addedServicesOn: false,
    thirdPartyOn: false,
    installmentOn: false,
    payAmountOn: true,
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
  tapTel: function (e) {
    const tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  // 获取明细
  getDetail: function () {
    const _this = this;
    const { billsId } = this.data;
    util.request(api.getRetailRefundOrderVo, {
      billsId,
    }, 'GET').then(res => {
      _this.setData({
        orderVo: res.data.orderVo,
      });
    });
  },
  //tap的显示/隐藏
  tapList: function (e) {
    const target = e.currentTarget.dataset.target
    const flagOn = this.data[target];
    const setObj = {}
    setObj[target] = !flagOn
    this.setData(setObj);
  },
})