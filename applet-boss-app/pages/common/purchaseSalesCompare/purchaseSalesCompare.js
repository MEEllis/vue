import util from '../../../utils/util.js';
import api from '../../../config/api.js';
import serviceCom from '../../../services/common.js';
let lastCompanySectionParamId = '';
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
    companyId: '',
    goodsClassId: '',
    goodsClassName: '全部',
    categoryData: [],

    startDate: '',
    endDate: '',
    timeActive: 0,
    timeList: ['今日', '昨日', '近7天', '近30天', '自定义'],
    toDayDate: '',
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

    });
    this.setDelta();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },
  //切换时间
  timeRadioChange: function(e) {
    const timeActive = e.detail.value;
    const curDate = new Date();
    const curTime = util.formatTime(curDate);
    let startDate;
    let endDate;
    if (timeActive != 4) {
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
        startDate = curTime;
        endDate = lastDate;
      }
      // 近30天
      else if (timeActive == 3) {
        const lastDate = util.formatTime(new Date(curDate.setTime(curDate.getTime() - 24 * 60 * 60 * 1000 * 30)))
        startDate = curTime;
        endDate = lastDate;
      }
      this.setData({
        startDate,
        endDate,
      });
    }
    this.setData({
      timeActive
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
        timeActive: 4,
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
        timeActive: 4,
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
      startDate,
      endDate,
      timeActive,

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
        startDate,
        endDate,
        timeActive,

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
      startDate,
      endDate,
      timeActive: 2,
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
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
          startDate,
          endDate,
          timeActive,
        } = addPage.data;
        this.setData({
          goodsClassId,
          goodsClassName,
          categoryData,
          companyId: companySectionParamId,
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
          startDate,
          endDate,
          timeActive,
        });

        lastCompanySectionParamId = companySectionParamId;
      }
    }

  },
})