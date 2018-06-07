import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sectionId: '',
    goodsId: '',
    dataList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { sectionId, goodsId } = options;
    this.setData({
      sectionId,
      goodsId,
    });
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
    const { sectionId, goodsId } = this.data;

    util.request(api.getNumberGoodsVoListByGoodsId, {
      sectionId,
      goodsId,
    }).then(res => {
      const { dataList } = res.data
      _this.setData({
        dataList,
      });
    });
  },

})