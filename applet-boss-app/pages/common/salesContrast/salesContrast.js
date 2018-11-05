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
    groupField: '',
    groupFieldList: [],
    salesType: '',
    salesTypeList: [],
    startDate: '',
    endDate: '',
    startDate1: '',
    endDate1: '',
    toDayDate: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      route,
    });
    this.setDelta();
  },

  tapShowDetail: function (e) {
    const {
      target,
    } = e.currentTarget.dataset;
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    wx.navigateTo({
      url: `/pages/common/${target}/${target}?route=${currentPage.route}`,
    })

  },
  formSubmit: function () {
    const {
      companySectionParamId,
      companySectionParamNodeType,
      companySectionParamName,
      goodsClassId,
      groupField,
      goodsClassName,
      salesType,
      startDate,
      endDate,
      startDate1,
      endDate1,
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
        groupField,
        goodsClassName,
        salesType,
        startDate,
        endDate,
        startDate1,
        endDate1,
      })
      addPage.searchSubmit()
    }
    wx.navigateBack({})
  },
  formReset: function () {
    //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
    const {
      startDate,
      endDate,
    } = util.getCurBMonth();
    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,
      companySectionParamNodeType: 'Company',
      goodsClassId: '',
      goodsClassName: '全部',
      groupField: 'goodsClassName',
      salesType:'',
      startDate: startDate,
      endDate: endDate,
      startDate1: startDate,
      endDate1: endDate,
    })
  },
  bindDateStart: function (e) {
    const date = e.detail.value;
    const { start, end, target } = e.target.dataset

    const startDate = this.data[start]
    const endDate = this.data[end]

    if (new Date(date) > new Date(endDate)) {
      util.showErrorToast('开始日期不能大于结束日期！')
    } else {
      const setObj = {}
      setObj[target] = date
      this.setData(setObj)
      this.searchSubmit();
    }

  },

  bindDateEnd: function (e) {
    const date = e.detail.value;
    const { start, end, target } = e.target.dataset

    const startDate = this.data[start]
    const endDate = this.data[end]

    if (new Date(date) < new Date(startDate)) {
      util.showErrorToast('开始日期不能大于结束日期！')

    } else {
      const setObj = {}
      setObj[target] = date
      this.setData(setObj)
      this.searchSubmit();
    }

  },

  groupFieldRadioChange: function (e) {
    const groupField = e.detail.value;
    this.setData({
      groupField,
    });
  },
  salesTypeRadioChange: function (e) {
    const salesType = e.detail.value;
    this.setData({
      salesType,
    });
  },
  setDelta: function () {
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
          groupField,
          tabs,
          salesType,
          salesTypeList,
          startDate,
          endDate,
          startDate1,
          endDate1,
          toDayDate,
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
        } = addPage.data;
        this.setData({
          goodsClassId,
          goodsClassName,
          categoryData,
          groupField,
          groupFieldList:tabs,
          salesType,
          salesTypeList,
          startDate,
          endDate,
          startDate1,
          endDate1,
          toDayDate,
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
        });
      }
    }

  },
})