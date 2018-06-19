import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imeiGoodsMultiVo: null,
    sectionId: '',
    goodsId: '',
    isGift: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { sectionId, goodsId, isGift } = options;
    this.setData({
      sectionId: sectionId === undefined ? '' : sectionId,
      goodsId: goodsId === undefined ? '' : goodsId,
      isGift: isGift === undefined ? '' : isGift,
    });
    if (isGift == 1) {
      wx.setNavigationBarTitle({
        title: '选串号(赠品)'
      })
    }
    this.getDataList()
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

  // 获取明细信息
  getDataList: function () {
    const _this = this;
    const { sectionId, goodsId } = this.data;

    util.request(api.getImeiGoodsMultiVoByGoodsId, {
      sectionId,
      goodsId,
    }).then(res => {
      const { imeiGoodsMultiVo } = res.data
      _this.setData({
        imeiGoodsMultiVo,
      });
    });
  },

})