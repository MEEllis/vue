import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_JRDB',
    scrollHeight: 0,
    keyWord: '',
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],
    startDate: '',
    endDayDate: '',
    dataList: [],
    curListData: [],
    loadingMore: true,
    page: 1,
    pageSize: 20,
    totalVo: null,
    authValidate: {
      FW: true,
      CKCBJ: false,
    },
    allotType:1,
    tabs: [{
      name: '调出',
      value: '1'
    }, {
      name: '调入',
      value: '2'
    }],
       sliderOffset: 0,
    sliderLeft: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const startDate = util.formatTime(new Date);
    this.setData({
      startDate,
      endDayDate: startDate,
    });
    this.getFirstGoodsClassVoList()
    this.getBossAuthValidate();
    this.searchSubmit()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['next-wrap', 'cate-wrap', 'search-bar']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },

  searchInput: function(e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },

  bindReceiptsDate: function(e) {
    const {
      startDate
    } = this.data;
    const {
      sign
    } = e.currentTarget.dataset;
    const curDate = new Date(startDate);
    let newDayDate;
    if (sign === 'next') {
      if (curDate >= new Date(util.formatTime(new Date()))) {
        newDayDate = startDate
      } else {
        newDayDate = util.formatTime(new Date(curDate.getTime() + 24 * 60 * 60 * 1000));
      }
    } else {
      newDayDate = util.formatTime(new Date(curDate.getTime() - 24 * 60 * 60 * 1000));
    }
    this.setData({
      startDate: newDayDate,
    });
    this.searchSubmit()

  },
  bindCurDate: function(e) {
    this.setData({
      startDate: e.detail.value
    })
    this.searchSubmit()
  },
  tabClick: function (e) {
    const allotType = e.currentTarget.dataset.value;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
    });
    this.setData({
      allotType,
    });
    this.searchSubmit();
  },
  setSlider: function () {
    var that = this;
    const {
      allotType,
      tabs
    } = this.data;
    wx.getSystemInfo({
      success: function (res) {
        let activeIndex = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].value === allotType) {
            activeIndex = i;
            break;
          }
        }
        that.setData({
          sliderOffset: res.windowWidth / that.data.tabs.length * activeIndex
        });
      }
    });
  },

  //关键字搜索
  searchSubmit: function() {
    this.setData({
      page: 1,
      dataList: [],
      loadingMore: true,
    });
    this.setSlider()
    this.getDataList();
  },
  scrolltolower: function() {
    const {
      page,
      curListData,
      pageSize
    } = this.data;
    if (curListData.length !== pageSize) {
      return;
    }
    this.setData({
      page: page + 1,
    });
    this.getDataList();
  },

  //获取一级类别
  getFirstGoodsClassVoList: function() {
    var that = this;
    serviceCom.getGoodsClassList().then(categoryData => {
      that.setData({
        categoryData,
      });
    })
  },

  //获取参数
  getSearchParam: function() {
    const {
      keyWord,
      goodsClassId,
      startDate,
      allotType
    } = this.data;
    return {
      keyWord,
      goodsClassId,
      startDate,
      allotType
    }
  },

  // 获取商品列表
  getDataList: function() {
    const that = this;
    const postData = this.getSearchParam();
    const {
      page,
      pageSize,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;

    request(api.getTodayAllotData, postData).then(res => {
      let dataList = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList,
        curListData: res.data.dataList,
        loadingMore: false,
      });
    });
  },

  //获取权限
  getBossAuthValidate: function() {
    const that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getBossAuthValidate(menuCode).then(res => {
      const authValidate = res.data;
      that.setData({
        authValidate
      });
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})