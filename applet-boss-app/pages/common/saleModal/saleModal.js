import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    route: '',
    barTitle: '',
    delta: 1,
    addPage: null,
    companySectionParamId: '',
    companySectionParamNodeType: '',
    companySectionParamName: '',
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],
    goodsBrandId: '',
    goodsBrandName: '全部',
    BrandData: [],

    startDate: '',
    endDate: '',
    timeActive: 0,
    timeList: ['今日', '本周', '本月', '自定义'],
    toDayDate: '',

    salesTypeList: [{
      name: '全部',
      value: ''
    }, {
      name: '零售',
      value: '1'
    }, {
      name: '批发',
      value: '2'
    }],
    salesType: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      route,
      barTitle,
    } = options;
    route = route === undefined ? '' : route;
    barTitle = barTitle === undefined ? '' : barTitle;
    if (barTitle != '') {
      wx.setNavigationBarTitle({
        title: barTitle,
      })
    }

    const curTime = util.formatTime(new Date);

    this.setData({
      route,
      toDayDate: curTime,
      startDate: curTime,
      endDate: curTime,
    });
    this.setDelta();
  },
  //切换时间
  timeRadioChange: function(e) {
    const timeActive = e.detail.value;
    this.setData({
      timeActive,
    });

    const curTime = util.formatTime(new Date);

    if (timeActive == 0) {
      this.setData({
        startDate: curTime,
        endDate: curTime,
      });
    } else if (timeActive == 1) {
      const {
        startDate,
        endDate,
      } = util.getCurBWeekend();
      this.setData({
        startDate,
        endDate,
      });
    } else if (timeActive == 2) {
      const {
        startDate,
        endDate,
      } = util.getCurBMonth();
      this.setData({
        startDate,
        endDate,
      });
    }
  },
  //切换类型
  salesTypeRadioChange: function(e) {
    const salesType = e.detail.value;
    this.setData({
      salesType,
    });
  },

  bindDateStart: function(e) {
    const date = e.detail.value;
    const {
      startDate,
      endDate,
    } = this.data;
    if (new Date(date) > new Date(endDate)) {
      util.showErrorToast('开始日期不能大于结束日期！')
      this.setData({
        startDate,
      })
    } else {
      this.setData({
        startDate: date,
        timeActive: 3,
      })
    }

  },
  bindDateEnd: function(e) {
    const date = e.detail.value
    const {
      startDate,
      endDate,
    } = this.data;

    if (new Date(date) < new Date(startDate)) {
      util.showErrorToast('开始日期不能大于结束日期！')
      this.setData({
        endDate,
      })
    } else {
      this.setData({
        endDate: date,
        timeActive: 3,
      })
    }

  },

  tapShowDetail: function(e) {
    const {
      target,
    } = e.currentTarget.dataset;
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/${target}/${target}?route=${currentPage.route}`,
    })

  },
  formSubmit: function() {
    const {
      companySectionParamId,
      companySectionParamNodeType,
      companySectionParamName,
      goodsClassId,
      goodsClassName,
      goodsBrandId,
      goodsBrandName,
      startDate,
      endDate,
      timeActive,
      salesType,
    } = this.data;
    const {
      addPage
    } = this.data;
    if (addPage != null) {
      addPage.setData({
        companySectionParamId,
        companySectionParamNodeType,
        companySectionParamName,
        goodsClassId,
        goodsClassName,
        goodsBrandId,
        goodsBrandName,
        startDate,
        endDate,
        timeActive,
        salesType,
      })
      addPage.searchSubmit()
    }
    wx.navigateBack({})
  },
  formReset: function() {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    const {
      startDate,
      endDate,
    } = util.getCurBMonth();

    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,

      goodsClassId: '',
      goodsClassName: '全部',
      goodsBrandId: '',
      goodsBrandName: '全部',
      startDate,
      endDate,
      timeActive: 0,
      salesType: '',
    })
  },
  setDelta: function() {
    const {
      route,
    } = this.data;
    if (route != '') {
      const mainPage = util.getMainPage({
        route,
      })
      const {
        delta,
        addPage
      } = mainPage
      this.setData({
        delta,
        addPage,
      });
      if (addPage != null) {
        const {
          goodsClassId,
          goodsClassName,
          categoryData,
          goodsBrandId,
          goodsBrandName,
          BrandData,
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
          startDate,
          endDate,
          timeActive,
          salesType,
        } = addPage.data;
        this.setData({
          goodsClassId,
          goodsClassName,
          categoryData,
          goodsBrandId,
          goodsBrandName,
          BrandData,
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
          startDate,
          endDate,
          timeActive,
          salesType,
        });
      }
    }

  },
})