import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import bill from '../../../services/bill.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalAmount: 0,
    totalPayAmount: 0,
    ignoredAmount: 0,
    integralDeductionAmount: 0,
    debtAmount: 0,
    sectionId: '',
    delta: 1,
    addPage: null,
    receiptMainPage: null,
    dataVo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { totalPayAmount, ignoredAmount, integralDeductionAmount, totalAmount } = options;
    totalPayAmount = totalPayAmount === undefined ? 0 : totalPayAmount;
    ignoredAmount = ignoredAmount === undefined ? 0 : ignoredAmount;
    integralDeductionAmount = integralDeductionAmount === undefined ? 0 : integralDeductionAmount;
    totalAmount = totalAmount === undefined ? 0 : totalAmount;

    this.setData({
      totalPayAmount,
      debtAmount: totalPayAmount,
      ignoredAmount,
      integralDeductionAmount,
      totalAmount,
    });
    this.setDelta();
    this.getSectionAccountVoList();
   
  },

  inputAmount: function (e) {
    const { key, index } = e.currentTarget.dataset;
    const { dataVo, totalPayAmount } = this.data;
    const amount = e.detail.num;

    if (dataVo != null) {
      dataVo[key][index].amount = amount;

      let sumAmount = 0;
      for (let keyItem in dataVo) {
        const dataList = dataVo[keyItem];
        for (let i = 0; i < dataList.length; i++) {
          const dataItem = dataList[i]
          if (dataItem.amount != undefined) {
            sumAmount = Number(util.accAdd(sumAmount, dataItem.amount))
          }
        }
      }
      this.setData({
        dataVo,
        debtAmount: Number(util.accSub(totalPayAmount, sumAmount))
      });
    }
  },
  getSectionAccountVoList: function () {
    const { sectionId } = this.data;
    const that = this;
    util.request(
      api.getSectionAccountVoList,
      { sectionId},
    ).then(res => {
      const { dataList } = res.data;
      const returnObj = {};
      if (Array.isArray(dataList)) {
        for (let i = 0; i < dataList.length; i++) {
          const dataItem = dataList[i];
          if (dataItem.status == 0) {
            if (returnObj[dataItem.accountType] === undefined) {
              returnObj[dataItem.accountType] = [];
            }
            dataItem.amount = '';
            returnObj[dataItem.accountType].push(dataItem)
          }
        }
      }
      that.setData({
        dataVo: returnObj,
      })
    })
  },
  setDelta: function () {
    const mainPage = util.getMainPage({ route: 'pages/billing/addGood/addGood' })
    const receiptMainPage = util.getMainPage({ route: 'pages/billing/receiptMain/receiptMain' })
    const { addPage } = mainPage;
    this.setData({
      delta: mainPage.delta,
      addPage: addPage,
    });
    if (addPage != null) {
      this.setData({
        sectionId: addPage.data.sectionId,
      });
    }
    if (receiptMainPage.addPage != null) {
      this.setData({
        receiptMainPage: receiptMainPage.addPage,
      });
    }
  },
  tapOk: function () {
    const { sectionId, addPage, receiptMainPage, ignoredAmount, totalAmount, totalPayAmount, dataVo, integralDeductionAmount} = this.data;

    if (addPage != null && receiptMainPage != null) {
      const { remark } = receiptMainPage.data;
      const saveData = {
        sectionId,
        ignoredAmount,
        totalAmount,
        integralDeductionAmount,
        remark,
        addPage,
        dataVo,
        onlinePayFlag: 0,
      }
      bill.saveAndPostDraftRetailVo(saveData).then((res) => {
        wx.reLaunch({
          url: `/pages/billing/paySuccess/paySuccess?totalPayAmount=${totalPayAmount}&billsId=${res.data.billsId}`
        });
      })
    }
    else {
      util.showErrorToast('操作有误！')
    }
  }
})