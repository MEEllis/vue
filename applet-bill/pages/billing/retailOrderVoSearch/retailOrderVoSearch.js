import util from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerKey: "", //姓名、手机号、会员卡号模糊查询
    sectionId: "", //门店ID
    sectionName: "", //
    goodsClassId: "", //商品类别ID
    goodsClassName: "", //
    addPage: null,
    delta: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setDelta()
  },


  inputcustomerKey: function(e) {
    this.setData({
      customerKey: e.detail.value,
    });
  },

  tapOk: function(e) {
    const {
      customerKey,
      sectionId,
      sectionName,
      goodsClassId,
      goodsClassName,
      addPage
    } = this.data;
    if (addPage != null) {
      addPage.setData({
        sectionId,
        sectionName,
        goodsClassId,
        goodsClassName,
        customerKey,
      })
    }

    wx.navigateBack({

    })
  },
  tapReset: function(e) {
    this.setData({
      sectionId: '',
      sectionName: '',
      goodsClassId: '',
      goodsClassName: '',
      customerKey: '',
    });
  },

  setDelta: function() {
    const mainPage = util.getMainPage({
      route: 'pages/billing/retailOrderVo/retailOrderVo'
    })
    this.setData({
      delta: mainPage.delta,
      addPage: mainPage.addPage,
    });
    if (mainPage.addPage != null) {
      const {
        sectionId,
        sectionName,
        goodsClassId,
        goodsClassName,
        customerKey
      } = mainPage.addPage.data;
      this.setData({
        sectionId,
        sectionName,
        goodsClassId,
        goodsClassName,
        customerKey,
      });
    }
  }
})