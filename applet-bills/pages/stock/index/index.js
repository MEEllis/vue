import util from '../../../utils/util.js';
import api from '../../../config/api.js';
var appInstance = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    activeCategoryId: '',
    categoryData: [],
    dataList: [],
    curListData: [],
    total: 1,
    pageNumber: 1,
    pageSize: 20,
    loadingMore: true,
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsFirstClass();
    this.getGoodsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeight((56 + 48 + 10)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var pages = getCurrentPages()
    if (appInstance.globalData.isChangeCompany===true){
      appInstance.globalData.isChangeCompany=false;
      wx.reLaunch({
        url: '/' + pages[pages.length - 1].route
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
        total: res.data.total,
        loadingMore: false,
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
    const { total, pageNumber } = this.data;
    if (pageNumber >= total) {
      return;
    }
    this.setData({
      pageNumber: this.data.pageNumber + 1,
    });
    this.getGoodsList();
  },
})