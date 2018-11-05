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
      rankingGist,
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
        rankingGist,
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
      groupField: 'day',
      salesType:'',
      rankingGist:'goodsQuantity',

    })
  },
  //排行依据
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
  rankingGistRadioChange: function (e) {
    const rankingGist = e.detail.value;
    this.setData({
      rankingGist,
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
          groupFieldList,
          rankingGist,
          tabs,
          salesType,
          salesTypeList,
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
          groupFieldList,
          rankingGist,
          rankingGistList:tabs,
          salesType,
          salesTypeList,
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
        });
      }
    }

  },
})