import request from '../../../utils/request.js';
import util from '../../../utils/util.js';
import api from '../../../config/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    route: '',
    delta: 1,
    addPage: null,
    scrollHeight: 0,
    activeId: '',
    dataList: [],
    dataSource: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      route,

    } = options;
    route = route === undefined ? '' : route;
    this.setData({
      route,
    });
    this.setDelta();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    util.getScrollHeight((52 + 5)).then((scrollHeight) => {
      // 计算主体部分高度,单位为px
      that.setData({
        scrollHeight,
      })
    })
  },
  searchInput: function (e) {
    const {
      keyWord
    } = e.detail;
    this.setData({
      keyWord,
    });
  },

  //关键字搜索
  searchSubmit: function () {
    const {
      dataSource,
      keyWord
    } = this.data;
    if (Array.isArray(dataSource)) {
      const dataList = dataSource.filter(data => {
        if (String(data.code).toLowerCase().indexOf(keyWord.toLowerCase()) > -1 || String(data.name).toLowerCase().indexOf(keyWord.toLowerCase()) > -1) {
          return true;
        }
      });
      this.setData({
        dataList,
      });
    }
  },
  tapSel: function (e) {
    const {
      id,
      name
    } = e.currentTarget.dataset;
    const {
      addPage
    } = this.data;
    if (addPage != null) {
      addPage.setData({
        supplierId: id,
        supplierName: name,
      })
    }
    wx.navigateBack({})
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
          supplierId,
          ContactUnitsData
        } = addPage.data;
        this.setData({
          activeId: supplierId,
          dataList: ContactUnitsData,
          dataSource: ContactUnitsData,
        });
      }
    }

  },
})