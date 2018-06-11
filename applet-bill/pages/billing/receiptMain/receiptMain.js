import util from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalAmount: 0,
    ignoredAmount: 0,
    vipCardScore: 0,
    addPage: null,
    delta: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDelta();
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
  // 仅存草稿
  tapdraft: function () {
    const { addPage } = this.data;
    if (addPage) {
      addPage.tapSaveDraft();
    }
  },
  setDelta: function () {
    const mainPage = util.getMainPage({ route: 'pages/billing/addGood/addGood' })
    this.setData({
      delta: mainPage.delta,
      addPage: mainPage.addPage,
    });
  }
})