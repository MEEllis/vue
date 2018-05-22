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
    var that = this;
    const goodsVo={
      goodsId: options.id,
    }
    this.setData({
      goodsVo
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
        //误差调控10
        const scrollHeightTab1 = res.windowHeight - res.windowWidth / 750 * (380+10)
        const scrollHeightTab2 = res.windowHeight - res.windowWidth / 750 * (380+112+ 10)
        // 计算主体部分高度,单位为px
        that.setData({
          scrollHeightTab1,
          scrollHeightTab2
        })
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
    const { storageid, sectionname, storagename} = e.currentTarget.dataset;
    if (ifManageImei==1){
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
    const { goodsVo, inputVal} =this.data;
    if (goodsVo.reOtherSectionStockList){
      const { reOtherSectionStockList } = goodsVo; 
      const otherSectionStockList = reOtherSectionStockList.filter(data => {

        if (String(data.sectionCode).indexOf(inputVal) > -1 || String(data.sectionName).indexOf(inputVal) > -1){
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