import request from '../../../utils/request.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    goodsVo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      goodsId,
    } = options;
    goodsId = goodsId === undefined ? '' : goodsId;
    this.setData({
      goodsId,
    });
    this.getDataList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  //获取 详情
  getDataList: function() {
    const that = this;
    const {
      goodsId,
    } = this.data;
    if (goodsId != '') {
      request(api.getGoodsDetailVo, {
          goodsId,
        })
        .then(res => {
          const goodsVo = res.data.goodsVo || null;
          that.setData({
            goodsVo
          });

        });
    }

  },
})