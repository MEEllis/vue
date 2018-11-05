import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCode: 'BOSS_JXDB',
    scrollHeight: 0,
    companySectionParam: '',
    companySectionParamNodeType: 'Company',
    companySectionParamId: '',
    companySectionParamName: '',
    companySectionParamData: [],
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],

    keyWord: '',
    timeActive: 0,
    startDate: '',
    endDate: '',
    page: 1,
    pageSize: 20,
    dataList: [],
    curListData: [],
    loadingMore: true,
    authValidate: {
      FW: true,
      CKCBJ: false,
    },
    tabs: [{
      name: '今日',
      value: 0
    }, {
      name: '昨日',
      value: 1
    }, {
      name: '近7天',
      value: 2
    }, {
      name: '近30天',
      value: 3
    }, {
      name: '自定义',
      value: 4
    }],
    sliderOffset: 0,
    sliderLeft: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    let curDate = new Date();
    curDate = util.formatTime(curDate);
    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,
      startDate: curDate,
      endDate: curDate,
    })
    this.getFirstGoodsClassVoList()
    this.getCompanySectionList();
    this.getBossAuthValidate();
    this.searchSubmit();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this;
    util.getScrollHeightByEle(['cate-wrap', 'search-bar', 'sel-time', 'weui-navbar', 'sum-wrap']).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight: scrollHeight - 1,
      })
    })
  },
  tabClick: function(e) {
    const timeActive = e.currentTarget.dataset.value;
    const curDate = new Date();
    const curTime = util.formatTime(curDate);

    // 自定义
    if (timeActive == 4) {
      this.tapAdvanced()
    } else {
      let startDate
      let endDate
      //今日
      if (timeActive == 0) {
        startDate = curTime;
        endDate = curTime;
      }
      // 昨日
      else if (timeActive == 1) {
        const lastDate = util.formatTime(new Date(curDate.setTime(curDate.getTime() - 24 * 60 * 60 * 1000)))
        startDate = lastDate;
        endDate = lastDate;
      }
      // 近7天
      else if (timeActive == 2) {
        const lastDate = util.formatTime(new Date(curDate.setTime(curDate.getTime() - 24 * 60 * 60 * 1000 * 7)))
        startDate = lastDate;
        endDate = curTime;
      }
      // 近30天
      else if (timeActive == 3) {
        const lastDate = util.formatTime(new Date(curDate.setTime(curDate.getTime() - 24 * 60 * 60 * 1000 * 30)))
        startDate = lastDate;
        endDate = curTime;
      }
      this.setData({
        startDate,
        endDate,
        timeActive,
        sliderOffset: e.currentTarget.offsetLeft,
      });
      this.searchSubmit();
    }

  },

  searchInput: function(e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
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
    this.getTotalVo();
  },

  setSlider: function() {
    var that = this;
    const {
      timeActive,
      tabs
    } = this.data;
    wx.getSystemInfo({
      success: function(res) {
        let activeIndex = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].value == timeActive) {
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
  tapAdvanced: function() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/purchaseSalesCompare/purchaseSalesCompare?route=${currentPage.route}&barTitle=进销对比-查询条件`,
    })
  },
  //选择一级类别
  cateTap: function(e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    this.setData({
      goodsClassId: id,
      goodsClassName: name,
    });
    this.searchSubmit()
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
  setCompanySectionParam() {
    const {
      companySectionParamNodeType,
      companySectionParamId,
    } = this.data;
    let companySectionParam = '';
    companySectionParam = serviceCom.setCompanySectionParam(companySectionParamNodeType, companySectionParamId);
    this.setData({
      companySectionParam,
    });
  },
  //获取参数
  getSearchParam: function() {
    this.setCompanySectionParam();
    const {
      companySectionParam,
      keyWord,
      goodsClassId,
      startDate,
      endDate,
    } = this.data;
    return {
      companySectionParam,
      keyWord,
      goodsClassId,
      startDate,
      endDate,
    }
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
  //获取公司
  getCompanySectionList: function() {
    var that = this;
    const {
      menuCode
    } = this.data;
    serviceCom.getCompanySectionList({
      menuCode,
    }).then(companySectionParamData => {
      that.setData({
        companySectionParamData,
      });
    })
  },
  // 获取列表
  getDataList: function() {
    const that = this;
    const postData = this.getSearchParam();
    const {
      page,
      pageSize,
    } = this.data;
    postData.page = page;
    postData.pageSize = pageSize;
    request(api.getPurchaseSalesCompareData, postData).then(res => {
      let dataLists = that.data.dataList.concat(res.data.dataList)
      that.setData({
        dataList: dataLists,
        curListData: res.data.dataList,
        loadingMore: false,
      });

    });
  },
  //获取总计行对象
  getTotalVo: function() {
    var that = this;
    const postData = this.getSearchParam();
    request(api.getPurchaseSalesCompareTotalVo, postData).then(res => {
      that.setData({
        totalVo: res.data.totalVo,
      });
    })
  },
  //获取权限
  getBossAuthValidate: function() {
    const that = this;
    const {
      menuCode,
      tabs,
    } = this.data;
    serviceCom.getBossAuthValidate(menuCode).then(res => {
      const authValidate = res.data;
      that.setData({
        authValidate,
        tabs,
      });

    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})