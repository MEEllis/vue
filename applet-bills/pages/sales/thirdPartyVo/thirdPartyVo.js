import util from '../../../utils/util.js';
import api from '../../../config/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: "",
    endTime: "",
    inputShowed: false,
    queryKey: "",
    dataList: [],
    curListData: [],
    totalVo: {},
    pageNumber: 1,
    pageSize: 20,
    loadingMore: true,
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const startTime = options.startTime;
    const endTime = options.endTime;
    this.setData({
      startTime,
      endTime,
    });
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeight((56 + 35 + 60 + 6)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  inputTyping: function (e) {
    this.setData({
      queryKey: e.detail.value
    });
  },
  hideInput: function () {
    this.setData({
      queryKey: "",
      inputShowed: false
    });
    this.searchSubmit()
  },
  clearInput: function () {
    this.setData({
      queryKey: ""
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
  // 获取商品列表
  getGoodsList: function () {
    const _this = this;
    const { queryKey, pageNumber, pageSize, startTime, endTime } = this.data;
    util.request(api.getThirdPartySalesVoPageList, {
      startTime,
      endTime,
      queryKey,
      pageNumber,
      pageSize,
    }).then(res => {
      let dataList = _this.data.dataList.concat(res.data.dataList)
      _this.setData({
        dataList,
        curListData: res.data.dataList,
        totalVo: res.data.totalVo,
        loadingMore: false,
      });
    });
  },
  scrolltolower: function () {
    if (this.data.curListData.length === 0) {
      return;
    }
    this.setData({
      pageNumber: this.data.pageNumber + 1,
    });
    this.getGoodsList();
  },
})