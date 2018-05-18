import util from '../../../utils/util.js';
import api from '../../../config/api.js';
var sliderWidth = 150; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    goodsVo: {},
    tabs: ["本店库存:", "他店库存:"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      goodsId: options.id,
    });
    wx.setNavigationBarTitle({
      title: '实时库存详细'
    });
    this.getStockDetailGoodsVo()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取明细信息
  getStockDetailGoodsVo: function () {
    const _this = this;
    const { goodsId } = this.data;

    util.request(api.getStockDetailGoodsVo, {
      goodsId
    },
      'GET'
    ).then(res => {

      _this.setData({
        goodsVo: res.data.goodsVo,

      });
    });
  },
  //菜单tab
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})