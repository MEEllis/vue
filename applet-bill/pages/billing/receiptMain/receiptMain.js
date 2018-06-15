import util from '../../../utils/util.js';
import bill from '../../../services/bill.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalAmount: 0,
    ignoredAmount: 0,
    totalPayAmount: 0,
    shouldReceiveAmount: 0,
    vipCardScore: 0,
    integralDeductionAmount: 0,
    remark: '',
    addPage: null,
    delta: 1,
    sectionId: '',
    vipVo: {},
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
    this.summary();
  },

  inputIgnoredAmount: function (e) {
    this.setData({
      ignoredAmount: e.detail.num,
    });
    this.summary();
  },
  inputRemark: function (e) {
    this.setData({
      remark: e.detail.value,
    });
  },
  summary: function () {
    const { totalAmount, ignoredAmount, totalPayAmount, shouldReceiveAmount, integralDeductionAmount } = this.data;
    this.setData({
      totalPayAmount: util.accSub(util.accSub(totalAmount, ignoredAmount), integralDeductionAmount),
    });
  },
  // 仅存草稿
  tapdraft: function () {
    const { addPage } = this.data;
    if (addPage) {
      addPage.tapSaveDraft();
    }
  },
  // 扫码收款
  tapScanCode: function (e) {
    const { paytype } = e.currentTarget.dataset;
    const { sectionId, addPage, ignoredAmount, totalAmount, remark, totalPayAmount, integralDeductionAmount} = this.data;
    if (addPage != null) {
      const { vipVo, goodsVo } = addPage.data;
      //扫码
      wx.scanCode({
        success: (res) => {
          const saveData = {
            sectionId,
            ignoredAmount,
            totalAmount,
            integralDeductionAmount,
            remark,
            addPage,
            onlinePayFlag: 1,
            scanPayVo: {
              payType: paytype,
              authNo: res.result,
              amount: util.accMul(totalPayAmount,100),
            }
          }
          bill.saveAndPostDraftRetailVo(saveData).then(() => {
            wx.redirectTo({
              url: `/pages/billing/paySuccess/paySuccess?totalPayAmount=${totalPayAmount}&billsId=${res.data.billsId}`
            });
          })
        }
      })
    } else {
      util.showErrorToast('操作有误！')
    }

  },
  getSectionAccountVoList: function () {
    const { sectionId } = this.data;
    const that = this;
    util.request(
      api.getSectionAccountVoList,
      { sectionId },
    ).then(res => {
        console.log(res)
    })
  },
  tapxianxia: function () {
    const { totalAmount, totalPayAmount, ignoredAmount, integralDeductionAmount } = this.data;
    wx.navigateTo({
      url: `/pages/billing/offlinePay/offlinePay?totalAmount=${totalAmount}&ignoredAmount=${ignoredAmount}&integralDeductionAmount=${integralDeductionAmount}&totalPayAmount=${totalPayAmount}`,
    })
  },
  setDelta: function () {
    const mainPage = util.getMainPage({ route: 'pages/billing/addGood/addGood' })
    const { addPage } = mainPage;
    this.setData({
      delta: mainPage.delta,
      addPage: mainPage.addPage,
    });
    if (addPage != null) {
      this.setData({
        sectionId: addPage.data.sectionId,
        totalAmount: addPage.data.totalAmount,
        vipVo: addPage.data.vipVo,
      });
    }
  }
})