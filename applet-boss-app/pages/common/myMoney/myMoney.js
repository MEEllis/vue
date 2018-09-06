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
    accountTypeId: '',
    accountTypeName: '全部',
    categoryData: [],
    startDate: '',
    toDayDate: '',
    menuCode: '',
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
  onShow: function () {

  },

  bindDateStart: function (e) {
    const date = e.detail.value;
    const {
      startDate,
    } = this.data;
    this.setData({
      startDate,
    })

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
      accountTypeId,
      accountTypeName,
      startDate,
    } = this.data;
    const {
      addPage
    } = this.data;
    if (addPage != null) {
      addPage.setData({
        companySectionParamId,
        companySectionParamNodeType,
        companySectionParamName,
        accountTypeId,
        accountTypeName,
        startDate,
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
    } = util.getCurBMonth();

    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,
      accountTypeId: '',
      accountTypeName: '全部',
      startDate,

    })
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
          accountTypeId,
          accountTypeName,
          categoryData,
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
   
          startDate,
     
        } = addPage.data;
        this.setData({
          accountTypeId,
          accountTypeName,
          categoryData,
          companyId: companySectionParamId,
          companySectionParamNodeType,
          companySectionParamId,
          companySectionParamName,
          companySectionParamData,
          startDate,
        });

        lastCompanySectionParamId = companySectionParamId;
      }
    }

  },
})