import util from '../../../utils/util.js';
import api from '../../../config/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    activeCategoryId: '',
    categoryData: [],
    pageNumber: 1,
    pageSize: 20,
    dataList: [],
    curListData: [],
    loadingMore: true,
    scrollHeight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    wx.setNavigationBarTitle({
      title: '实时库存'
    });
    this.getGoodsFirstClass();
    this.getGoodsList();
    wx.getSystemInfo({
      success: function (res) {
        //误差调控10
        const scrollHeight = res.windowHeight - res.windowWidth / 750 * ((56 + 48 + 10 ) * 2 +10) 
        // 计算主体部分高度,单位为px
        that.setData({
          scrollHeight,
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
    this.setData({
      pageNumber: 1,
      dataList: [],
    });
    this.getGoodsList()
  },
  //选择一级类别
  cateTap: function (e) {
    const activeCategoryId = e.currentTarget.dataset.id;
    this.setData({
      activeCategoryId,
      pageNumber: 1,
      dataList: [],
    });
    this.getGoodsList();
  },
  // 获取商品列表
  getGoodsList: function () {
    const _this = this;
    const { inputVal, activeCategoryId, pageNumber, pageSize } = this.data;
    util.request(api.getStockSimpleGoodsVoPageList, {
      firstClassId: activeCategoryId,
      queryKey: inputVal,
      pageNumber,
      pageSize,
    }
    ).then(res => {
      let dataList = _this.data.dataList.concat(res.data.dataList)
      _this.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore:false,
      });
    });
  },
  // 获取一级类别列表
  getGoodsFirstClass: function () {
    const _this = this;
    util.request(api.getGoodsFirstClass, {},
      'GET'
    ).then(res => {
      let categoryData = [{
        id: '',
        dataId: '',
        name: '全部'
      }]

      _this.setData({
        categoryData: categoryData.concat(res.data.dataList)
      });
    });
  },
  scrolltolower: function () {
    if (this.data.curListData.length === 0) {
      return;
    }
    this.setData({
      pageNumber: this.pageNumber + 1,
    });
    this.getGoodsList();
  },
})