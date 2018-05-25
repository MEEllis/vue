import util from '../../../utils/util.js';
import api from '../../../config/api.js';
var sliderWidth = 150; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsVo: {},
    tabs: ["本店库存:", "他店库存:"],
    inputVal: "",
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scrollHeightTab1: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const goodsVo = {
      goodsId: options.id,
    }
    this.setData({
      goodsVo
    });
 
    this.getStockDetailGoodsVo()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    const topHeight = 121 + 10 + 60;
    util.getScrollHeight([topHeight, topHeight+56]).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeightTab1: scrollHeight[0],
        scrollHeightTab2: scrollHeight[1],
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

  },
  // 获取明细信息
  getStockDetailGoodsVo: function () {
    const _this = this;
    const { goodsId } = this.data.goodsVo;

    util.request(api.getStockDetailGoodsVo, {
      goodsId
    },
      'GET'
    ).then(res => {
      let goodsVo = res.data.goodsVo
      goodsVo.reOtherSectionStockList = goodsVo.otherSectionStockList
      _this.setData({
        goodsVo,
      });
    });
  },
  //菜单tab
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //跳转进入串号详情页
  tapDetailImei: function (e) {
    console.log(e)
    const { goodsId, ifManageImei, name } = this.data.goodsVo;
    const { storageid, sectionname, storagename } = e.currentTarget.dataset;
    if (ifManageImei == 1) {
      wx.navigateTo({
        url: `/pages/stock/goodImeiDetail/goodImeiDetail?goodsId=${goodsId}&goodsName=${name}&storageId=${storageid}&storageName=${storagename}&sectionName=${sectionname}`
      })
    }

  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.searchSubmit()
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    this.searchSubmit()
  },
  //关键字搜索
  searchSubmit: function () {
    var that = this;
    const { goodsVo, inputVal } = this.data;
    if (goodsVo.reOtherSectionStockList) {
      const { reOtherSectionStockList } = goodsVo;
      const otherSectionStockList = reOtherSectionStockList.filter(data => {

        if (String(data.sectionCode).indexOf(inputVal) > -1 || String(data.sectionName).indexOf(inputVal) > -1) {
          return true;
        }
      });
      goodsVo.otherSectionStockList = otherSectionStockList;
      this.setData({
        goodsVo,
      });
    }
  },
})