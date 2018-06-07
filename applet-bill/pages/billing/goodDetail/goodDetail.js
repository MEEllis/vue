import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import bill from '../../../services/bill.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionId: '',
    imeiId: '',
    goodsId: '',
    goodInfo: null,
    delta: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { sectionId, goodsId, imeiId, scanType, delta } = options;
    this.setData({
      sectionId,
      goodsId,
      imeiId,
      scanType,
      delta,
    });

    if (scanType == 2) {
      this.getImeiGoodsVoByImeiId();
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //匹配到串号商品(单个)
  getImeiGoodsVoByImeiId: function () {
    var that = this;
    const { sectionId, imeiId, delta } = this.data;
    const goodsVo = bill.getStorageGoodsVo();
    util.request(
      api.getImeiGoodsVoByImeiId,
      {
        sectionId,
        imeiId,
      },
    ).then(ajaxData => {

      const { imeiGoodsVo } = ajaxData.data;

      bill.checkGoodsVoItemIsExist(imeiGoodsVo).then((goodInfo) => {

        goodInfo.discountRate = bill.getDiscountRateByGoodsClassId(goodInfo);
        goodInfo.discountedPrice = Number(goodInfo.retailPrice) * Number(goodInfo.discountRate) / 100;
        goodInfo.discountedAmount = Number(goodInfo.discountedPrice);
        goodInfo.goodsNumber = 1;
        goodInfo.remark = '';
        //列表不存在录入商品
        that.setData({
          goodInfo,
        })
      }).catch((flag) => {
        //列表存在录入商品
        setTimeout(() => {
          wx.navigateBack({
            delta
          })
        }, 1500)
      });
    })
  },
  inputUnitPrice: function (e) {
    const { goodInfo } = this.data;
    if (goodInfo) {
      goodInfo.unitPrice = e.detail.value;
      goodInfo.discountedAmount = Number(goodInfo.unitPrice) * Number(goodInfo.goodsNumber);
      this.setData({
        goodInfo,
      });
    }

  },
  inputRemark: function (e) {
    const { goodInfo } = this.data;
    if (goodInfo) {
      goodInfo.remark = e.detail.value;
      this.setData({
        goodInfo,
      });
    }

  },
  tapOk: function () {
    const { goodInfo, delta } = this.data;
    bill.setStorageGoodsVoByItem(goodInfo).then(res => {
      wx.navigateBack({
        delta
      })
    })
  },
  tapCancle: function () {

  },
})