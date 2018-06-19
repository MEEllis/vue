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
    dataList: [],
    sumStockCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      sectionId,
      goodsId,
      isGift
    } = options;
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

  // 获取明细信息
  getDataList: function() {
    const _this = this;
    const {
      sectionId,
      goodsId,
      isGift
    } = this.data;

    util.request(api.getNumberGoodsVoListByGoodsId, {
      sectionId,
      goodsId,
    }).then(res => {
      const {
        dataList
      } = res.data;
      let sumStockCount = 0;
      if (Array.isArray(dataList)) {     
        for (let i = 0; i < dataList.length; i++) {
          sumStockCount = util.accAdd(sumStockCount, dataList[i].stockCount)
        }
      }
      _this.setData({
        dataList,
        sumStockCount,
      });
      if (dataList.length === 1) {
        wx.navigateTo({
          url: `/pages/billing/goodDetail/goodDetail?sectionId=${sectionId}&storageId=${dataList[0].storageId}&goodsId=${dataList[0].goodsId}&isGift=${isGift}`,
        })
      }
    });
  },

})