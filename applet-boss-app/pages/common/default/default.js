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
    this.setData({
      route,
    });
    this.setDelta();
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
      })
      addPage.searchSubmit()
    }
    wx.navigateBack({})
  },
  formReset: function() {
       //获取当前登录公司
    const userInfo = wx.getStorageSync('userInfo');
 
    this.setData({
      companySectionParamId: userInfo.companyId,
      companySectionParamName: userInfo.companyName,
      companySectionParamNodeType: 'Company',
      goodsClassId: '',
      goodsClassName: '全部',
      goodsBrandId: '',
      goodsBrandName: '全部',
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
          companySectionParamData
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
          companySectionParamData
        });
      }
    }

  },
})