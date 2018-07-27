import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import request from '../../../utils/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imeiId: '',
    CKCBJ:false,
    dataList: {},
    goodsVo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      imeiId,
      CKCBJ,
    } = options;

    imeiId = imeiId === undefined ? '' : imeiId;
    CKCBJ = CKCBJ === 'true' ? true : false;
    this.setData({
      imeiId,
      CKCBJ,
    });
    this.getDetailImeiVo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  // 获取商品明细
  getDetailImeiVo: function() {
    const _this = this;
    const {
      imeiId
    } = this.data;
    request(api.getImeiTrackingDetailData, {
      imeiId,
    }).then(res => {
      _this.setData({
        dataList: res.data.dataList,
        goodsVo: res.data.goodsVo,
      });
    });
  },
})