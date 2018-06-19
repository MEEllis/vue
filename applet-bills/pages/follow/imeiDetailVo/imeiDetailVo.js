import util from '../../../utils/util.js';
import api from '../../../config/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryKey: '',
    imeiId: '',
    imeiVo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { queryKey, imeiId } = options;
    if (queryKey !== undefined) {
      this.setData({
        queryKey,
      });
    }

    if (imeiId !== undefined) {
      this.setData({
        imeiId,
      });
    }
    this.getDetailImeiVo();
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

  // 获取商品明细
  getDetailImeiVo: function () {
    const _this = this;
    const { imeiId, queryKey } = this.data;
    util.request(api.getDetailImeiVo, {
      imeiId,
      queryKey,
    }).then(res => {
      _this.setData({
        imeiVo: res.data.imeiVo,
      });
    });
  },
})