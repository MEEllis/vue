import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabContent: ['今日', '本周', '本月', '自定义'],
    activeIndex: 0,
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
    modalConfirmStartTime: '',
    modalConfirmEndTime: '',
    sectionId: "", //门店ID
    sectionName: "", //
    goodsClassId: "", //商品类别ID
    goodsClassName: "", //
    customerKey: "",//姓名、手机号、会员卡号模糊查询
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.thridModal = this.selectComponent("#thridModal");
    const curTime = util.formatTime(new Date);
    this.setData({
      toDayDate: curTime,
      curDayDate: curTime,
      startTime: curTime,
      endTime: curTime,
      modalConfirmStartTime: curTime,
      modalConfirmEndTime: curTime,
    });
   
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeight((56 +50+ 35+5)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      pageNumber: 1,
      dataList: [],
    });
    this.getDataList()
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },

  inputTyping: function(e) {
    this.setData({
      queryKey: e.detail.value
    });
  },
  hideInput: function() {
    wx.navigateTo({
      url: '/pages/billing/retailOrderVoSearch/retailOrderVoSearch',
    })
  },
  clearInput: function() {
    this.setData({
      queryKey: ""
    });
    this.searchSubmit()
  },
  //关键字搜索
  searchSubmit: function() {
    this.setData({
      pageNumber: 1,
      dataList: [],
    });
    this.getDataList()
  },
  tabContentClick: function(e) {
    const index = e.currentTarget.dataset.index;
    const curDate = new Date();
    let startTime = ''
    let endTime = ''
    //['今日', '本周', '本月', '自定义'
    if (index == 0) {
      //今日
      startTime = util.formatTime(curDate);
      endTime = startTime
    } else if (index == 1) {
      // 本周
      const nowDayOfWeek = curDate.getDay(); //今天本周的第几天 
      const nowDay = curDate.getDate(); //当前日 
      const nowMonth = curDate.getMonth(); //当前月 
      const nowYear = curDate.getFullYear(); //当前年 

      const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
     
      startTime = util.formatTime(weekStartDate);
      endTime = util.formatTime(curDate);
    } else if (index == 2) {
      // 本月
      startTime = util.formatTime(new Date(new Date().setDate(1)))
      endTime = util.formatTime(curDate);
    } else {
      this.setData({
        modalConfirmStartTime: this.data.startTime,
        modalConfirmEndTime: this.data.endTime,
      });
      this.thridModal.show();
    }

    if (index < 3) {
      this.setData({
        startTime,
        endTime,
        activeIndex: index,
        pageNumber: 1,
        dataList: [],
      });
      this.getDataList();
    }



  },
  // 获取商品列表
  getDataList: function() {
    const _this = this;
    const {
      queryKey,
      pageNumber,
      pageSize,
      startTime,
      endTime,
      sectionId,
      goodsClassId,
      customerKey,
    } = this.data;
    util.request(api.getRetailOrderVoPageList, {
      startTime,
      endTime,
      queryKey,
      pageNumber,
      pageSize,
      sectionId,
      goodsClassId,
      customerKey,
    }).then(res => {
      let dataList = _this.data.dataList.concat(res.data.dataList)
      _this.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });
    });
  },
  scrolltolower: function() {
    if (this.data.curListData.length === 0) {
      return;
    }
    this.setData({
      pageNumber: this.data.pageNumber + 1,
    });
    this.getDataList();
  },
  bindDateStart: function(e) {
    this.setData({
      modalConfirmStartTime: e.detail.value
    })
  },
  bindDateEnd: function(e) {
    this.setData({
      modalConfirmEndTime: e.detail.value
    })
  },
  modalConfirm: function(e) {

    const {
      modalConfirmStartTime,
      modalConfirmEndTime
    } = this.data;

    this.setData({
      startTime: modalConfirmStartTime,
      endTime: modalConfirmEndTime,
      activeIndex: 3,
      pageNumber: 1,
      dataList: [],
    })
    this.getDataList();

    this.thridModal.hide();
  },
})