import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    toDayDate: "",
    curDayDate: "",
    startTime: "",
    endTime: "",
    inputShowed: false,
    queryKey: "",
    dataList: [],
    curListData: [],

    pageNumber: 1,
    pageSize: 20,
    loadingMore: true,
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curTime = util.formatTime(new Date);
    this.setData({
      toDayDate: curTime,
      curDayDate: curTime,
    });
    this.getDataList()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeight((56 + 35)).then((scrollHeight) => {
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
    this.getDataList()
  },
  tabContentClick: function (e) {
    const index = e.currentTarget.dataset.index;
    const curDate = new Date();
    let startTime = ''
    let endTime = ''
    //全部
    if (index == 0) {
      startTime = ''
      endTime = ''
    } else if (index == 1) {
      //今日
      startTime = util.formatTime(curDate);
      endTime = startTime

    } else if (index == 2) {
      //昨日
      startTime = util.formatTime(new Date(curDate.getTime() - 24 * 60 * 60 * 1000));
      endTime = startTime
    }

    this.setData({
      startTime,
      endTime,
     
      pageNumber: 1,
    });
    this.getDataList();

  },
  // 获取商品列表
  getDataList: function () {
    const _this = this;
    const { queryKey, pageNumber, pageSize, startTime, endTime } = this.data;
    util.request(api.getDraftRetailOrderVoPageList, {
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
    this.getDataList();
  },

})