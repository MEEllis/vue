import util from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delta: 1,
    addPage: null,
    receiptMainPage: null,
    vipVo: {},
    integralDeductionAmount: 0,
    sAmount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { integralDeductionAmount}=options;
    this.setData({
      integralDeductionAmount,
    });
    this.setDelta()
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
  setDelta: function () {
    const mainPage = util.getMainPage({ route: 'pages/billing/addGood/addGood' })
    const receiptMainPage = util.getMainPage({ route: 'pages/billing/receiptMain/receiptMain' })
    const { addPage } = mainPage;
    this.setData({
      delta: mainPage.delta,
      addPage: mainPage.addPage,
    });
    if (addPage != null) {
      this.setData({
        vipVo: addPage.data.vipVo,
        sAmount: util.accMul(util.accDiv(addPage.data.vipVo.vipCardScore, addPage.data.vipVo.deductionIntegral), addPage.data.vipVo.deductionAmount),
      });
    }

    if (receiptMainPage.addPage != null) {
      this.setData({
        receiptMainPage: receiptMainPage.addPage,
      });
    }
  },
  inputAmount: function (e) {
    this.setData({
      integralDeductionAmount: e.detail.num,
    });
  },
  tapOK: function () {
    const { receiptMainPage, integralDeductionAmount, sAmount } = this.data;
    if (Number(integralDeductionAmount) < 0) {
      util.showErrorToast('抵现金额不能小于0！')
      return;
    }
    if (Number(integralDeductionAmount) > Number(sAmount)) {
      util.showErrorToast('抵现金额不能大于可抵现金额！')
      return;
    }
    if (receiptMainPage != null) {
      receiptMainPage.setData({
        integralDeductionAmount,
      })
      wx.navigateBack()
    }

  },
})