import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionId: '',
    goodsId: '',
    isGift: '',
    dataList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { sectionId, goodsId, isGift } = options;
    this.setData({
      sectionId: sectionId === undefined ? '' : sectionId,
      isGift: isGift === undefined ? '' : isGift,
      goodsId: goodsId === undefined ? '' : goodsId,
    });
    if (isGift == 1) {
      wx.setNavigationBarTitle({
        title: '选仓库(赠品)'
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  // 获取明细信息
  getDataList: function () {
    const _this = this;
    const { sectionId, goodsId, isGift } = this.data;

    util.request(api.getNumberGoodsVoListByGoodsId, {
      sectionId,
      goodsId,
    }).then(res => {
      const { dataList } = res.data;

      _this.setData({
        dataList,
      });
      if (dataList.length===1) {
          wx.navigateTo({
            url: `/pages/billing/goodDetail/goodDetail?sectionId=${sectionId}&storageId=${dataList[0].storageId}&goodsId=${dataList[0].goodsId}&isGift=${isGift}`,
          })
      }
    });
  },

})